import { Request, Response } from 'express';
import { AdvancedSpecializedAnalysis } from '../services/advanced-specialized-analysis';

const advancedAnalysis = new AdvancedSpecializedAnalysis();

export class AdvancedSpecializedController {
  async analyzeNeurologicalCondition(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const analysis = await advancedAnalysis.analyzeNeurologicalCondition(patientId);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze neurological condition' });
    }
  }

  async analyzeOncologyCase(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const analysis = await advancedAnalysis.analyzeOncologyCase(patientId);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze oncology case' });
    }
  }

  async analyzeImmunologyProfile(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const analysis = await advancedAnalysis.analyzeImmunologyProfile(patientId);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze immunology profile' });
    }
  }

  async analyzePediatricDevelopment(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const analysis = await advancedAnalysis.analyzePediatricDevelopment(patientId);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze pediatric development' });
    }
  }

  async analyzeGeriatricHealth(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const analysis = await advancedAnalysis.analyzeGeriatricHealth(patientId);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze geriatric health' });
    }
  }
} 