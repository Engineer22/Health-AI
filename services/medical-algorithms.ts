import { PrismaClient } from '@prisma/client';
import { calculateBMI, calculateBSA } from '../utils/anthropometric';
import { calculateCrCl, calculateGFR } from '../utils/renal';
import { calculateQTc, calculateHASBLED } from '../utils/cardiac';

const prisma = new PrismaClient();

export class MedicalAlgorithms {
  // Cardiac Risk Algorithms
  async calculateFraminghamRisk(patientId: string): Promise<any> {
    const patient = await this.getPatientCardiacData(patientId);
    const risk = this.computeFraminghamScore({
      age: patient.age,
      gender: patient.gender,
      systolicBP: patient.vitals.systolicBP,
      totalCholesterol: patient.labs.totalCholesterol,
      hdlCholesterol: patient.labs.hdlCholesterol,
      smoker: patient.lifestyle.smoker,
      diabetic: patient.conditions.includes('diabetes')
    });

    await this.saveRiskAssessment(patientId, 'FRAMINGHAM', risk);
    return risk;
  }

  async calculateCHADS2VASc(patientId: string): Promise<any> {
    const patient = await this.getPatientCardiacData(patientId);
    const score = this.computeCHADS2VAScScore({
      age: patient.age,
      gender: patient.gender,
      chf: patient.conditions.includes('congestive_heart_failure'),
      hypertension: patient.conditions.includes('hypertension'),
      diabetes: patient.conditions.includes('diabetes'),
      stroke: patient.conditions.includes('stroke'),
      vascularDisease: patient.conditions.includes('vascular_disease')
    });

    await this.saveRiskAssessment(patientId, 'CHADS2VASC', score);
    return score;
  }

  // Sepsis Risk Assessment
  async calculateSOFA(patientId: string): Promise<any> {
    const patient = await this.getPatientCriticalCareData(patientId);
    const score = this.computeSOFAScore({
      pao2Fio2: patient.vitals.pao2Fio2,
      platelets: patient.labs.platelets,
      bilirubin: patient.labs.bilirubin,
      meanArterialPressure: patient.vitals.map,
      glasgowComaScale: patient.neuro.gcs,
      creatinine: patient.labs.creatinine
    });

    await this.saveRiskAssessment(patientId, 'SOFA', score);
    return score;
  }

  // Pneumonia Severity
  async calculatePSI(patientId: string): Promise<any> {
    const patient = await this.getPatientRespiratoryData(patientId);
    const score = this.computePSIScore({
      age: patient.age,
      nursingHome: patient.residenceType === 'nursing_home',
      cancer: patient.conditions.includes('cancer'),
      liverDisease: patient.conditions.includes('liver_disease'),
      chf: patient.conditions.includes('congestive_heart_failure'),
      bps: patient.vitals.systolicBP,
      pulse: patient.vitals.heartRate,
      respiratoryRate: patient.vitals.respiratoryRate,
      temperature: patient.vitals.temperature,
      mentalStatus: patient.neuro.mentalStatus,
      glucose: patient.labs.glucose,
      bun: patient.labs.bun,
      sodium: patient.labs.sodium,
      hematocrit: patient.labs.hematocrit,
      ph: patient.labs.ph,
      pleural: patient.imaging.pleuralEffusion
    });

    await this.saveRiskAssessment(patientId, 'PSI', score);
    return score;
  }

  // Liver Disease Severity
  async calculateMELD(patientId: string): Promise<any> {
    const patient = await this.getPatientHepaticData(patientId);
    const score = this.computeMELDScore({
      bilirubin: patient.labs.bilirubin,
      inr: patient.labs.inr,
      creatinine: patient.labs.creatinine,
      dialysis: patient.treatments.includes('dialysis')
    });

    await this.saveRiskAssessment(patientId, 'MELD', score);
    return score;
  }

  // Diabetes Risk Assessment
  async calculateDiabetesRisk(patientId: string): Promise<any> {
    const patient = await this.getPatientMetabolicData(patientId);
    const risk = this.computeDiabetesRiskScore({
      age: patient.age,
      bmi: patient.vitals.bmi,
      waistCircumference: patient.measurements.waistCircumference,
      familyHistory: patient.familyHistory.includes('diabetes'),
      physicalActivity: patient.lifestyle.physicalActivity,
      diet: patient.lifestyle.diet,
      hypertension: patient.conditions.includes('hypertension'),
      gestationalDiabetes: patient.history.includes('gestational_diabetes'),
      hba1c: patient.labs.hba1c,
      fastingGlucose: patient.labs.fastingGlucose
    });

    await this.saveRiskAssessment(patientId, 'DIABETES_RISK', risk);
    return risk;
  }

  // Medication Dosing Algorithms
  async calculateDrugDosing(patientId: string, drugId: string): Promise<any> {
    const patient = await this.getPatientPharmacologyData(patientId);
    const drug = await this.getDrugData(drugId);

    const dosing = this.computeDrugDosing({
      weight: patient.vitals.weight,
      height: patient.vitals.height,
      age: patient.age,
      gender: patient.gender,
      creatinine: patient.labs.creatinine,
      liverFunction: patient.labs.liverFunction,
      drugProperties: drug,
      concomitantMedications: patient.medications
    });

    await this.saveDrugDosing(patientId, drugId, dosing);
    return dosing;
  }

