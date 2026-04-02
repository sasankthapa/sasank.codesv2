import React, { useState } from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────
type NNComponentId =
  | 'layers'
  | 'neurons'
  | 'weights'
  | 'activation'
  | 'loss'
  | 'optimization';

type DiagramSelection =
  | { kind: 'neuron'; id: string; layer: number; idx: number }
  | { kind: 'connection'; id: string }
  | { kind: 'layer'; idx: number }
  | null;

// ─── Layout constants ──────────────────────────────────────────────────────
const LAYERS_DEF = [3, 4, 4, 2];
const SVG_W = 560;
const SVG_H = 300;
const LAYER_X = [70, 210, 350, 490];
const LAYER_LABELS = ['Input', 'Hidden 1', 'Hidden 2', 'Output'];
const NEURON_R = 18;
const LAYER_COLORS = ['#818cf8', '#a78bfa', '#c084fc', '#f472b6'];

function getNeuronY(layerIdx: number, neuronIdx: number): number {
  const count = LAYERS_DEF[layerIdx];
  const spacing = SVG_H / (count + 1);
  return spacing * (neuronIdx + 1);
}

const ALL_NEURONS = LAYERS_DEF.map((count, li) =>
  Array.from({ length: count }, (_, ni) => ({
    x: LAYER_X[li],
    y: getNeuronY(li, ni),
    layer: li,
    idx: ni,
    id: `n-${li}-${ni}`,
  }))
);

type Connection = {
  x1: number; y1: number;
  x2: number; y2: number;
  id: string; layerFrom: number; globalIdx: number;
  fromNeuron: number; toNeuron: number;
};

const ALL_CONNECTIONS: Connection[] = [];
let _gi = 0;
for (let l = 0; l < LAYERS_DEF.length - 1; l++) {
  for (let i = 0; i < LAYERS_DEF[l]; i++) {
    for (let j = 0; j < LAYERS_DEF[l + 1]; j++) {
      ALL_CONNECTIONS.push({
        x1: LAYER_X[l],         y1: getNeuronY(l, i),
        x2: LAYER_X[l + 1],    y2: getNeuronY(l + 1, j),
        layerFrom: l, fromNeuron: i, toNeuron: j,
        id: `c-${l}-${i}-${j}`,
        globalIdx: _gi++,
      });
    }
  }
}

// Stable pseudo-random values
const SAMPLE_WEIGHTS: Record<string, string> = {};
ALL_CONNECTIONS.forEach((c, i) => {
  SAMPLE_WEIGHTS[c.id] = (Math.sin(i * 1.618033) * 0.85).toFixed(2);
});

const SAMPLE_NEURON_OUTPUTS: Record<string, string> = {};
ALL_NEURONS.flat().forEach(n => {
  if (n.layer === 0) {
    SAMPLE_NEURON_OUTPUTS[n.id] = [0.74, 0.31, 0.92][n.idx]?.toFixed(3) ?? '0.500';
  } else {
    SAMPLE_NEURON_OUTPUTS[n.id] = Math.abs(Math.sin(n.layer * 5.3 + n.idx * 2.7)).toFixed(3);
  }
});

