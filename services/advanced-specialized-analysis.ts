import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { ImageAnalysis } from './image-analysis';
import { LabResultAnalyzer } from './lab-analysis';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AdvancedSpecializedAnalysis {
  private imageAnalysis: ImageAnalysis;
  private labAnalyzer: LabResultAnalyzer;

  constructor() {
    this.imageAnalysis = new ImageAnalysis();
    this.labAnalyzer = new LabResultAnalyzer();
  }

  async analyzeNeurologicalCondition(patientId: string) {
    try {
      const patientData = await this.getPatientNeurologicalData(patientId);
      const analysis = await this.performNeurologicalAnalysis(patientData);
      return {
        cognitiveAssessment: analysis.cognitiveAssessment,
        neurologicalSymptoms: analysis.neurologicalSymptoms,
        brainActivityPatterns: analysis.brainActivityPatterns,
        treatmentRecommendations: analysis.treatmentRecommendations,
        progressionRisk: analysis.progressionRisk
      };
    } catch (error) {
      throw new Error('Failed to analyze neurological condition');
    }
  }

  async analyzeOncologyCase(patientId: string) {
    try {
      const patientData = await this.getPatientOncologyData(patientId);
      const analysis = await this.performOncologyAnalysis(patientData);
      return {
        cancerStaging: analysis.cancerStaging,
        tumorCharacteristics: analysis.tumorCharacteristics,
        treatmentOptions: analysis.treatmentOptions,
        survivalPrediction: analysis.survivalPrediction,
        clinicalTrialMatches: analysis.clinicalTrialMatches
      };
    } catch (error) {
      throw new Error('Failed to analyze oncology case');
    }
  }

  async analyzeImmunologyProfile(patientId: string) {
    try {
      const patientData = await this.getPatientImmunologyData(patientId);
      const analysis = await this.performImmunologyAnalysis(patientData);
      return {
        immuneSystemStatus: analysis.immuneSystemStatus,
        autoimmunityRisks: analysis.autoimmunityRisks,
        allergicConditions: analysis.allergicConditions,
        immunotherapyOptions: analysis.immunotherapyOptions,
        preventiveStrategies: analysis.preventiveStrategies
      };
    } catch (error) {
      throw new Error('Failed to analyze immunology profile');
    }
  }

  async analyzePediatricDevelopment(patientId: string) {
    try {
      const patientData = await this.getPatientPediatricData(patientId);
      const analysis = await this.performPediatricAnalysis(patientData);
      return {
        growthAssessment: analysis.growthAssessment,
        developmentalMilestones: analysis.developmentalMilestones,
        nutritionalStatus: analysis.nutritionalStatus,
        vaccineSchedule: analysis.vaccineSchedule,
        behavioralAssessment: analysis.behavioralAssessment
      };
    } catch (error) {
      throw new Error('Failed to analyze pediatric development');
    }
  }

  async analyzeGeriatricHealth(patientId: string) {
    try {
      const patientData = await this.getPatientGeriatricData(patientId);
      const analysis = await this.performGeriatricAnalysis(patientData);
      return {
        functionalStatus: analysis.functionalStatus,
        cognitiveHealth: analysis.cognitiveHealth,
        fallRisk: analysis.fallRisk,
        polypharmacyAssessment: analysis.polypharmacyAssessment,
        careRecommendations: analysis.careRecommendations
      };
    } catch (error) {
      throw new Error('Failed to analyze geriatric health');
    }
  }

  async analyzeEndocrineDisorders(patientId: string) {
    try {
      const patientData = await this.getPatientEndocrineData(patientId);
      const analysis = await this.performEndocrineAnalysis(patientData);
      return {
        hormonalImbalances: analysis.hormonalImbalances,
        metabolicStatus: analysis.metabolicStatus,
        endocrineFunction: analysis.endocrineFunction,
        treatmentEffectiveness: analysis.treatmentEffectiveness,
        lifestyleRecommendations: analysis.lifestyleRecommendations
      };
    } catch (error) {
      throw new Error('Failed to analyze endocrine disorders');
    }
  }

  async analyzeRheumatologyConditions(patientId: string) {
    try {
      const patientData = await this.getPatientRheumatologyData(patientId);
      const analysis = await this.performRheumatologyAnalysis(patientData);
      return {
        diseaseActivity: analysis.diseaseActivity,
        jointDamage: analysis.jointDamage,
        inflammationMarkers: analysis.inflammationMarkers,
        treatmentResponse: analysis.treatmentResponse,
        functionaLimitations: analysis.functionaLimitations
      };
    } catch (error) {
      throw new Error('Failed to analyze rheumatology conditions');
    }
  }

  async analyzePulmonaryFunction(patientId: string) {
    try {
      const patientData = await this.getPatientPulmonaryData(patientId);
      const analysis = await this.performPulmonaryAnalysis(patientData);
      return {
        lungFunction: analysis.lungFunction,
        respiratoryPatterns: analysis.respiratoryPatterns,
        oxygenationStatus: analysis.oxygenationStatus,
        inhalerTechnique: analysis.inhalerTechnique,
        environmentalFactors: analysis.environmentalFactors
      };
    } catch (error) {
      throw new Error('Failed to analyze pulmonary function');
    }
  }

  private async performNeurologicalAnalysis(patientData: any) {
    const prompt = this.buildNeurologicalAnalysisPrompt(patientData);
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `As a neurological analysis system, evaluate the following data and provide:
          1. Cognitive function assessment
          2. Neurological symptom analysis
          3. Brain activity pattern evaluation
          4. Treatment recommendations
          5. Disease progression risk assessment
          Provide detailed analysis in JSON format.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content!);
  }

  private async performOncologyAnalysis(patientData: any) {
    const prompt = this.buildOncologyAnalysisPrompt(patientData);
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `As an oncology analysis system, evaluate the following data and provide:
          1. Cancer staging and classification
          2. Tumor characteristics analysis
          3. Treatment option recommendations
          4. Survival prediction
          5. Clinical trial matching
          Provide detailed analysis in JSON format.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content!);
  }

  private async getPatientNeurologicalData(patientId: string) {
    return await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        neurologicalAssessments: {
          orderBy: { timestamp: 'desc' },
          take: 5,
        },
        brainScans: {
          orderBy: { date: 'desc' },
          take: 3,
        },
        medications: {
          where: {
            category: 'NEUROLOGICAL'
          }
        },
        symptoms: {
          where: {
            category: 'NEUROLOGICAL'
          },
          orderBy: { timestamp: 'desc' },
        }
      }
    });
  }

  private async getPatientOncologyData(patientId: string) {
    return await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        tumorMarkers: {
          orderBy: { timestamp: 'desc' },
          take: 5,
        },
        imagingStudies: {
          where: {
            type: {
              in: ['PET', 'CT', 'MRI']
            }
          },
          orderBy: { date: 'desc' },
          take: 3,
        },
        treatments: {
          where: {
            category: 'ONCOLOGY'
          },
          orderBy: { date: 'desc' },
        },
        pathologyReports: {
          orderBy: { date: 'desc' },
          take: 3,
        }
      }
    });
  }

  private buildNeurologicalAnalysisPrompt(patientData: any): string {
    return `
      Neurological Assessment:
      
      Cognitive Function Tests:
      ${this.formatCognitiveTests(patientData.neurologicalAssessments)}
      
      Brain Imaging Results:
      ${this.formatBrainScans(patientData.brainScans)}
      
      Current Medications:
      ${this.formatNeurologicalMedications(patientData.medications)}
      
      Symptoms and Progression:
      ${this.formatNeurologicalSymptoms(patientData.symptoms)}
    `;
  }

  private buildOncologyAnalysisPrompt(patientData: any): string {
    return `
      Oncology Assessment:
      
      Tumor Markers:
      ${this.formatTumorMarkers(patientData.tumorMarkers)}
      
      Imaging Studies:
      ${this.formatImagingStudies(patientData.imagingStudies)}
      
      Treatment History:
      ${this.formatOncologyTreatments(patientData.treatments)}
      
      Pathology Reports:
      ${this.formatPathologyReports(patientData.pathologyReports)}
    `;
  }

  // Helper formatting methods
  private formatCognitiveTests(tests: any[]): string {
    return tests.map(test => 
      `${test.type}: Score ${test.score}/100 (${test.timestamp})\n` +
      `Areas Tested: ${test.areasAssessed.join(', ')}\n` +
      `Notes: ${test.observations}`
    ).join('\n\n');
  }

  private formatBrainScans(scans: any[]): string {
    return scans.map(scan => 
      `Type: ${scan.type}\n` +
      `Date: ${scan.date}\n` +
      `Findings: ${scan.findings}\n` +
      `Abnormalities: ${scan.abnormalities.join(', ')}`
    ).join('\n\n');
  }

  private formatTumorMarkers(markers: any[]): string {
    return markers.map(marker => 
      `${marker.name}: ${marker.value} ${marker.unit} (${marker.timestamp})\n` +
      `Reference Range: ${marker.referenceRange}\n` +
      `Trend: ${marker.trend}`
    ).join('\n\n');
  }

  private formatImagingStudies(studies: any[]): string {
    return studies.map(study => 
      `Type: ${study.type}\n` +
      `Date: ${study.date}\n` +
      `Location: ${study.location}\n` +
      `Size: ${study.size}\n` +
      `Characteristics: ${study.characteristics.join(', ')}`
    ).join('\n\n');
  }
} 