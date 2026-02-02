import * as tf from '@tensorflow/tfjs-node';

export class ModelEvaluator {
  async evaluateImageModel(
    model: tf.LayersModel,
    validationData: { images: tf.Tensor[]; labels: number[] }
  ) {
    const predictions = model.predict(tf.stack(validationData.images)) as tf.Tensor;
    const labels = tf.tensor(validationData.labels);

    return this.calculateMetrics(predictions, labels);
  }

  async evaluateTextModel(
    model: tf.LayersModel,
    validationData: { sequences: tf.Tensor; labels: tf.Tensor }
  ) {
    const predictions = model.predict(validationData.sequences) as tf.Tensor;
    return this.calculateMetrics(predictions, validationData.labels);
  }

  async evaluateTimeSeriesModel(
    model: tf.LayersModel,
    validationData: { sequences: tf.Tensor; targets: tf.Tensor }
  ) {
    const predictions = model.predict(validationData.sequences) as tf.Tensor;
    return this.calculateRegressionMetrics(predictions, validationData.targets);
  }

  async evaluateRiskModel(
    model: tf.LayersModel,
    validationData: { features: tf.Tensor; risks: tf.Tensor }
  ) {
    const predictions = model.predict(validationData.features) as tf.Tensor;
    return this.calculateMetrics(predictions, validationData.risks);
  }

  private calculateMetrics(predictions: tf.Tensor, labels: tf.Tensor) {
    const predArray = predictions.argMax(-1).arraySync() as number[];
    const labelArray = labels.arraySync() as number[];

    const accuracy = this.calculateAccuracy(predArray, labelArray);
    const { precision, recall } = this.calculatePrecisionRecall(predArray, labelArray);
    const f1Score = this.calculateF1Score(precision, recall);

    return {
      accuracy,
      precision,
      recall,
      f1Score
    };
  }

  private calculateRegressionMetrics(predictions: tf.Tensor, targets: tf.Tensor) {
    const mse = tf.losses.meanSquaredError(targets, predictions).arraySync() as number;
    const mae = tf.losses.absoluteDifference(targets, predictions).arraySync() as number;

    return {
      mse,
      mae,
      rmse: Math.sqrt(mse)
    };
  }

  private calculateAccuracy(predictions: number[], labels: number[]): number {
    const correct = predictions.filter((p, i) => p === labels[i]).length;
    return correct / predictions.length;
  }

  private calculatePrecisionRecall(predictions: number[], labels: number[]) {
    let truePositives = 0;
    let falsePositives = 0;
    let falseNegatives = 0;

    predictions.forEach((pred, i) => {
      if (pred === 1 && labels[i] === 1) truePositives++;
      if (pred === 1 && labels[i] === 0) falsePositives++;
      if (pred === 0 && labels[i] === 1) falseNegatives++;
    });

    const precision = truePositives / (truePositives + falsePositives);
    const recall = truePositives / (truePositives + falseNegatives);

    return { precision, recall };
  }

  private calculateF1Score(precision: number, recall: number): number {
    return 2 * (precision * recall) / (precision + recall);
  }
} 