// ─── Component metadata ────────────────────────────────────────────────────
const NN_COMPONENTS: {
  id: NNComponentId;
  name: string;
  tagline: string;
  gradient: string;
  border: string;
  textColor: string;
  dotColor: string;
  description: string;
  points: string[];
}[] = [
  {
    id: 'layers',
    name: 'Layers',
    tagline: 'Organized stages of computation',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    border: 'border-blue-400/40',
    textColor: 'text-blue-300',
    dotColor: 'text-blue-400',
    description:
      'A neural network is organized into layers — groups of neurons that process information together at the same stage. Each layer transforms its inputs and passes its outputs forward.',
    points: [
      'Input Layer: receives raw features (pixel values, numbers, tokens)',
      'Hidden Layers: learn intermediate representations and patterns',
      'Output Layer: produces the final prediction or class scores',
      'Depth (number of layers) determines representational capacity',
    ],
  },
  {
    id: 'neurons',
    name: 'Neurons',
    tagline: 'Atomic units of computation',
    gradient: 'from-purple-600/20 to-violet-600/20',
    border: 'border-purple-400/40',
    textColor: 'text-purple-300',
    dotColor: 'text-purple-400',
    description:
      'Each neuron computes a weighted sum of its inputs, adds a bias, then passes the result through an activation function — loosely inspired by biological neurons in the brain.',
    points: [
      'Receives a signal from every neuron in the previous layer',
      'Computes pre-activation: z = Σ(wᵢ · xᵢ) + b',
      'Applies non-linearity: output = f(z)',
      'Modern networks contain millions to hundreds of billions of neurons',
    ],
  },
  {
    id: 'weights',
    name: 'Weights',
    tagline: 'The learned parameters of the network',
    gradient: 'from-amber-600/20 to-orange-600/20',
    border: 'border-amber-400/40',
    textColor: 'text-amber-300',
    dotColor: 'text-amber-400',
    description:
      'Weights are learnable real numbers on every connection between neurons. They control how strongly one neuron influences the next. The network\'s knowledge is encoded entirely in these values.',
    points: [
      'Every connection has exactly one weight (a floating-point number)',
      'Biases are additional learnable offsets per neuron',
      'Initialized randomly, then refined iteratively during training',
      'GPT-4 has an estimated 1.8 trillion learnable parameters',
    ],
  },
  {
    id: 'activation',
    name: 'Activation Functions',
    tagline: 'Introducing the non-linearity that makes deep learning work',
    gradient: 'from-green-600/20 to-emerald-600/20',
    border: 'border-green-400/40',
    textColor: 'text-green-300',
    dotColor: 'text-green-400',
    description:
      'Without activations, stacking layers collapses to a single linear transformation. Activations introduce non-linearity so networks can learn complex curves and decision boundaries.',
    points: [
      'ReLU: f(x) = max(0, x) — fast, avoids vanishing gradients',
      'Sigmoid: f(x) = 1/(1+e⁻ˣ) — squashes to (0, 1)',
      'Tanh: centered at 0, outputs (−1, 1)',
      'Softmax: converts output layer to a probability distribution',
    ],
  },
  {
    id: 'loss',
    name: 'Loss Functions',
    tagline: 'Measuring how wrong the network is',
    gradient: 'from-red-600/20 to-pink-600/20',
    border: 'border-red-400/40',
    textColor: 'text-red-300',
    dotColor: 'text-red-400',
    description:
      'A loss function quantifies the gap between predictions and true labels. Training is the process of minimizing this value by adjusting every weight via backpropagation.',
    points: [
      'MSE: Σ(predicted − actual)² ÷ n — standard for regression',
      'Cross-Entropy: −Σ y·log(ŷ) — gold standard for classification',
      'Binary Cross-Entropy: specialization for binary tasks',
      'The gradient of the loss drives all weight updates',
    ],
  },
  {
    id: 'optimization',
    name: 'Optimization',
    tagline: 'How the network learns from its errors',
    gradient: 'from-indigo-600/20 to-blue-600/20',
    border: 'border-indigo-400/40',
    textColor: 'text-indigo-300',
    dotColor: 'text-indigo-400',
    description:
      'Optimizers use backpropagation (the chain rule applied backwards) to compute gradients of the loss w.r.t. each weight, then step weights in the direction that reduces loss.',
    points: [
      'Backpropagation: chain rule applied recursively backward through layers',
      'SGD: stochastic gradient descent — fast, noisy updates per mini-batch',
      'Adam: adaptive per-parameter learning rates — most widely used',
      'Learning rate: too high → diverges; too low → converges slowly',
    ],
  },
];

// ─── SVG Diagram ───────────────────────────────────────────────────────────
interface DiagramProps {
  active: NNComponentId | null;
  selection: DiagramSelection;
  onNeuronClick: (layer: number, idx: number, id: string, e: React.MouseEvent) => void;
  onConnectionClick: (c: Connection, e: React.MouseEvent) => void;
  onLayerClick: (idx: number, e: React.MouseEvent) => void;
  onDismiss: () => void;
}

