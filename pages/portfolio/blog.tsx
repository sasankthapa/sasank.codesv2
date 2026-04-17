import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import { mlModels, mlSections } from '../../lib/mlModelsData';
import NeuralNetworkSection from '../../components/NeuralNetworkSection';

const genAITopics = [
  {
    id: 'how-llms-work',
    title: 'How Large Language Models Work',
    tagline: 'From raw text to intelligent responses',
    content: [
      {
        heading: 'Tokenization',
        body: 'LLMs don\'t read words, they read tokens. Text is broken into subword chunks (e.g. "running" → "run" + "ning"). Each token maps to a number, turning language into a sequence of integers the model can process.',
      },
      {
        heading: 'The Transformer Architecture',
        body: 'At the core of every LLM is the Transformer. It processes all tokens in parallel using self-attention, a mechanism that lets each token "look at" every other token in the sequence to understand context. Stacking many attention layers allows the model to capture complex, long-range relationships in language.',
      },
      {
        heading: 'Pre-training: Next Token Prediction',
        body: 'LLMs are trained on massive text corpora (trillions of tokens from the web, books, and code) with a simple objective: predict the next token given all previous tokens. This self-supervised task forces the model to internalize grammar, facts, reasoning patterns, and world knowledge.',
      },
      {
        heading: 'Embeddings & Representations',
        body: 'Each token is mapped to a high-dimensional vector (embedding). Through training, semantically similar words cluster together in this space. The model learns rich internal representations: "Paris" minus "France" plus "Italy" ≈ "Rome" emerges naturally from training on language.',
      },
      {
        heading: 'Scaling Laws',
        body: 'Performance improves predictably with more parameters, more data, and more compute. GPT-3 has 175B parameters; GPT-4 and Claude 3 are estimated at over 1 trillion. Emergent capabilities like multi-step reasoning appear suddenly at certain scale thresholds rather than improving gradually.',
      },
      {
        heading: 'Fine-tuning & RLHF',
        body: 'After pre-training, models are fine-tuned on curated instruction-following data, then refined using Reinforcement Learning from Human Feedback (RLHF). Human raters rank model outputs; a reward model learns those preferences and guides the LLM to be more helpful, accurate, and safe.',
      },
    ],
  },
  {
    id: 'what-is-chatgpt',
    title: 'What is ChatGPT?',
    tagline: 'OpenAI\'s conversational AI, explained',
    content: [
      {
        heading: 'Overview',
        body: 'ChatGPT is a conversational AI assistant built on OpenAI\'s GPT (Generative Pre-trained Transformer) series of models. It was released in November 2022 and became the fastest product to reach 100 million users in history. It can answer questions, write code, summarize documents, draft emails, and reason through complex problems.',
      },
      {
        heading: 'How It\'s Different From a Search Engine',
        body: 'A search engine retrieves documents matching your query. ChatGPT generates a response by predicting the most coherent continuation of the conversation, it doesn\'t look things up in real time (unless given a tool). This makes it flexible and fluent, but also prone to hallucination when it confidently generates plausible-sounding but incorrect information.',
      },
      {
        heading: 'The Role of RLHF',
        body: 'What makes ChatGPT feel like a "helpful assistant" rather than a raw text predictor is RLHF. Human trainers provided example conversations, then ranked model outputs by quality. A reward model learned these preferences and was used to fine-tune GPT via reinforcement learning, steering it toward helpful, harmless, and honest responses.',
      },
      {
        heading: 'Context Window',
        body: 'ChatGPT maintains a "context window": a fixed number of tokens (ranging from 4K to 128K+ depending on the model) that it can see at once. Everything in the conversation so far lives in this window. Once a conversation exceeds it, the oldest content is dropped.',
      },
      {
        heading: 'Versions',
        body: 'ChatGPT has evolved through GPT-3.5 (the original launch model), GPT-4 (multimodal, significantly more capable), and GPT-4o (faster, natively multimodal). Each version brings improved reasoning, longer context, and better instruction following.',
      },
    ],
  },
  {
    id: 'what-is-chatgpt-doing',
    title: 'What is ChatGPT Doing and Why Does It Work?',
    tagline: 'The surprising mechanics behind coherent AI output',
    content: [
      {
        heading: 'It\'s "Just" Predicting the Next Token',
        body: 'At every step, ChatGPT produces a probability distribution over all ~100,000 possible tokens and samples from it. That\'s it. There\'s no explicit reasoning engine, no knowledge database, no symbolic logic, just a massive neural network trained to predict what comes next in text.',
      },
      {
        heading: 'Why Does Token Prediction Produce Intelligence?',
        body: 'Because to accurately predict the next word across trillions of examples, the model must implicitly learn the underlying structure of language, facts about the world, logical relationships, and even theory of mind. Predicting "The Eiffel Tower is in ___" correctly requires knowing geography. Predicting good code requires understanding algorithms. Intelligence emerges as a side effect of compression.',
      },
      {
        heading: 'Temperature & Sampling',
        body: 'The "creativity" dial on LLMs is temperature. At temperature 0, the model always picks the highest-probability token (deterministic, repetitive). At higher temperatures, lower-probability tokens get more weight, producing more creative but less reliable outputs. Most chat applications use a temperature around 0.7–1.0.',
      },
      {
        heading: 'Why It Hallucinates',
        body: 'The model is optimized to generate fluent, coherent text, not to be factually correct. When it doesn\'t "know" something, it fills in the gap with a plausible-sounding continuation. It has no internal truth-checker. This is why hallucination is a fundamental property of current LLMs, not a bug to be easily patched.',
      },
      {
        heading: 'Chain-of-Thought Reasoning',
        body: 'Asking the model to "think step by step" dramatically improves accuracy on math and logic tasks. By generating intermediate reasoning tokens before the final answer, the model effectively uses its own output as working memory, each token it writes becomes context it can attend to in subsequent tokens.',
      },
      {
        heading: 'Why It Feels Like Understanding',
        body: 'The internal representations learned during training encode semantic relationships so richly that the model generalizes far beyond its training data. It can solve novel analogies, write code in languages it saw rarely, and reason about hypotheticals, not because it memorized answers, but because it learned the deep structure of human knowledge.',
      },
    ],
  },
];

