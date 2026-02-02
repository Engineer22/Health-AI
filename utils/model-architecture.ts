import * as tf from '@tensorflow/tfjs-node';

export class ModelArchitecture {
  createImageClassificationModel(config: ImageModelConfig): tf.LayersModel {
    const { inputShape, numClasses, architecture } = config;

    switch (architecture) {
      case 'resnet':
        return this.createResNetModel(inputShape, numClasses);
      case 'densenet':
        return this.createDenseNetModel(inputShape, numClasses);
      case 'efficientnet':
        return this.createEfficientNetModel(inputShape, numClasses);
      default:
        throw new Error(`Unsupported architecture: ${architecture}`);
    }
  }

  createTextClassificationModel(config: TextModelConfig): tf.LayersModel {
    const { maxSequenceLength, vocabularySize, embeddingDim, numClasses } = config;

    const model = tf.sequential();

    // Embedding layer
    model.add(tf.layers.embedding({
      inputDim: vocabularySize,
      outputDim: embeddingDim,
      inputLength: maxSequenceLength
    }));

    // Bidirectional LSTM
    model.add(tf.layers.bidirectional({
      layer: tf.layers.lstm({
        units: 128,
        returnSequences: true
      })
    }));

    // Global max pooling
    model.add(tf.layers.globalMaxPooling1d());

    // Dense layers
    model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.5 }));
    model.add(tf.layers.dense({ units: numClasses, activation: 'softmax' }));

    return model;
  }

  createTimeSeriesModel(config: TimeSeriesConfig): tf.LayersModel {
    const { sequenceLength, numFeatures, outputSize } = config;

    const model = tf.sequential();

    // LSTM layers
    model.add(tf.layers.lstm({
      units: 128,
      returnSequences: true,
      inputShape: [sequenceLength, numFeatures]
    }));

    model.add(tf.layers.lstm({
      units: 64,
      returnSequences: false
    }));

    // Dense layers
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.3 }));
    model.add(tf.layers.dense({ units: outputSize }));

    return model;
  }

  createRiskPredictionModel(config: RiskModelConfig): tf.LayersModel {
    const { inputFeatures, hiddenLayers, outputSize } = config;

    const model = tf.sequential();

    // Input layer
    model.add(tf.layers.dense({
      units: hiddenLayers[0],
      activation: 'relu',
      inputShape: [inputFeatures]
    }));

    // Hidden layers
    for (let i = 1; i < hiddenLayers.length; i++) {
      model.add(tf.layers.dense({
        units: hiddenLayers[i],
        activation: 'relu'
      }));
      model.add(tf.layers.dropout({ rate: 0.3 }));
    }

    // Output layer
    model.add(tf.layers.dense({
      units: outputSize,
      activation: 'sigmoid'
    }));

    return model;
  }

  private createResNetModel(inputShape: number[], numClasses: number): tf.LayersModel {
    // Implementation of ResNet architecture
    const input = tf.input({ shape: inputShape });
    let x = input;

    // Initial convolution
    x = tf.layers.conv2d({
      filters: 64,
      kernelSize: 7,
      strides: 2,
      padding: 'same'
    }).apply(x);

    // Residual blocks
    x = this.residualBlock(x, 64, 2);
    x = this.residualBlock(x, 128, 2);
    x = this.residualBlock(x, 256, 2);
    x = this.residualBlock(x, 512, 2);

    // Global average pooling and dense layers
    x = tf.layers.globalAveragePooling2d().apply(x);
    x = tf.layers.dense({ units: numClasses, activation: 'softmax' }).apply(x);

    return tf.model({ inputs: input, outputs: x });
  }

  private residualBlock(x: tf.Tensor, filters: number, strides: number): tf.Tensor {
    const shortcut = x;

    x = tf.layers.conv2d({
      filters,
      kernelSize: 3,
      strides,
      padding: 'same'
    }).apply(x);
    x = tf.layers.batchNormalization().apply(x);
    x = tf.layers.activation({ activation: 'relu' }).apply(x);

    x = tf.layers.conv2d({
      filters,
      kernelSize: 3,
      padding: 'same'
    }).apply(x);
    x = tf.layers.batchNormalization().apply(x);

    if (strides > 1) {
      shortcut = tf.layers.conv2d({
        filters,
        kernelSize: 1,
        strides
      }).apply(shortcut);
    }

    x = tf.layers.add().apply([x, shortcut]);
    return tf.layers.activation({ activation: 'relu' }).apply(x);
  }
} 