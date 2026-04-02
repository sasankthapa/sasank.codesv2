import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
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
        body: 'LLMs don\'t read words — they read tokens. Text is broken into subword chunks (e.g. "running" → "run" + "ning"). Each token maps to a number, turning language into a sequence of integers the model can process.',
      },
      {
        heading: 'The Transformer Architecture',
        body: 'At the core of every LLM is the Transformer. It processes all tokens in parallel using self-attention — a mechanism that lets each token "look at" every other token in the sequence to understand context. Stacking many attention layers allows the model to capture complex, long-range relationships in language.',
      },
      {
        heading: 'Pre-training: Next Token Prediction',
        body: 'LLMs are trained on massive text corpora (trillions of tokens from the web, books, and code) with a simple objective: predict the next token given all previous tokens. This self-supervised task forces the model to internalize grammar, facts, reasoning patterns, and world knowledge.',
      },
      {
        heading: 'Embeddings & Representations',
        body: 'Each token is mapped to a high-dimensional vector (embedding). Through training, semantically similar words cluster together in this space. The model learns rich internal representations — "Paris" minus "France" plus "Italy" ≈ "Rome" emerges naturally from training on language.',
      },
      {
        heading: 'Scaling Laws',
        body: 'Performance improves predictably with more parameters, more data, and more compute. GPT-3 has 175B parameters; GPT-4 and Claude 3 are estimated at over 1 trillion. Emergent capabilities — like multi-step reasoning — appear suddenly at certain scale thresholds rather than improving gradually.',
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
        body: 'A search engine retrieves documents matching your query. ChatGPT generates a response by predicting the most coherent continuation of the conversation — it doesn\'t look things up in real time (unless given a tool). This makes it flexible and fluent, but also prone to hallucination when it confidently generates plausible-sounding but incorrect information.',
      },
      {
        heading: 'The Role of RLHF',
        body: 'What makes ChatGPT feel like a "helpful assistant" rather than a raw text predictor is RLHF. Human trainers provided example conversations, then ranked model outputs by quality. A reward model learned these preferences and was used to fine-tune GPT via reinforcement learning — steering it toward helpful, harmless, and honest responses.',
      },
      {
        heading: 'Context Window',
        body: 'ChatGPT maintains a "context window" — a fixed number of tokens (ranging from 4K to 128K+ depending on the model) that it can see at once. Everything in the conversation so far lives in this window. Once a conversation exceeds it, the oldest content is dropped.',
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
        body: 'At every step, ChatGPT produces a probability distribution over all ~100,000 possible tokens and samples from it. That\'s it. There\'s no explicit reasoning engine, no knowledge database, no symbolic logic — just a massive neural network trained to predict what comes next in text.',
      },
      {
        heading: 'Why Does Token Prediction Produce Intelligence?',
        body: 'Because to accurately predict the next word across trillions of examples, the model must implicitly learn the underlying structure of language, facts about the world, logical relationships, and even theory of mind. Predicting "The Eiffel Tower is in ___" correctly requires knowing geography. Predicting good code requires understanding algorithms. Intelligence emerges as a side effect of compression.',
      },
      {
        heading: 'Temperature & Sampling',
        body: 'The "creativity" dial on LLMs is temperature. At temperature 0, the model always picks the highest-probability token (deterministic, repetitive). At higher temperatures, lower-probability tokens get more weight — producing more creative but less reliable outputs. Most chat applications use a temperature around 0.7–1.0.',
      },
      {
        heading: 'Why It Hallucinates',
        body: 'The model is optimized to generate fluent, coherent text — not to be factually correct. When it doesn\'t "know" something, it fills in the gap with a plausible-sounding continuation. It has no internal truth-checker. This is why hallucination is a fundamental property of current LLMs, not a bug to be easily patched.',
      },
      {
        heading: 'Chain-of-Thought Reasoning',
        body: 'Asking the model to "think step by step" dramatically improves accuracy on math and logic tasks. By generating intermediate reasoning tokens before the final answer, the model effectively uses its own output as working memory — each token it writes becomes context it can attend to in subsequent tokens.',
      },
      {
        heading: 'Why It Feels Like Understanding',
        body: 'The internal representations learned during training encode semantic relationships so richly that the model generalizes far beyond its training data. It can solve novel analogies, write code in languages it saw rarely, and reason about hypotheticals — not because it memorized answers, but because it learned the deep structure of human knowledge.',
      },
    ],
  },
];

const BlogPage: React.FC = () => {
  const [expandedModel, setExpandedModel] = useState<number | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [expandedTopicSection, setExpandedTopicSection] = useState<string | null>(null);

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

          <div className="space-y-6">
            {genAITopics.map((topic) => {
              const isTopicOpen = expandedTopic === topic.id;
              return (
                <div
                  key={topic.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300"
                >
                  {/* Topic Header */}
                  <button
                    className="w-full p-6 flex items-center justify-between gap-4 cursor-pointer text-left"
                    onClick={() => setExpandedTopic(isTopicOpen ? null : topic.id)}
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-1 block">
                        Generative AI
                      </span>
                      <h3 className="text-xl font-bold text-white">{topic.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{topic.tagline}</p>
                    </div>
                    <span className={`text-purple-400 text-lg transition-transform duration-300 shrink-0 ${isTopicOpen ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>

                  {/* Topic Content */}
                  <div className={`grid ${isTopicOpen ? 'grid-rows-[1fr] transition-all duration-500' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden min-h-0">
                      <div className="px-6 pb-6 space-y-3">
                        {topic.content.map((item) => {
                          const key = `${topic.id}-${item.heading}`;
                          const isSectionOpen = expandedTopicSection === key;
                          return (
                            <div
                              key={key}
                              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                            >
                              <button
                                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-white/5 transition-colors duration-200"
                                onClick={() => setExpandedTopicSection(isSectionOpen ? null : key)}
                              >
                                <span className="font-semibold text-white">{item.heading}</span>
                                <span className={`text-purple-400 text-base transition-transform duration-300 shrink-0 ${isSectionOpen ? 'rotate-45' : ''}`}>
                                  +
                                </span>
                              </button>
                              <div className={`grid ${isSectionOpen ? 'grid-rows-[1fr] transition-all duration-500' : 'grid-rows-[0fr]'}`}>
                                <div className="overflow-hidden min-h-0">
                                  <p className="px-5 pb-4 text-gray-300 text-sm leading-relaxed">{item.body}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
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