const xaiTopics = [
  {
    id: 'xai-importance',
    title: 'Explainable AI & Its Importance',
    tagline: 'Why transparency in AI is no longer optional',
    accent: { border: 'border-emerald-500/40', badge: 'bg-emerald-500/20 text-emerald-300', num: 'text-emerald-400', bar: 'bg-emerald-500/30' },
    content: [
      {
        heading: 'What is XAI?',
        body: 'XAI refers to methods that make AI decisions understandable, allowing users and regulators to trace why a model produced a given output.',
      },
      {
        heading: 'Trust & Accountability',
        body: "Without explainability there is no accountability loop: errors go unchallenged, biases go undetected, and public trust erodes.",
      },
      {
        heading: 'Regulatory Pressure',
        body: "The EU AI Act and GDPR's right to explanation require high-risk AI systems to justify their decisions, making XAI a legal necessity.",
      },
      {
        heading: 'The Scale Problem',
        body: 'GPT-4, Claude, Gemini, and LLaMA each contain hundreds of billions of parameters, making it impossible to trace any specific output back to its cause.',
      },
    ],
  },
  {
    id: 'xai-challenges',
    title: 'Challenges in Explainability',
    tagline: 'The obstacles between black-box models and human understanding',
    accent: { border: 'border-amber-500/40', badge: 'bg-amber-500/20 text-amber-300', num: 'text-amber-400', bar: 'bg-amber-500/30' },
    content: [
      {
        heading: 'Model Complexity',
        body: "Billions of parameters and hundreds of parallel attention heads create emergent behaviors that can't be reduced to simple rules.",
      },
      {
        heading: 'Accuracy vs. Interpretability',
        body: 'Choosing between a 92%-accurate black box and an 85%-accurate explainable model makes the business case for transparency genuinely hard to justify.',
      },
      {
        heading: 'Misleading Attention Weights',
        body: "High attention on a token doesn't mean it caused the output, so attention weights are an unreliable proxy for model reasoning.",
      },
      {
        heading: 'Post-hoc vs. Intrinsic',
        body: 'Post-hoc explanations are approximations added after the fact and are never fully faithful to the actual computation inside the model.',
      },
    ],
  },
  {
    id: 'xai-metrics',
    title: 'Validation & Performance Metrics',
    tagline: 'How we measure whether explanations and models can be trusted',
    accent: { border: 'border-sky-500/40', badge: 'bg-sky-500/20 text-sky-300', num: 'text-sky-400', bar: 'bg-sky-500/30' },
    content: [
      {
        heading: 'SHapley Additive exPlanations (SHAP) Values',
        body: 'SHapley Additive exPlanations (SHAP) assigns each input feature a game-theory-grounded contribution score, showing exactly how much it shifted a prediction up or down.',
      },
      {
        heading: 'Faithfulness & Completeness',
        body: "Faithfulness measures whether an explanation reflects real model behavior, while completeness checks that it accounts for the full prediction.",
      },
      {
        heading: 'Benchmarks: GLUE, BIG-Bench, HELM',
        body: "Stanford's HELM evaluates models across 42 scenarios and 7 metrics, providing a multi-dimensional framework for accountability.",
      },
      {
        heading: 'Human Evaluation',
        body: 'Having people rate whether an explanation actually helps them understand a decision remains the gold standard for validating XAI quality.',
      },
    ],
  },
  {
    id: 'xai-solutions',
    title: 'Current Solutions & Techniques',
    tagline: 'What industry leaders are doing to improve explainability',
    accent: { border: 'border-violet-500/40', badge: 'bg-violet-500/20 text-violet-300', num: 'text-violet-400', bar: 'bg-violet-500/30' },
    content: [
      {
        heading: 'LIME',
        body: "LIME approximates a complex model around a single prediction using a simpler one, identifying which features mattered most for that specific output.",
      },
      {
        heading: 'Constitutional AI (Anthropic)',
        body: "Anthropic trains Claude against an explicit set of principles it uses to self-critique, creating a traceable path from stated values to model behavior.",
      },
      {
        heading: 'Mechanistic Interpretability',
        body: "Anthropic's Monosemanticity research found individual neurons in Claude that activate for distinct human-interpretable concepts, a major step toward causal transparency.",
      },
      {
        heading: 'Chain-of-Thought Reasoning',
        body: "Prompting models to reason step-by-step makes their intermediate thinking visible and auditable, improving reviewability even if it isn't full explainability.",
      },
    ],
  },
];

