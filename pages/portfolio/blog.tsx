import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { mlModels, mlSections } from '../../lib/mlModelsData';
import NeuralNetworkSection from '../../components/NeuralNetworkSection';

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
    </div>
  );
};

export default BlogPage;
