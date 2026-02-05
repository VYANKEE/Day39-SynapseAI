import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { 
  Sparkles, Zap, Brain, BookOpen, ChevronRight, Copy, 
  CheckCircle, Layers, Cpu, Globe, Lock, Star 
} from 'lucide-react';

// --- CONFIG ---
// Change this to your Render URL ONLY when you deploy backend. For now use localhost.
const API_URL = "http://localhost:5000/generate-notes"; 

const App = () => {
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState("Medium");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const notesRef = useRef(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setNotes(""); 

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, length }),
      });
      const data = await response.json();
      setNotes(data.notes);
      
      // Auto scroll to notes after generation
      setTimeout(() => {
        notesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);

    } catch (error) {
      console.error("Error:", error);
      setNotes("⚠️ **System Error:** Could not connect to AI Neural Net. Ensure backend server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* 1. BACKGROUND LAYERS */}
      <div className="cyber-grid-bg" />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#030014]/80 to-[#030014] z-[-1]" />
      
      {/* 2. NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#030014]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20">
              <Brain className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Synapse<span className="text-purple-400">AI</span>
            </span>
          </div>
          <button className="px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm font-medium">
            Join Beta
          </button>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Floating Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8 backdrop-blur-md"
          >
            <Sparkles size={16} /> <span>Powered by Llama-3.1 70B Neural Engine</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black tracking-tight leading-tight mb-8"
          >
            Information <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-shimmer bg-[length:200%_auto]">
              Structured Instantly
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Don't just read. Understand. Transform complex topics into perfectly structured study notes, summaries, and deep dives in milliseconds.
          </motion.p>
        </div>
      </section>

      {/* 4. GENERATOR COCKPIT */}
      <section className="px-6 pb-32 relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
              
              <div className="space-y-8">
                {/* Topic Input */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Research Target</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g. Quantum Entanglement, French Revolution, React Hooks..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-gray-600 text-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all shadow-inner"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-lg">
                      <Zap className="text-yellow-400" size={20} />
                    </div>
                  </div>
                </div>

                {/* Length Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Processing Depth</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Short', 'Medium', 'Long'].map((l) => (
                      <button
                        key={l}
                        onClick={() => setLength(l)}
                        className={`py-4 rounded-xl border-2 font-bold transition-all flex flex-col items-center gap-2 ${
                          length === l 
                            ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                            : 'bg-white/5 border-transparent hover:bg-white/10 text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        <span className="text-lg">{l}</span>
                        <span className="text-[10px] uppercase opacity-60 font-medium">
                          {l === 'Short' ? 'Brief Overview' : l === 'Medium' ? 'Standard Analysis' : 'Deep Dive'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={loading || !topic}
                  className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold text-xl text-white shadow-lg hover:shadow-purple-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="animate-pulse">Synthesizing Knowledge...</span>
                    </div>
                  ) : (
                    <>
                      <Cpu size={24} /> 
                      <span>Execute Analysis</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUTPUT SECTION */}
      <AnimatePresence>
        {notes && (
          <section ref={notesRef} className="px-6 pb-32">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative bg-[#0f0f12] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {/* Header Strip */}
                <div className="bg-white/5 border-b border-white/10 p-6 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="ml-4 text-sm font-mono text-gray-400">output.md</span>
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium transition"
                  >
                    {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                    {copied ? "COPIED" : "COPY RAW"}
                  </button>
                </div>

                {/* CONTENT AREA (RENDERED MARKDOWN) */}
                <div className="p-10 md:p-14 prose prose-invert max-w-none prose-lg">
                  <ReactMarkdown>{notes}</ReactMarkdown>
                </div>
                
                {/* Footer Strip */}
                <div className="bg-white/5 border-t border-white/10 p-4 text-center text-xs text-gray-600 font-mono">
                  GENERATED BY LLAMA-3.1 // 70B PARAMETERS // LATENCY: 240ms
                </div>
              </div>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      {/* 6. FEATURES GRID */}
      <section className="py-20 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Neural Capabilities</h2>
            <p className="text-gray-400">Advanced features for the modern learner.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="text-yellow-400" size={32} />}
              title="Instant Synthesis"
              desc="Convert hours of reading into seconds of understanding using our optimized inference engine."
            />
            <FeatureCard 
              icon={<Layers className="text-purple-400" size={32} />}
              title="Structured Data"
              desc="Output isn't just text. It's hierarchically organized knowledge ready for retention."
            />
            <FeatureCard 
              icon={<Globe className="text-blue-400" size={32} />}
              title="Global Knowledge"
              desc="Trained on practically the entire internet. From Astrophysics to Zoology."
            />
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-[#020205] text-center">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
          <Brain size={20} />
          <span className="font-bold">SynapseAI</span>
        </div>
        <p className="text-gray-600 text-sm">
          &copy; 2026 Synapse Systems. All Neural Pathways Active.
        </p>
      </footer>

    </div>
  );
};

// --- SUB-COMPONENTS ---
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition duration-300 group">
    <div className="mb-6 bg-black/40 w-fit p-4 rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

export default App;