const modelsExplainabilityModels = [
  {
    id: 'gpt4',
    name: 'GPT-4',
    version: 'OpenAI GPT-4 Turbo',
    domain: 'NLP / Generative AI',
    accent: {
      border: 'border-purple-500/40',
      badge: 'bg-purple-500/20 text-purple-300',
      bar: 'bg-purple-500',
      num: 'text-purple-400',
      glow: 'from-purple-600/10 to-purple-900/10',
    },
    specs: {
      parameters: '~1.76T (est.)',
      memory: '~350 GB (FP16)',
      accuracy: '86.4% (MMLU)',
      latency: '~500–800ms/token',
    },
    scores: { accuracy: 5, speed: 1, modelSize: 1, interpretability: 1, energyEff: 1, integration: 3 },
    description: "GPT-4 is OpenAI's flagship large language model, capable of reasoning across text, code, and images. At an estimated 1.76 trillion parameters, it represents the cutting edge of general-purpose AI, but at significant computational and financial cost.",
    strengths: ['Best-in-class reasoning & generation', 'Multimodal (text + vision)', 'Strong few-shot generalization'],
    weaknesses: ['Massive compute & cost', 'Near-zero interpretability', 'High inference latency'],
    bestFor: 'Complex reasoning, creative writing, code generation, enterprise chatbots',
  },
  {
    id: 'bert',
    name: 'BERT-base',
    version: 'Google BERT-base-uncased',
    domain: 'NLP / Encoder',
    accent: {
      border: 'border-indigo-500/40',
      badge: 'bg-indigo-500/20 text-indigo-300',
      bar: 'bg-indigo-500',
      num: 'text-indigo-400',
      glow: 'from-indigo-600/10 to-indigo-900/10',
    },
    specs: {
      parameters: '110M',
      memory: '~440 MB (FP32)',
      accuracy: '84.6% (GLUE avg.)',
      latency: '~20–50ms/sequence',
    },
    scores: { accuracy: 3, speed: 4, modelSize: 4, interpretability: 2, energyEff: 4, integration: 5 },
    description: "BERT (Bidirectional Encoder Representations from Transformers) is Google's encoder-only transformer, pre-trained on masked language modeling. At 110M parameters it's practical to fine-tune on commodity hardware and has become the backbone of countless NLP classification pipelines.",
    strengths: ['Fine-tunable on limited hardware', 'Strong on classification & NER', 'Wide ecosystem support'],
    weaknesses: ['Not a generative model', 'Context limited to 512 tokens', 'Outperformed by larger models on complex tasks'],
    bestFor: 'Sentiment analysis, text classification, named entity recognition, search ranking',
  },
  {
    id: 'efficientnet',
    name: 'EfficientNet-B0',
    version: 'Google EfficientNet-B0',
    domain: 'Computer Vision',
    accent: {
      border: 'border-emerald-500/40',
      badge: 'bg-emerald-500/20 text-emerald-300',
      bar: 'bg-emerald-500',
      num: 'text-emerald-400',
      glow: 'from-emerald-600/10 to-emerald-900/10',
    },
    specs: {
      parameters: '5.3M',
      memory: '~21 MB (FP32)',
      accuracy: '77.1% (ImageNet Top-1)',
      latency: '~5–10ms/image',
    },
    scores: { accuracy: 3, speed: 5, modelSize: 5, interpretability: 3, energyEff: 5, integration: 4 },
    description: "EfficientNet-B0 uses Neural Architecture Search and compound scaling to deliver strong ImageNet accuracy in under 6M parameters. It achieves better accuracy per FLOP than ResNet or VGG, making it the go-to baseline for edge and mobile vision tasks.",
    strengths: ['Best accuracy-per-parameter ratio', 'Edge/mobile deployable', 'Scales predictably (B0–B7)'],
    weaknesses: ['Lower ceiling than ViT on large datasets', 'Image-specific preprocessing required', 'Less flexible for non-image inputs'],
    bestFor: 'Image classification, object detection backbone, mobile/edge deployment',
  },
  {
    id: 'xgboost',
    name: 'XGBoost',
    version: 'XGBoost (tabular)',
    domain: 'Tabular / Structured Data',
    accent: {
      border: 'border-amber-500/40',
      badge: 'bg-amber-500/20 text-amber-300',
      bar: 'bg-amber-500',
      num: 'text-amber-400',
      glow: 'from-amber-600/10 to-amber-900/10',
    },
    specs: {
      parameters: 'N/A (tree ensemble)',
      memory: '~5–50 MB typical',
      accuracy: '~90–95% AUC (UCI)',
      latency: '<1ms/row',
    },
    scores: { accuracy: 4, speed: 5, modelSize: 5, interpretability: 4, energyEff: 5, integration: 5 },
    description: "XGBoost is a gradient-boosted decision tree ensemble celebrated for dominating Kaggle competitions on structured data. It requires no GPU, trains in seconds on typical tabular datasets, and produces SHapley Additive exPlanations (SHAP)-compatible feature importance scores natively, making it one of the most interpretable high-accuracy models available.",
    strengths: ['Natively SHapley Additive exPlanations (SHAP)-compatible', 'Fastest training on tabular data', 'Handles missing values internally'],
    weaknesses: ['Not suited for image/audio/text', 'Can overfit without tuning', 'No deep feature interaction learning'],
    bestFor: 'Fraud detection, credit scoring, churn prediction, healthcare risk models',
  },
];