  // Private computation methods
  private computeFraminghamScore(params: any): any {
    let score = 0;
    let risk = 0;

    // Age points
    if (params.gender === 'male') {
      score += params.age < 35 ? 0 : params.age < 40 ? 2 : params.age < 45 ? 5 : 8;
    } else {
      score += params.age < 35 ? 0 : params.age < 40 ? 4 : params.age < 45 ? 7 : 9;
    }

    // Blood pressure points
    score += this.calculateBPPoints(params.systolicBP);

    // Cholesterol points
    score += this.calculateCholesterolPoints(params.totalCholesterol, params.hdlCholesterol);

    // Smoking and diabetes points
    score += params.smoker ? 4 : 0;
    score += params.diabetic ? 3 : 0;

    // Calculate 10-year risk
    risk = this.convertScoreToRisk(score, params.gender);

    return {
      score,
      risk,
      riskLevel: this.categorizeCardiacRisk(risk),
      recommendations: this.generateCardiacRecommendations(risk)
    };
  }

  private computeSOFAScore(params: any): any {
    let score = 0;
    const subscores = {
      respiratory: 0,
      coagulation: 0,
      liver: 0,
      cardiovascular: 0,
      cns: 0,
      renal: 0
    };

    // Respiratory score (PaO2/FiO2)
    subscores.respiratory = this.calculateRespiratorySOFA(params.pao2Fio2);

    // Coagulation score (Platelets)
    subscores.coagulation = this.calculateCoagulationSOFA(params.platelets);

    // Liver score (Bilirubin)
    subscores.liver = this.calculateLiverSOFA(params.bilirubin);

    // Cardiovascular score (Mean Arterial Pressure)
    subscores.cardiovascular = this.calculateCardiovascularSOFA(params.meanArterialPressure);

    // CNS score (Glasgow Coma Scale)
    subscores.cns = this.calculateCNSSOFA(params.glasgowComaScale);

    // Renal score (Creatinine)
    subscores.renal = this.calculateRenalSOFA(params.creatinine);

    score = Object.values(subscores).reduce((a, b) => a + b, 0);

    return {
      totalScore: score,
      subscores,
      interpretation: this.interpretSOFAScore(score),
      recommendations: this.generateSOFARecommendations(score, subscores)
    };
  }

  private computeMELDScore(params: any): any {
    let score = 0;

    // MELD = 3.78×ln[serum bilirubin (mg/dL)] + 11.2×ln[INR] + 9.57×ln[serum creatinine (mg/dL)] + 6.43
    score = Math.round(
      3.78 * Math.log(params.bilirubin) +
      11.2 * Math.log(params.inr) +
      9.57 * Math.log(params.creatinine) +
      6.43
    );

    // Adjust for dialysis if applicable
    if (params.dialysis) {
      score = Math.min(score + 3, 40);
    }

    return {
      score,
      interpretation: this.interpretMELDScore(score),
      survivalProbability: this.calculateMELDSurvival(score),
      recommendations: this.generateMELDRecommendations(score)
    };
  }

  private computeDrugDosing(params: any): any {
    const bsa = this.calculateBSA(params.height, params.weight);
    const crCl = this.calculateCrCl(params);
    const adjustedDose = this.calculateAdjustedDose({
      standardDose: params.drugProperties.standardDose,
      bsa,
      crCl,
      liverFunction: params.liverFunction,
      age: params.age,
      weight: params.weight
    });

    return {
      recommendedDose: adjustedDose,
      frequency: this.calculateDoseFrequency(params),
      adjustments: this.calculateDoseAdjustments(params),
      monitoring: this.generateMonitoringPlan(params),
      warnings: this.generateDrugWarnings(params)
    };
  }

  // Helper methods
  private calculateBSA(height: number, weight: number): number {
    // Mosteller formula
    return Math.sqrt((height * weight) / 3600);
  }

  private calculateCrCl(params: any): number {
    // Cockcroft-Gault formula
    const factor = params.gender === 'female' ? 0.85 : 1;
    return ((140 - params.age) * params.weight * factor) / (72 * params.creatinine);
  }

  private async saveRiskAssessment(patientId: string, type: string, data: any) {
    await prisma.riskAssessment.create({
      data: {
        patientId,
        type,
        score: data.score || data.totalScore,
        details: data,
        timestamp: new Date()
      }
    });
  }

  private async saveDrugDosing(patientId: string, drugId: string, data: any) {
    await prisma.medicationDosing.create({
      data: {
        patientId,
        drugId,
        dosing: data,
        timestamp: new Date()
      }
    });
  }

  // Data retrieval methods
  private async getPatientCardiacData(patientId: string) {
    return await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        vitals: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
        labs: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
        conditions: true,
        lifestyle: true
      }
    });
  }

  private async getPatientCriticalCareData(patientId: string) {
    return await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        vitals: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
        labs: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
        neuro: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        }
      }
    });
  }
} 