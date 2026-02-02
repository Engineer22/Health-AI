import * as tf from '@tensorflow/tfjs-node';
import { loadImage } from 'canvas';
import { PrismaClient } from '@prisma/client';
import { DataPreprocessor } from '../utils/data-preprocessor';
import { ModelArchitecture } from '../utils/model-architecture';
import { ModelEvaluator } from '../utils/model-evaluator';
import { DataAugmentation } from '../utils/data-augmentation';

const prisma = new PrismaClient();

export class ModelTrainingService {
  private dataPreprocessor: DataPreprocessor;
  private modelArchitecture: ModelArchitecture;
  private modelEvaluator: ModelEvaluator;
  private dataAugmentation: DataAugmentation;

  constructor() {
    this.dataPreprocessor = new DataPreprocessor();
    this.modelArchitecture = new ModelArchitecture();
    this.modelEvaluator = new ModelEvaluator();
    this.dataAugmentation = new DataAugmentation();
  }

  // Medical Image Classification Model
  async trainImageClassificationModel(
    modelConfig: ImageModelConfig
  ): Promise<TrainingResult> {
    try {
      // Load and preprocess training data
      const { trainData, validationData } = await this.prepareImageData(
        modelConfig.datasetPath,
        modelConfig.imageSize,
        modelConfig.augmentation
      );

      // Create model architecture
      const model = this.modelArchitecture.createImageClassificationModel({
        inputShape: [modelConfig.imageSize, modelConfig.imageSize, 3],
        numClasses: modelConfig.numClasses,
        architecture: modelConfig.architecture
      });

      // Train model
      const history = await model.fit(trainData, {
        epochs: modelConfig.epochs,
        validationData,
        callbacks: this.createTrainingCallbacks()
      });

      // Evaluate model
      const evaluation = await this.modelEvaluator.evaluateImageModel(
        model,
        validationData
      );

      // Save model
      await model.save(`file://${modelConfig.savePath}`);

      return {
        history: history.history,
        evaluation,
        modelPath: modelConfig.savePath
      };
    } catch (error) {
      throw new Error('Failed to train image classification model');
    }
  }

  // Clinical Text Classification Model
  async trainTextClassificationModel(
    modelConfig: TextModelConfig
  ): Promise<TrainingResult> {
    try {
      // Prepare text data
      const { trainData, validationData, tokenizer } = await this.prepareTextData(
        modelConfig.datasetPath,
        modelConfig.maxSequenceLength,
        modelConfig.vocabularySize
      );

      // Create model architecture
      const model = this.modelArchitecture.createTextClassificationModel({
        maxSequenceLength: modelConfig.maxSequenceLength,
        vocabularySize: modelConfig.vocabularySize,
        embeddingDim: modelConfig.embeddingDim,
        numClasses: modelConfig.numClasses
      });

      // Train model
      const history = await model.fit(trainData, {
        epochs: modelConfig.epochs,
        validationData,
        callbacks: this.createTrainingCallbacks()
      });

      // Evaluate model
      const evaluation = await this.modelEvaluator.evaluateTextModel(
        model,
        validationData
      );

      // Save model and tokenizer
      await model.save(`file://${modelConfig.savePath}`);
      await this.saveTokenizer(tokenizer, modelConfig.savePath);

      return {
        history: history.history,
        evaluation,
        modelPath: modelConfig.savePath
      };
    } catch (error) {
      throw new Error('Failed to train text classification model');
    }
  }

  // Time Series Prediction Model (for vital signs, lab results, etc.)
  async trainTimeSeriesModel(
    modelConfig: TimeSeriesModelConfig
  ): Promise<TrainingResult> {
    try {
      // Prepare time series data
      const { trainData, validationData } = await this.prepareTimeSeriesData(
        modelConfig.datasetPath,
        modelConfig.sequenceLength,
        modelConfig.features
      );

      // Create model architecture
      const model = this.modelArchitecture.createTimeSeriesModel({
        sequenceLength: modelConfig.sequenceLength,
        numFeatures: modelConfig.features.length,
        outputSize: modelConfig.outputSize
      });

      // Train model
      const history = await model.fit(trainData, {
        epochs: modelConfig.epochs,
        validationData,
        callbacks: this.createTrainingCallbacks()
      });

      // Evaluate model
      const evaluation = await this.modelEvaluator.evaluateTimeSeriesModel(
        model,
        validationData
      );

      // Save model
      await model.save(`file://${modelConfig.savePath}`);

      return {
        history: history.history,
        evaluation,
        modelPath: modelConfig.savePath
      };
    } catch (error) {
      throw new Error('Failed to train time series model');
    }
  }

