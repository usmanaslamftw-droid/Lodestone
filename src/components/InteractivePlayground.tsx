import React from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface Message {
  sender: 'agent' | 'user';
  text: string;
}

interface InteractivePlaygroundProps {
  playgroundStep: number;
  setPlaygroundStep: (step: number) => void;
  playgroundText: string;
  setPlaygroundText: (text: string) => void;
  playgroundMessages: Message[];
  setPlaygroundMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  playgroundLoading: boolean;
  setPlaygroundLoading: (loading: boolean) => void;
  handlePlaygroundAction: (action: 'book' | 'custom') => void;
  handlePlaygroundSendCustom: (e: React.FormEvent) => void;
}

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({
  playgroundStep,
  setPlaygroundStep,
  playgroundText,
  setPlaygroundText,
  playgroundMessages,
  setPlaygroundMessages,
  playgroundLoading,
  setPlaygroundLoading,
  handlePlaygroundAction,
  handlePlaygroundSendCustom,
}) => {
  return (
    <section id="playground" className="w-full bg-gradient-to-b from-white via-indigo-50/15 to-white py-20 lg:py-28 border-y border-earth-sand/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
        
        {/* Left panel explaining why we are different */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <span className="font-mono text-xs text-earth-terracotta font-bold uppercase tracking-widest">Try it Live</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-earth-charcoal leading-tight tracking-tight">
            Test-drive your Ground Steward interaction.
          </h2>
          <div className="w-12 h-0.5 bg-earth-terracotta" />
          <p className="text-sm text-earth-charcoal/80 leading-relaxed font-light">
            Unlike static checklists or robotic bots, Lodestone gives you a designated concierge ready on the ground. Use our interactive terminal on the right to test how she secures dinner reservations, swaps events, and safeguards your budget limits.
          </p>
          
          <div className="space-y-4 pt-2">
            <div className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-earth-terracotta/10 text-earth-terracotta flex items-center justify-center text-xs mr-3 mt-1 font-bold">1</div>
              <div>
                <h4 className="text-xs font-bold text-earth-charcoal uppercase tracking-wider">Human-Executed Automations</h4>
                <p className="text-xs text-earth-charcoal/60 font-light leading-relaxed mt-0.5">We book everything under your direct permission—no guesses, total safety.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-earth-terracotta/10 text-earth-terracotta flex items-center justify-center text-xs mr-3 mt-1 font-bold">2</div>
              <div>
                <h4 className="text-xs font-bold text-earth-charcoal uppercase tracking-wider">Budget Shield</h4>
                <p className="text-xs text-earth-charcoal/60 font-light leading-relaxed mt-0.5">If an item threatens your target budget ceiling, Elena flags it instantly and provides local alternatives.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel: Live Interactive Concierge Chat Widget */}
        <div className="mt-12 lg:mt-0 lg:col-span-7 bg-earth-moss-light border border-earth-sand rounded-sm p-4 sm:p-6 flex flex-col justify-between min-h-[460px] shadow-lg relative">
          
          {/* Header of Chat widget */}
          <div className="border-b border-earth-sand pb-3 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-earth-terracotta flex items-center justify-center text-earth-cream font-serif italic text-sm font-bold">E</div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-earth-moss border-2 border-earth-moss-light" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-earth-charcoal">Elena S. (Conde Nast Steward)</h4>
                <p className="text-[9px] font-mono text-earth-moss uppercase tracking-widest font-extrabold mt-0.5">ACTIVE STEWARD • KYOTO CHANNEL</p>
              </div>
            </div>
            <div className="hidden sm:block text-[9px] font-mono text-earth-charcoal/40 uppercase">Session #LDS-KYT-DEMO</div>
          </div>

          {/* Chat Body Container */}
          <div className="flex-1 py-4 space-y-4 overflow-y-auto max-h-[280px] text-xs font-light pr-1">
            {playgroundMessages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`p-3.5 rounded max-w-[85%] leading-relaxed text-left ${
                  msg.sender === 'user' 
                    ? 'bg-earth-terracotta text-earth-cream rounded-tr-none font-medium' 
                    : 'bg-earth-cream border border-earth-sand text-earth-charcoal rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {playgroundLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-earth-cream border border-earth-sand text-earth-charcoal/50 rounded rounded-tl-none font-mono text-[9px] uppercase tracking-wider animate-pulse flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-earth-terracotta animate-bounce" />
                  <span>Elena is updating coordinates...</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions of Playground */}
          <div className="pt-4 border-t border-earth-sand/40">
            
            {playgroundStep === 0 ? (
              <div className="space-y-3">
                <p className="text-[10px] font-mono uppercase text-earth-charcoal/40 text-center font-bold tracking-wider">How do you instruct Elena?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handlePlaygroundAction('book')}
                    disabled={playgroundLoading}
                    className="px-4 py-3 bg-earth-terracotta hover:bg-earth-terracotta-dark text-earth-cream text-[10px] font-mono uppercase tracking-wider font-extrabold transition-all rounded-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <span>"Yes, book it! Stay under $200"</span>
                    <CheckCircle className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handlePlaygroundAction('custom')}
                    disabled={playgroundLoading}
                    className="px-4 py-3 border border-earth-charcoal/20 hover:border-earth-charcoal bg-earth-cream text-earth-charcoal text-[10px] font-mono uppercase tracking-wider font-extrabold transition-all rounded-sm disabled:opacity-50"
                  >
                    "Find cheaper local ramen option"
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePlaygroundSendCustom} className="flex gap-2">
                <input
                  type="text"
                  value={playgroundText}
                  onChange={(e) => setPlaygroundText(e.target.value)}
                  placeholder="Type custom instructions (e.g. 'Ensure all hotels have balconies')..."
                  className="flex-1 px-3 py-2.5 bg-earth-cream border border-earth-sand text-xs rounded-sm text-earth-charcoal focus:outline-none focus:border-earth-terracotta"
                  disabled={playgroundLoading}
                />
                <button
                  type="submit"
                  className="px-4 bg-earth-terracotta hover:bg-earth-terracotta-dark text-earth-cream rounded-sm flex items-center justify-center transition-colors disabled:opacity-50"
                  disabled={playgroundLoading || !playgroundText.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {playgroundStep > 0 && (
              <div className="mt-3 flex justify-between items-center">
                <span className="text-[9px] font-mono text-earth-moss font-bold">✓ Simulated update completed successfully.</span>
                <button 
                  onClick={() => {
                    setPlaygroundStep(0);
                    setPlaygroundMessages([
                      { sender: 'agent', text: "Welcome to Lodestone! I'm Elena, your dedicated trip concierge. I see you're eyeing Kyoto for a slow 6-day immersive escape." },
                      { sender: 'agent', text: "Should I book the Private Teahouse Zen Master class for Thursday afternoon? It fits perfectly inside your custom budget guardrails." }
                    ]);
                  }}
                  className="text-[9px] font-mono text-earth-terracotta border-b border-earth-terracotta"
                >
                  Reset Simulation
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
      </div>
    </section>
  );
};