const BlogPage: React.FC = () => {
  const [expandedModel, setExpandedModel] = useState<number | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/portfolio"
          className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 text-lg font-semibold"
        >
          <FaArrowLeft className="w-5 h-5" />
          Back to Portfolio
        </Link>
      </div>

      {/* Page Header */}
      <div className="pt-32 pb-8 px-8 lg:px-16 text-center">
        <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          ML Blog
        </h1>
        <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
          Deep dives into machine learning models and neural network concepts.
        </p>
      </div>

      {/* Machine Learning Models Section */}
      <section id="ml-models" className="px-8 lg:px-16 pt-20 pb-36">
        <div className="max-w-6xl mx-auto">
          <a href="#ml-models">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200">
              Machine Learning Models
            </h2>
          </a>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Click any card to explore details
          </p>

          {mlSections.map((sec) => {
            const sectionModels = mlModels.filter((m) => m.section === sec.id);
            return (
              <div key={sec.id} className="mb-16">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{sec.label}</h3>
                  <p className="text-gray-400 text-sm">{sec.description}</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-6">
                  {sectionModels.map((model) => {
                    const index = mlModels.indexOf(model);
                    const isExpanded = expandedModel === index;
                    return (
                      <div
                        key={model.id}
                        onClick={() => setExpandedModel(isExpanded ? null : index)}
                        className={`group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10
                          ${isExpanded ? 'lg:col-span-3 transition-all duration-500' : 'lg:col-span-1'}
                        `}
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2 block">
                                {model.category}
                              </span>
                              <h3 className="text-xl font-bold mb-1 transition-colors duration-300 group-hover:text-purple-200">
                                {model.name}
                              </h3>
                              <p className="text-gray-400 text-sm mb-3">{model.tagline}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${
                                  model.algorithmType === 'Supervised' ? 'bg-blue-500/10 border-blue-400/30 text-blue-300' :
                                  model.algorithmType === 'Unsupervised' ? 'bg-amber-500/10 border-amber-400/30 text-amber-300' :
                                  'bg-pink-500/10 border-pink-400/30 text-pink-300'
                                }`}>
                                  {model.algorithmType}
                                </span>
                                {model.domains.map((d) => (
                                  <span key={d} className="text-xs px-2 py-1 rounded-md border bg-white/5 border-white/10 text-gray-300">
                                    {d}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <span className={`text-purple-400 text-lg transition-transform duration-300 shrink-0 mt-1 ${isExpanded ? 'rotate-45' : ''}`}>
                              +
                            </span>
                          </div>

                          <div className={`grid ${isExpanded ? 'grid-rows-[1fr] mt-6 opacity-100 transition-all duration-500' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden min-h-0">
                              <p className="text-gray-300 leading-relaxed mb-6">{model.description}</p>
                              <div className="grid gap-6 lg:grid-cols-3">
                                <div>
                                  <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3">Use Cases</h4>
                                  <ul className="space-y-2">
                                    {model.useCases.map((uc, i) => (
                                      <li key={i} className="text-gray-300 text-sm flex gap-2">
                                        <span className="text-pink-400 shrink-0">▸</span>
                                        {uc}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3">Strengths</h4>
                                  <ul className="space-y-2">
                                    {model.strengths.map((s, i) => (
                                      <li key={i} className="text-gray-300 text-sm flex gap-2">
                                        <span className="text-green-400 shrink-0">✓</span>
                                        {s}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3">Limitations</h4>
                                  <ul className="space-y-2 mb-4">
                                    {model.limitations.map((l, i) => (
                                      <li key={i} className="text-gray-300 text-sm flex gap-2">
                                        <span className="text-red-400 shrink-0">✗</span>
                                        {l}
                                      </li>
                                    ))}
                                  </ul>
                                  <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3">Tools</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {model.exampleTools.map((tool, i) => (
                                      <span key={i} className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-white/10 rounded-lg px-2 py-1 text-xs font-medium text-gray-200">
                                        {tool}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div className="px-8 lg:px-16">
        <div className="max-w-6xl mx-auto border-t border-white/10" />
      </div>

      {/* Neural Networks Section */}
      <NeuralNetworkSection />

      {/* Divider */}
      <div className="px-8 lg:px-16">
        <div className="max-w-6xl mx-auto border-t border-white/10" />
      </div>

      {/* Explainable AI Section */}
      <section id="explainable-ai" className="px-8 lg:px-16 pt-20 pb-36">
        <div className="max-w-6xl mx-auto">
          <a href="#explainable-ai">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200">
              Explainable AI
            </h2>
          </a>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Why AI transparency matters, the challenges of making models legible, and how the industry is responding
          </p>

          <div className="grid lg:grid-cols-2 gap-14">
            {xaiTopics.map((topic) => {
              const a = topic.accent;
              return (
                <div
                  key={topic.id}
                  id={topic.id}
                  className={`bg-white/5 backdrop-blur-sm border ${a.border} rounded-2xl overflow-hidden flex flex-col hover:bg-white/10 hover:scale-[1.02] transition-transform duration-300`}
                >
                  {/* Card Header */}
                  <div className="px-6 pt-6 pb-4 border-b border-white/10">
                    <h3 className="text-xl font-bold text-white leading-snug mb-1">{topic.title}</h3>
                    <p className="text-gray-400 text-sm">{topic.tagline}</p>
                  </div>

                  {/* Content Items */}
                  <div className="p-6 space-y-5 select-text">
                    {topic.content.map((item, i) => (
                      <div key={item.heading} className="group/item flex gap-4 cursor-default">
                        <span className={`text-sm font-bold mt-0.5 shrink-0 w-5 text-right transition-colors duration-200 group-hover/item:text-white ${a.num}`}>{i + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-base font-semibold text-white">{item.heading}</h4>
                            <FaChevronDown className={`w-3 h-3 shrink-0 transition-transform duration-500 group-hover/item:rotate-180 ${a.num}`} />
                          </div>
                          <div className="grid grid-rows-[0fr] group-hover/item:grid-rows-[1fr] transition-[grid-template-rows] duration-500">
                            <div className="overflow-hidden min-h-0">
                              <p className="text-gray-300 text-sm leading-relaxed pt-1">{item.body}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="px-8 lg:px-16">
        <div className="max-w-6xl mx-auto border-t border-white/10" />
      </div>

      {/* Models Explainability Section */}
      <section id="models-explainability" className="px-8 lg:px-16 pt-20 pb-36">
        <div className="max-w-6xl mx-auto">
          <a href="#models-explainability">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-white via-orange-200 to-rose-200 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200">
              Models Explainability
            </h2>
          </a>
          <p className="text-gray-400 text-center mb-12 text-lg max-w-3xl mx-auto">
            Comparing pre-trained models across NLP, Computer Vision, and Tabular domains, balancing accuracy, efficiency, and interpretability.
          </p>

          {/* Introduction */}
          <div className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-orange-200 mb-3">Introduction</h3>
            <p className="text-gray-300 leading-relaxed">
              As AI systems become embedded in high-stakes decisions, from loan approvals to medical diagnoses, the ability to explain <em>why</em> a model produced a given output is no longer optional. Yet explainability exists in direct tension with performance: the most accurate models are often the least interpretable. This analysis examines four pre-trained models across three domains: NLP, Computer Vision, and Tabular data, providing a structured decision matrix to guide model selection based on your application&apos;s accuracy, latency, and explainability constraints.
            </p>
          </div>

          {/* Methodology */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-14">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Methodology</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Models selected to span NLP/Generative AI (GPT-4, BERT-base), Computer Vision (EfficientNet-B0), and Tabular/Structured data (XGBoost). Accuracy metrics sourced from official benchmarks: MMLU for GPT-4, GLUE average for BERT, ImageNet Top-1 for EfficientNet, UCI ML benchmark suite for XGBoost. Size and latency figures sourced from published model cards and peer-reviewed inference benchmarking literature. Interpretability rated qualitatively (1–5) based on availability of native explanation mechanisms, SHapley Additive exPlanations (SHAP) compatibility, and academic consensus on model transparency.
            </p>
          </div>

          {/* 4 Model Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {modelsExplainabilityModels.map((model) => {
              const a = model.accent;
              return (
                <div key={model.id} className={`bg-white/5 backdrop-blur-sm border ${a.border} rounded-2xl overflow-hidden`}>
                  {/* Card Header */}
                  <div className={`px-6 pt-6 pb-4 bg-gradient-to-br ${a.glow} border-b border-white/10`}>
                    <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${a.badge}`}>
                      {model.domain}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-1">{model.name}</h3>
                    <p className="text-gray-500 text-xs">{model.version}</p>
                  </div>

                  <div className="px-6 pt-5 pb-6">
                    <p className="text-gray-300 text-sm leading-relaxed mb-5">{model.description}</p>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {(Object.entries({ 'Parameters': model.specs.parameters, 'Memory': model.specs.memory, 'Accuracy': model.specs.accuracy, 'Latency': model.specs.latency }) as [string, string][]).map(([k, v]) => (
                        <div key={k} className="bg-white/5 rounded-lg px-3 py-2">
                          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{k}</div>
                          <div className="text-sm font-semibold text-white">{v}</div>
                        </div>
                      ))}
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-2">Strengths</h4>
                        <ul className="space-y-1">
                          {model.strengths.map((s, i) => (
                            <li key={i} className="text-gray-300 text-xs flex gap-2"><span className="text-green-400 shrink-0">✓</span>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">Weaknesses</h4>
                        <ul className="space-y-1">
                          {model.weaknesses.map((w, i) => (
                            <li key={i} className="text-gray-300 text-xs flex gap-2"><span className="text-red-400 shrink-0">✗</span>{w}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Best for: </span>
                      <span className="text-xs text-gray-300">{model.bestFor}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decision Matrix Table */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-2 text-center">Decision Matrix</h3>
            <p className="text-gray-400 text-sm text-center mb-8">Scores 1–5 &nbsp;·&nbsp; Higher = better &nbsp;·&nbsp; Compactness/Speed: 5 = smallest/fastest</p>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left py-4 px-5 text-gray-400 text-sm font-semibold">Criterion</th>
                    {modelsExplainabilityModels.map(m => (
                      <th key={m.id} className={`text-center py-4 px-5 text-sm font-bold ${m.accent.num}`}>{m.name}</th>
                    ))}
                    <th className="text-center py-4 px-5 text-gray-400 text-sm font-semibold">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    { key: 'accuracy', label: 'Accuracy', weight: 'High' },
                    { key: 'speed', label: 'Inference Speed', weight: 'Medium' },
                    { key: 'modelSize', label: 'Model Compactness', weight: 'Medium' },
                    { key: 'interpretability', label: 'Interpretability', weight: 'High' },
                    { key: 'energyEff', label: 'Energy Efficiency', weight: 'Low' },
                    { key: 'integration', label: 'Ease of Integration', weight: 'Medium' },
                  ] as { key: keyof typeof modelsExplainabilityModels[0]['scores']; label: string; weight: string }[]).map((row, ri) => (
                    <tr key={row.key} className={`border-b border-white/5 ${ri % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                      <td className="py-4 px-5 text-sm">
                        <div className="text-gray-200 font-medium">{row.label}</div>
                        <div className={`text-xs mt-0.5 ${row.weight === 'High' ? 'text-orange-400' : row.weight === 'Medium' ? 'text-yellow-500' : 'text-gray-500'}`}>{row.weight} weight</div>
                      </td>
                      {modelsExplainabilityModels.map(m => {
                        const score = m.scores[row.key];
                        return (
                          <td key={m.id} className="py-4 px-5 text-center">
                            <div className="flex justify-center gap-0.5 mb-1">
                              {[1,2,3,4,5].map(i => (
                                <div key={i} className={`w-4 h-4 rounded-sm ${i <= score ? m.accent.bar : 'bg-white/10'}`} />
                              ))}
                            </div>
                            <div className="text-xs text-gray-400">{score}/5</div>
                          </td>
                        );
                      })}
                      <td className="py-4 px-5 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${row.weight === 'High' ? 'bg-orange-500/20 text-orange-300' : row.weight === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-gray-500/20 text-gray-400'}`}>{row.weight}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Analysis */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Analysis</h3>
            <div className="grid lg:grid-cols-2 gap-4">
              {[
                { label: 'NLP', color: 'text-purple-300', text: 'GPT-4 for generation, BERT for classification. Neither offers native interpretability.' },
                { label: 'Vision', color: 'text-emerald-300', text: 'EfficientNet-B0 wins on efficiency. Apply Grad-CAM when explainability is required.' },
                { label: 'Tabular', color: 'text-amber-300', text: 'XGBoost dominates. SHapley Additive exPlanations (SHAP)-native and fast, the default for regulated industries.' },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex gap-4 items-start">
                  <span className={`text-xs font-bold uppercase tracking-widest shrink-0 mt-0.5 w-16 ${item.color}`}>{item.label}</span>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-orange-500/10 to-rose-500/10 border border-orange-500/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-orange-200 mb-3">Conclusion</h3>
            <p className="text-gray-300 leading-relaxed">
              Model selection is never a purely technical decision, it requires balancing accuracy, cost, latency, interpretability, and regulatory context. GPT-4 leads in capability but sacrifices interpretability and efficiency. BERT-base offers a practical middle ground for NLP. EfficientNet-B0 is the benchmark for efficient vision models. XGBoost remains the gold standard for structured data where auditability matters. As model complexity grows and regulation tightens, the ability to explain model decisions will become as important as the decisions themselves, making frameworks like SHapley Additive exPlanations (SHAP), LIME, Grad-CAM, and attention probing essential tools in any production ML pipeline.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-8 lg:px-16">
        <div className="max-w-6xl mx-auto border-t border-white/10" />
      </div>

      {/* Generative AI Section */}
      <section id="generative-ai" className="px-8 lg:px-16 pt-20 pb-36">
        <div className="max-w-6xl mx-auto">
          <a href="#generative-ai">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200">
              Generative AI
            </h2>
          </a>
          <p className="text-gray-400 text-center mb-16 text-lg">
            How LLMs are trained, what they do, and why they work
          </p>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {genAITopics.map((topic, ti) => {
              const accents = [
                { border: 'border-indigo-500/40', badge: 'bg-indigo-500/20 text-indigo-300', dot: 'bg-indigo-400', num: 'text-indigo-400' },
                { border: 'border-purple-500/40', badge: 'bg-purple-500/20 text-purple-300', dot: 'bg-purple-400', num: 'text-purple-400' },
                { border: 'border-pink-500/40',   badge: 'bg-pink-500/20 text-pink-300',   dot: 'bg-pink-400',   num: 'text-pink-400'   },
              ];
              const a = accents[ti];
              return (
                <div key={topic.id} className={`group cursor-default bg-white/5 backdrop-blur-sm border ${a.border} rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 ease-out hover:scale-[1.04] hover:z-10 relative hover:bg-white/10`}>
                  {/* Card Header */}
                  <div className="p-6 pb-4 border-b border-white/10">
                    <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${a.badge}`}>
                      Generative AI
                    </span>
                    <h3 className="text-xl font-bold text-white leading-snug mb-1 transition-all duration-300 group-hover:text-2xl">{topic.title}</h3>
                    <p className="text-gray-400 text-sm transition-all duration-300 group-hover:text-base">{topic.tagline}</p>
                  </div>

                  {/* Content Items */}
                  <div className="p-6 space-y-5 select-none">
                    {topic.content.map((item, i) => (
                      <div key={item.heading} className="flex gap-4">
                        <span className={`text-sm font-bold mt-0.5 shrink-0 w-5 text-right transition-all duration-300 group-hover:text-base ${a.num}`}>{i + 1}</span>
                        <div>
                          <h4 className="text-base font-semibold text-white mb-1 transition-all duration-300 group-hover:text-lg">{item.heading}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed transition-all duration-300 group-hover:text-base">{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
