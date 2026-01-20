import React from 'react';

const ParticleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-space to-space"></div>
      <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
      <div className="absolute top-[30%] left-[60%] w-1 h-1 bg-blue-500/40 rounded-full animate-pulse delay-75"></div>
      <div className="absolute top-[70%] left-[40%] w-1 h-1 bg-gold/30 rounded-full animate-pulse delay-150"></div>
      <div className="absolute top-[80%] right-[10%] w-1 h-1 bg-white/20 rounded-full animate-pulse delay-300"></div>
      
      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
    </div>
  );
};

export default ParticleBackground;