import { Request, Response } from 'express';
import { MedicalAlgorithms } from '../services/medical-algorithms';

const medicalAlgorithms = new MedicalAlgorithms();

export class MedicalAlgorithmsController {
  async calculateFraminghamRisk(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const risk = await medicalAlgorithms.calculateFraminghamRisk(patientId);
      res.json(risk);
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate Framingham risk' });
    }
  }

  async calculateCHADS2VASc(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const score = await medicalAlgorithms.calculateCHADS2VASc(patientId);
      res.json(score);
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate CHA2DS2-VASc score' });
    }
  }

  async calculateSOFA(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const score = await medicalAlgorithms.calculateSOFA(patientId);
      res.json(score);
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate SOFA score' });
    }
  }

  async calculateMELD(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const score = await medicalAlgorithms.calculateMELD(patientId);
      res.json(score);
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate MELD score' });
    }
  }

  async calculateDrugDosing(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const { drugId } = req.body;
      const dosing = await medicalAlgorithms.calculateDrugDosing(patientId, drugId);
      res.json(dosing);
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate drug dosing' });
    }
  }
} 