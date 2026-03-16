export type MLSection = 'supervised' | 'unsupervised' | 'deep-learning';

export interface MLModel {
  id: string;
  name: string;
  category: string;
  section: MLSection;
  tagline: string;
  description: string;
  useCases: string[];
  strengths: string[];
  limitations: string[];
  exampleTools: string[];
}

export const mlSections: { id: MLSection; label: string; description: string }[] = [
  { id: 'supervised', label: 'Supervised Learning', description: 'Models trained on labeled input-output pairs to predict outcomes.' },
  { id: 'unsupervised', label: 'Unsupervised Learning', description: 'Models that find hidden patterns in data without labels.' },
  { id: 'deep-learning', label: 'Deep Learning & Generative AI', description: 'Neural networks and large-scale models that learn representations from raw data.' },
];

export const mlModels: MLModel[] = [
  {
    id: "linear-regression",
    name: "Linear Regression",
    section: "supervised" as const,
    category: "Supervised Learning",
    tagline: "The classic model for predicting continuous values",
    description:
      "Linear regression models the relationship between a dependent variable and one or more independent variables by fitting a linear equation to observed data. Despite its simplicity, it remains one of the most widely used models in statistics and machine learning. It can operate across any number of dimensions — from a simple 2D best-fit line to thousands of feature dimensions.",
    useCases: [
      "Predicting house prices based on square footage, location, and amenities",
      "Estimating patient medical costs from age, BMI, and health history",
      "Forecasting sales revenue based on marketing spend",
    ],
    strengths: [
      "Highly interpretable — coefficients show direct feature impact",
      "Fast to train and deploy",
      "Works well when the relationship is truly linear",
    ],
    limitations: [
      "Assumes a linear relationship between inputs and output",
      "Sensitive to outliers",
      "Struggles with complex, non-linear patterns",
    ],
    exampleTools: ["scikit-learn", "statsmodels", "PyTorch"],
  },
  {
    id: "logistic-regression",
    name: "Logistic Regression",
    section: "supervised" as const,
    category: "Supervised Learning",
    tagline: "Linear model adapted for classification",
    description:
      "Despite its name, logistic regression is a classification algorithm. It uses the logistic (sigmoid) function to squash predictions into a probability between 0 and 1. It's the go-to baseline for binary classification tasks and extends naturally to multiclass problems via softmax.",
    useCases: [
      "Spam email detection (spam vs. not spam)",
      "Disease diagnosis (positive vs. negative)",
      "Credit risk assessment",
    ],
    strengths: [
      "Outputs calibrated probabilities",
      "Fast, lightweight, and interpretable",
      "Effective on linearly separable data",
    ],
    limitations: [
      "Assumes linear decision boundaries",
      "Struggles with complex non-linear data",
      "Requires feature engineering for best results",
    ],
    exampleTools: ["scikit-learn", "TensorFlow", "statsmodels"],
  },
  {
    id: "decision-tree",
    name: "Decision Tree",
    section: "supervised" as const,
    category: "Supervised Learning",
    tagline: "Hierarchical if-else rules made learnable",
    description:
      "Decision trees split data into branches based on feature thresholds, forming a tree structure where each leaf represents a final prediction. They are extremely interpretable — you can trace exactly why a prediction was made. However, individual trees are prone to overfitting on noisy data.",
    useCases: [
      "Medical diagnosis (rule-based risk stratification)",
      "Customer segmentation for marketing",
      "Fraud detection with explainability requirements",
    ],
    strengths: [
      "Fully interpretable and visualizable",
      "No need for feature scaling",
      "Handles both numerical and categorical data",
    ],
    limitations: [
      "Prone to overfitting without pruning",
      "Unstable — small data changes can alter the tree",
      "Not competitive with ensemble methods on raw performance",
    ],
    exampleTools: ["scikit-learn", "XGBoost (as base learner)", "R rpart"],
  },
  {
    id: "random-forest",
    name: "Random Forest",
    section: "supervised" as const,
    category: "Ensemble Learning",
    tagline: "Wisdom of the crowd applied to decision trees",
    description:
      "Random Forest builds many decision trees during training and merges their predictions (by voting for classification or averaging for regression). Each tree is trained on a random subset of the data and features, reducing variance and making the ensemble far more robust than any individual tree. It also handles class imbalance well.",
    useCases: [
      "Tabular data classification and regression",
      "Feature importance ranking for feature selection",
      "Medical diagnosis with robust generalization",
    ],
    strengths: [
      "Resistant to overfitting compared to single trees",
      "Built-in feature importance",
      "Handles missing values and high-dimensional data",
    ],
    limitations: [
      "Less interpretable than a single decision tree",
      "Slower to train and predict than simpler models",
      "Large memory footprint for very large forests",
    ],
    exampleTools: ["scikit-learn", "H2O.ai", "Spark MLlib"],
  },
  {
    id: "svm",
    name: "Support Vector Machine (SVM)",
    section: "supervised" as const,
    category: "Supervised Learning",
    tagline: "Finding the best boundary between classes",
    description:
      "SVMs find the hyperplane that maximally separates classes in feature space. The key insight is the kernel trick — by mapping data into a higher-dimensional space, SVMs can create non-linear decision boundaries while still solving a convex optimization problem. This makes them powerful on small to medium datasets.",
    useCases: [
      "Image classification (handwritten digit recognition)",
      "Bioinformatics (protein classification, cancer detection)",
      "Text classification with high-dimensional features",
    ],
    strengths: [
      "Effective in high-dimensional spaces",
      "Robust to overfitting with the right kernel and regularization",
      "Works well when classes are clearly separable",
    ],
    limitations: [
      "Slow to train on large datasets (O(n²) to O(n³))",
      "Sensitive to feature scaling",
      "Choosing the right kernel requires domain knowledge",
    ],
    exampleTools: ["scikit-learn (libsvm)", "LIBSVM", "Thunder SVM"],
  },
  {
    id: "k-means",
    name: "K-Means Clustering",
    section: "unsupervised" as const,
    category: "Unsupervised Learning",
    tagline: "Grouping data by similarity without labels",
    description:
      "K-Means partitions data into K clusters by iteratively assigning points to the nearest centroid and updating centroids to the cluster mean. It's one of the simplest and most widely used unsupervised learning algorithms. The user must specify K in advance, and the algorithm minimizes within-cluster variance.",
    useCases: [
      "Customer segmentation for personalized marketing",
      "Document clustering for topic modeling",
      "Image compression by color quantization",
    ],
    strengths: [
      "Simple and fast — scales to large datasets",
      "Easy to interpret cluster assignments",
      "Works well on spherical, well-separated clusters",
    ],
    limitations: [
      "Must specify K in advance",
      "Sensitive to initialization and outliers",
      "Assumes spherical clusters of similar size",
    ],
    exampleTools: ["scikit-learn", "faiss", "Apache Spark MLlib"],
  },
  {
    id: "pca",
    name: "Principal Component Analysis (PCA)",
    section: "unsupervised" as const,
    category: "Unsupervised Learning",
    tagline: "Compressing high-dimensional data while preserving structure",
    description:
      "PCA transforms data into a new coordinate system where the axes (principal components) are ordered by the amount of variance they capture. By keeping only the top components, you can drastically reduce the number of dimensions while retaining most of the meaningful structure. It's a linear technique — it finds directions of maximum spread in the data.",
    useCases: [
      "Preprocessing before training to remove redundant features",
      "Visualizing high-dimensional datasets in 2D or 3D",
      "Noise reduction in images and sensor data",
    ],
    strengths: [
      "Reduces overfitting by eliminating low-variance noise dimensions",
      "Speeds up training by shrinking feature space",
      "No labels needed — purely unsupervised",
    ],
    limitations: [
      "Only captures linear relationships between features",
      "Principal components are hard to interpret intuitively",
      "Information loss is unavoidable when reducing dimensions",
    ],
    exampleTools: ["scikit-learn", "NumPy (SVD)", "TensorFlow (TF-PCA)"],
  },
  {
    id: "cnn",
    name: "Convolutional Neural Network (CNN)",
    section: "deep-learning" as const,
    category: "Deep Learning",
    tagline: "The gold standard for visual data",
    description:
      "CNNs use convolutional layers to automatically learn spatial hierarchies of features from images. Early layers detect edges and textures; deeper layers detect complex objects and patterns. The key operations — convolution, pooling, and activation — make them far more parameter-efficient than fully-connected networks for spatial data.",
    useCases: [
      "Optical Character Recognition (OCR) for digitizing printed text",
      "Medical image analysis (X-ray, MRI tumor detection)",
      "Autonomous vehicle perception (pedestrian/lane detection)",
    ],
    strengths: [
      "State-of-the-art on image and spatial tasks",
      "Learns features automatically (no manual feature engineering)",
      "Translation-invariant due to weight sharing",
    ],
    limitations: [
      "Requires large labeled datasets",
      "Computationally intensive — needs GPU training",
      "Black-box nature limits interpretability",
    ],
    exampleTools: ["PyTorch", "TensorFlow/Keras", "ONNX"],
  },
  {
    id: "rnn-lstm",
    name: "RNN / LSTM",
    section: "deep-learning" as const,
    category: "Deep Learning",
    tagline: "Memory-driven models for sequential data",
    description:
      "Recurrent Neural Networks (RNNs) process sequential data by maintaining a hidden state that carries information from previous timesteps. Long Short-Term Memory (LSTM) networks extend RNNs with gating mechanisms that control what to remember and forget, solving the vanishing gradient problem that plagued early RNNs. They were the dominant architecture for sequence tasks before Transformers.",
    useCases: [
      "Time-series forecasting (stock prices, weather, sensor data)",
      "Machine translation (before Transformers took over)",
      "Speech recognition and audio generation",
    ],
    strengths: [
      "Natural fit for variable-length sequential data",
      "LSTMs capture long-range dependencies",
      "Relatively lightweight compared to Transformers",
    ],
    limitations: [
      "Slow to train due to sequential computation",
      "Can still struggle with very long sequences",
      "Largely superseded by Transformers for NLP tasks",
    ],
    exampleTools: ["PyTorch", "TensorFlow/Keras", "Hugging Face (legacy models)"],
  },
  {
    id: "llm",
    name: "Large Language Models (LLMs)",
    section: "deep-learning" as const,
    category: "Generative AI / Deep Learning",
    tagline: "The foundation of modern AI — trained on the internet",
    description:
      "Large Language Models are Transformer-based models trained on massive text corpora using self-supervised learning (predicting the next token). Models like GPT-4, Claude, and Llama learn rich representations of language, reasoning, and world knowledge. They are fine-tuned with techniques like RLHF (Reinforcement Learning from Human Feedback) to follow instructions and align with human values. LLMs power chatbots, code assistants, document summarizers, and agents that can use external tools. Their emergent capabilities — like few-shot learning and chain-of-thought reasoning — arise from scale rather than explicit programming.",
    useCases: [
      "Conversational AI and chatbots (Claude, ChatGPT)",
      "Code generation and debugging (GitHub Copilot, Claude Code)",
      "Document summarization, translation, and extraction",
      "AI agents that reason and use tools (web search, APIs)",
    ],
    strengths: [
      "Generalize across tasks with zero or few examples",
      "Strong emergent reasoning and chain-of-thought capabilities",
      "Can be fine-tuned or prompted for domain-specific use cases",
      "Multimodal extensions handle text, images, audio, and video",
    ],
    limitations: [
      "Hallucinate — can confidently generate false information",
      "Extremely compute-intensive to train and serve at scale",
      "Knowledge cutoff — not aware of events after training date",
      "Potential for bias amplification from training data",
    ],
    exampleTools: [
      "Anthropic Claude API",
      "OpenAI GPT-4 API",
      "Hugging Face Transformers",
      "LangChain / LlamaIndex (agent frameworks)",
      "llama.cpp (local inference)",
    ],
  },
];