const NeuralNetDiagram: React.FC<DiagramProps> = ({
  active, selection,
  onNeuronClick, onConnectionClick, onLayerClick, onDismiss,
}) => {
  const connColor = (c: Connection): string => {
    if (selection?.kind === 'connection' && selection.id === c.id) return '#fde68a';
    if (active === 'weights')      return '#fbbf24';
    if (active === 'optimization') return '#818cf8';
    return LAYER_COLORS[c.layerFrom];
  };
  const connOpacity = (c: Connection): number => {
    if (selection?.kind === 'connection' && selection.id === c.id) return 1;
    if (active === 'weights')      return 0.5;
    if (active === 'optimization') return 0.35;
    return 0.45;
  };
  const connWidth = (c: Connection): number => {
    if (selection?.kind === 'connection' && selection.id === c.id) return 2.5;
    if (active === 'weights') return 1.4;
    return 1;
  };

  return (
    <div className="relative w-full">

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H + 52}`}
        className="w-full"
        style={{ maxHeight: '340px' }}
        aria-label="Interactive neural network diagram"
        onClick={onDismiss}
      >
        <defs>
          {LAYER_COLORS.map((color, i) => (
            <radialGradient key={i} id={`nn-grad-${i}`} cx="45%" cy="35%" r="70%">
              <stop offset="0%" stopColor={color} stopOpacity={0.55} />
              <stop offset="100%" stopColor={color} stopOpacity={0.07} />
            </radialGradient>
          ))}
          <radialGradient id="nn-grad-sel" cx="45%" cy="35%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity={0.45} />
            <stop offset="100%" stopColor="white" stopOpacity={0.06} />
          </radialGradient>
          <filter id="nn-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="nn-glow-md" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Transparent background hit area to dismiss ── */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H + 52} fill="transparent" />

        {/* ── Layer highlight bands ── */}
        {active === 'layers' && LAYERS_DEF.map((_, li) => {
          const fills   = ['#3b82f612','#8b5cf612','#a855f712','#ec489912'];
          const strokes = ['#3b82f6',  '#8b5cf6',  '#a855f7',  '#ec4899'];
          return (
            <rect key={li}
              x={LAYER_X[li] - 33} y={6} width={66} height={SVG_H - 2} rx={14}
              fill={fills[li]} stroke={strokes[li]} strokeWidth={1} strokeOpacity={0.55}
              style={{ animation: 'nn-layer-bg 2s ease-in-out infinite', animationDelay: `${li * 0.3}s` }}
            />
          );
        })}

        {/* ── Connections ── */}
        {ALL_CONNECTIONS.map(c => {
          const isSelConn = selection?.kind === 'connection' && selection.id === c.id;
          const midX  = (c.x1 + c.x2) / 2;
          const midY  = (c.y1 + c.y2) / 2;
          const showWLabel = (active === 'weights' && c.globalIdx % 5 === 1) || isSelConn;

          return (
            <g key={c.id}>
              {/* Base line */}
              <line
                x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke={connColor(c)}
                strokeWidth={connWidth(c)}
                strokeOpacity={connOpacity(c)}
              />

              {/* Weight value label */}
              {showWLabel && (
                <g>
                  <rect
                    x={midX - 14} y={midY - 13}
                    width={28} height={13}
                    rx={4}
                    fill="#1e1b4b"
                    fillOpacity={0.85}
                  />
                  <text
                    x={midX} y={midY - 4}
                    textAnchor="middle" fontSize={8}
                    fill={isSelConn ? '#fde68a' : '#fbbf24'}
                    fillOpacity={0.95}
                  >
                    {SAMPLE_WEIGHTS[c.id]}
                  </text>
                </g>
              )}

              {/* Wide transparent hit area */}
              <line
                x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke="transparent"
                strokeWidth={14}
                className="nn-conn-hit"
                onClick={e => { e.stopPropagation(); onConnectionClick(c, e); }}
              />
            </g>
          );
        })}

        {/* ── Neurons ── */}
        {ALL_NEURONS.flat().map(n => {
          const isOutput   = n.layer === LAYERS_DEF.length - 1;
          const isLoss     = active === 'loss';
          const isSelected = selection?.kind === 'neuron' && selection.id === n.id;
          const allGlow    = active === 'neurons';
          const needsFilter = isSelected || allGlow || (isLoss && isOutput);

          return (
            <g
              key={n.id}
              filter={needsFilter ? (isSelected ? 'url(#nn-glow-md)' : 'url(#nn-glow-sm)') : undefined}
              className="nn-neuron-hover"
              onClick={e => { e.stopPropagation(); onNeuronClick(n.layer, n.idx, n.id, e); }}
            >
              {/* Selection ring (pulsing) */}
              {isSelected && (
                <circle
                  cx={n.x} cy={n.y} r={NEURON_R + 9}
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  style={{ animation: 'nn-sel-ring 1.6s ease-in-out infinite' }}
                />
              )}

              {/* General glow ring — neurons mode */}
              {allGlow && !isSelected && (
                <circle
                  cx={n.x} cy={n.y} r={NEURON_R + 8}
                  fill="none"
                  stroke={LAYER_COLORS[n.layer]}
                  strokeWidth={1.5}
                  style={{ animation: 'nn-glow-ring 1.8s ease-in-out infinite', animationDelay: `${n.idx * 0.22}s` }}
                />
              )}

              {/* Loss ring on output neurons */}
              {isLoss && isOutput && (
                <>
                  <circle cx={n.x} cy={n.y} r={NEURON_R + 8}  fill="none" stroke="#f87171" strokeWidth={1.5}
                    style={{ animation: 'nn-glow-ring 1.8s ease-in-out infinite', animationDelay: `${n.idx * 0.22}s` }} />
                  <circle cx={n.x} cy={n.y} r={NEURON_R + 20} fill="none" stroke="#f87171" strokeWidth={1}
                    strokeDasharray="4 5"
                    style={{ animation: 'nn-error-ring 1.2s ease-in-out infinite', animationDelay: `${n.idx * 0.3}s` }} />
                </>
              )}

              {/* Main neuron body */}
              <circle
                cx={n.x} cy={n.y} r={NEURON_R}
                fill={isSelected ? 'url(#nn-grad-sel)' : `url(#nn-grad-${n.layer})`}
                stroke={isSelected ? 'white' : LAYER_COLORS[n.layer]}
                strokeWidth={isSelected ? 2 : 1.5}
                strokeOpacity={isSelected ? 0.9 : 0.75}
              />

              {/* f(x) label — activation mode */}
              {active === 'activation' && (
                <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle"
                  fontSize={8} fontWeight="bold" fill="white" fillOpacity={0.9}>f(x)</text>
              )}

              {/* ŷ label — loss mode */}
              {isLoss && isOutput && (
                <text x={n.x + NEURON_R + 26} y={n.y + 4} textAnchor="middle" dominantBaseline="middle"
                  fontSize={9} fill="#f87171" fillOpacity={0.9}>ŷ</text>
              )}

              {/* Output value label when selected */}
              {isSelected && (
                <g>
                  <rect
                    x={n.x - 18} y={n.y + NEURON_R + 4}
                    width={36} height={13}
                    rx={4}
                    fill="#1e1b4b"
                    fillOpacity={0.9}
                  />
                  <text
                    x={n.x} y={n.y + NEURON_R + 13}
                    textAnchor="middle" fontSize={8}
                    fill="white" fillOpacity={0.85}
                  >
                    {SAMPLE_NEURON_OUTPUTS[n.id]}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* ── Layer labels (clickable) ── */}
        {LAYER_LABELS.map((label, li) => {
          const isSelLayer = selection?.kind === 'layer' && selection.idx === li;
          return (
            <text
              key={li}
              x={LAYER_X[li]} y={SVG_H + 28}
              textAnchor="middle" fontSize={11}
              fontWeight={active === 'layers' || isSelLayer ? 700 : 400}
              fill={isSelLayer ? 'white' : active === 'layers' ? LAYER_COLORS[li] : '#d1d5db'}
              className="nn-label-click"
              onClick={e => { e.stopPropagation(); onLayerClick(li, e); }}
            >
              {label}
            </text>
          );
        })}


        {/* ── Click hint (only when nothing selected/active) ── */}
        {!active && !selection && (
          <text x={SVG_W / 2} y={SVG_H - 8} textAnchor="middle" fontSize={9} fill="#374151">
            click neurons · connections · layer labels
          </text>
        )}
      </svg>
    </div>
  );
};

// ─── Main Section ──────────────────────────────────────────────────────────
const NeuralNetworkSection: React.FC = () => {
  const [activeComp, setActiveComp] = useState<NNComponentId | null>(null);
  const [selection,  setSelection]  = useState<DiagramSelection>(null);

  const handleNeuronClick = (layer: number, idx: number, id: string, _e: React.MouseEvent) => {
    if (selection?.kind === 'neuron' && selection.id === id) {
      setSelection(null); setActiveComp(null);
    } else {
      setSelection({ kind: 'neuron', id, layer, idx });
      setActiveComp('neurons');
    }
  };

  const handleConnectionClick = (c: Connection, _e: React.MouseEvent) => {
    if (selection?.kind === 'connection' && selection.id === c.id) {
      setSelection(null); setActiveComp(null);
    } else {
      setSelection({ kind: 'connection', id: c.id });
      setActiveComp('weights');
    }
  };

  const handleLayerClick = (idx: number, _e: React.MouseEvent) => {
    if (selection?.kind === 'layer' && selection.idx === idx) {
      setSelection(null); setActiveComp(null);
    } else {
      setSelection({ kind: 'layer', idx });
      setActiveComp('layers');
    }
  };

  const handleDismiss = () => setSelection(null);

  const toggleCard = (id: NNComponentId) => {
    setActiveComp(prev => prev === id ? null : id);
    setSelection(null);
  };

  return (
    <section id="neural-networks" className="px-8 lg:px-16 pt-20 pb-36">
      <div className="max-w-6xl mx-auto">
        <a href="#neural-networks">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200">
            Neural Networks
          </h2>
        </a>
        <p className="text-gray-400 text-center mb-12 text-lg">
          Click neurons, connections, or layer labels — or use the cards below
        </p>

        {/* ── Diagram card ── */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-10 transition-all duration-300 hover:bg-white/[0.07]">

          {/* Active state label */}
          <div className="h-5 mb-3 text-center">
            {activeComp ? (
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                Highlighting: {NN_COMPONENTS.find(c => c.id === activeComp)?.name}
              </span>
            ) : (
              <span className="text-xs text-gray-600">Select a component below or click the diagram</span>
            )}
          </div>

          <NeuralNetDiagram
            active={activeComp}
            selection={selection}
            onNeuronClick={handleNeuronClick}
            onConnectionClick={handleConnectionClick}
            onLayerClick={handleLayerClick}
            onDismiss={handleDismiss}
          />
        </div>

        {/* ── Component cards ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NN_COMPONENTS.map(comp => {
            const isActive = activeComp === comp.id;
            return (
              <div
                key={comp.id}
                onClick={() => toggleCard(comp.id)}
                className={`group cursor-pointer backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300
                  ${isActive
                    ? `bg-gradient-to-br ${comp.gradient} ${comp.border} ring-1 ring-white/10`
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }
                `}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${isActive ? comp.textColor : 'group-hover:text-purple-200'}`}>
                        {comp.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{comp.tagline}</p>
                    </div>
                    <span className={`text-lg transition-transform duration-300 shrink-0 mt-1 ${isActive ? `rotate-45 ${comp.textColor}` : 'text-purple-400'}`}>
                      +
                    </span>
                  </div>

                  <div className={`grid ${isActive ? 'grid-rows-[1fr] mt-5 opacity-100 transition-all duration-500' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden min-h-0">
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">{comp.description}</p>
                      <ul className="space-y-2">
                        {comp.points.map((point, i) => (
                          <li key={i} className="text-gray-300 text-sm flex gap-2">
                            <span className={`shrink-0 ${comp.dotColor}`}>▸</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NeuralNetworkSection;
