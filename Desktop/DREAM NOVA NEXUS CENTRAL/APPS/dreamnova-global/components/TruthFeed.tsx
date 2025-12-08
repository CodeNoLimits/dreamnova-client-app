import React, { useState, useEffect } from 'react';
import { Github, Activity, BookOpen, CheckCircle2, AlertOctagon } from 'lucide-react';
import { FeedItemData } from '../types';

const MOCK_FEED: FeedItemData[] = [
  { id: 1, user: 'David', action: 'committed to repo (4h)', source: 'GitHub #9292', timestamp: '2m ago', verified: true, type: 'code' },
  { id: 2, user: 'Sarah', action: 'ran 10km', source: 'Strava API', timestamp: '15m ago', verified: true, type: 'sport' },
  { id: 3, user: 'Ariel', action: 'studied Likoutey Moharan', source: 'StudyTracker', timestamp: '42m ago', verified: true, type: 'study' },
  { id: 4, user: 'System', action: 'Monthly Audit', source: 'DreamNova Core', timestamp: '1h ago', verified: true, type: 'code' },
  { id: 5, user: 'Marcus', action: 'closed Deal $5k', source: 'Stripe', timestamp: '2h ago', verified: true, type: 'code' },
  { id: 6, user: 'Elena', action: 'Meditation (30m)', source: 'Calm API', timestamp: '3h ago', verified: true, type: 'sport' },
];

const TruthFeed: React.FC = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [timer, setTimer] = useState(0);

  // Kosher Tech Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    // Simulate "Too much scrolling" after 20 seconds for demo purposes
    if (timer > 20) {
      setIsBlurred(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const resetTimer = () => {
    setTimer(0);
    setIsBlurred(false);
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'code': return <Github className="w-4 h-4" />;
      case 'sport': return <Activity className="w-4 h-4" />;
      case 'study': return <BookOpen className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative h-full min-h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-tech font-bold text-white">Flux de Vérité <span className="text-electric text-sm font-normal align-middle ml-2">● Live</span></h2>
        <div className="text-xs text-gray-500 font-mono">Proof of Work Protocol</div>
      </div>

      <div className={`relative flex-1 transition-all duration-1000 ${isBlurred ? 'blur-md grayscale opacity-50' : ''}`}>
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-electric/50 via-electric/10 to-transparent"></div>
        
        <div className="space-y-6">
          {MOCK_FEED.map((item) => (
            <div key={item.id} className="relative pl-10 group">
              <div className="absolute left-[13px] top-1 w-2 h-2 rounded-full bg-space border border-electric group-hover:bg-electric transition-colors duration-300"></div>
              
              <div className="bg-white/5 border border-white/5 rounded-lg p-3 hover:border-electric/30 transition-all cursor-default">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-sm text-blue-200 font-semibold">
                    {getIcon(item.type)}
                    <span>{item.user}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">{item.timestamp}</span>
                </div>
                <p className="text-gray-300 text-sm mt-1">{item.action}</p>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] text-emerald-500 uppercase tracking-wide font-bold">Validé blockchain</span>
                  <span className="text-[10px] text-gray-600 ml-2 border-l border-gray-700 pl-2">{item.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kosher Tech Overlay */}
      {isBlurred && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="bg-space/90 border border-red-500/30 p-8 rounded-xl text-center backdrop-blur-xl shadow-[0_0_30px_rgba(239,68,68,0.2)] max-w-xs mx-auto">
            <AlertOctagon className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-white mb-2 font-tech">Temps Écoulé</h3>
            <p className="text-gray-400 text-sm mb-6">
              Vous consommez le rêve des autres. <br/>
              Arrêtez de scroller. Commencez à agir.
            </p>
            <button 
              onClick={resetTimer}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded text-sm transition-colors border border-white/10"
            >
              J'ai compris (Demo Reset)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TruthFeed;