  // Risk Prediction Model
  async trainRiskPredictionModel(
    modelConfig: RiskModelConfig
  ): Promise<TrainingResult> {
    try {
      // Prepare patient data
      const { trainData, validationData } = await this.preparePatientData(
        modelConfig.datasetPath,
        modelConfig.features,
        modelConfig.riskTypes
      );

      // Create model architecture
      const model = this.modelArchitecture.createRiskPredictionModel({
        inputFeatures: modelConfig.features.length,
        hiddenLayers: modelConfig.hiddenLayers,
        outputSize: modelConfig.riskTypes.length
      });

      // Train model
      const history = await model.fit(trainData, {
        epochs: modelConfig.epochs,
        validationData,
        callbacks: this.createTrainingCallbacks()
      });

      // Evaluate model
      const evaluation = await this.modelEvaluator.evaluateRiskModel(
        model,
        validationData
      );

      // Save model
      await model.save(`file://${modelConfig.savePath}`);

      return {
        history: history.history,
        evaluation,
        modelPath: modelConfig.savePath
      };
    } catch (error) {
      throw new Error('Failed to train risk prediction model');
    }
  }

  // Private helper methods
  private async prepareImageData(
    datasetPath: string,
    imageSize: number,
    augmentation: boolean
  ) {
    const dataset = await this.dataPreprocessor.loadImageDataset(datasetPath);
    
    if (augmentation) {
      dataset.trainData = await this.dataAugmentation.augmentImages(dataset.trainData);
    }

    return {
      trainData: dataset.trainData.map(image => 
        tf.image.resizeBilinear(image, [imageSize, imageSize])
      ),
      validationData: dataset.validationData.map(image =>
        tf.image.resizeBilinear(image, [imageSize, imageSize])
      )
    };
  }

  private async prepareTextData(
    datasetPath: string,
    maxSequenceLength: number,
    vocabularySize: number
  ) {
    const dataset = await this.dataPreprocessor.loadTextDataset(datasetPath);
    const tokenizer = await this.dataPreprocessor.createTokenizer(
      dataset.trainData,
      vocabularySize
    );

    return {
      trainData: this.dataPreprocessor.tokenizeAndPad(
        dataset.trainData,
        tokenizer,
        maxSequenceLength
      ),
      validationData: this.dataPreprocessor.tokenizeAndPad(
        dataset.validationData,
        tokenizer,
        maxSequenceLength
      ),
      tokenizer
    };
  }

  private async prepareTimeSeriesData(
    datasetPath: string,
    sequenceLength: number,
    features: string[]
  ) {
    const dataset = await this.dataPreprocessor.loadTimeSeriesData(
      datasetPath,
      features
    );

    return {
      trainData: this.dataPreprocessor.createSequences(
        dataset.trainData,
        sequenceLength
      ),
      validationData: this.dataPreprocessor.createSequences(
        dataset.validationData,
        sequenceLength
      )
    };
  }

  private async preparePatientData(
    datasetPath: string,
    features: string[],
    riskTypes: string[]
  ) {
    const dataset = await this.dataPreprocessor.loadPatientData(
      datasetPath,
      features,
      riskTypes
    );

    return {
      trainData: this.dataPreprocessor.normalizePatientData(dataset.trainData),
      validationData: this.dataPreprocessor.normalizePatientData(
        dataset.validationData
      )
    };
  }

  private createTrainingCallbacks() {
    return [
      tf.callbacks.earlyStopping({
        monitor: 'val_loss',
        patience: 5
      }),
      tf.callbacks.modelCheckpoint({
        monitor: 'val_accuracy',
        saveBest: true
      })
    ];
  }
}

// Model configuration interfaces
interface ImageModelConfig {
  datasetPath: string;
  imageSize: number;
  numClasses: number;
  architecture: 'resnet' | 'densenet' | 'efficientnet';
  epochs: number;
  augmentation: boolean;
  savePath: string;
}

interface TextModelConfig {
  datasetPath: string;
  maxSequenceLength: number;
  vocabularySize: number;
  embeddingDim: number;
  numClasses: number;
  epochs: number;
  savePath: string;
}

interface TimeSeriesModelConfig {
  datasetPath: string;
  sequenceLength: number;
  features: string[];
  outputSize: number;
  epochs: number;
  savePath: string;
}

interface RiskModelConfig {
  datasetPath: string;
  features: string[];
  riskTypes: string[];
  hiddenLayers: number[];
  epochs: number;
  savePath: string;
}

interface TrainingResult {
  history: any;
  evaluation: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
  modelPath: string;
} 