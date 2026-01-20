'use client';

import React from 'react';
import { Video, Music, Share2, FileText, MessageSquare, Code } from 'lucide-react';

interface AIServicesGridProps {
  translations: {
    title: string;
    video: { title: string; desc: string; tools: string };
    djSuno: { title: string; desc: string; tools: string };
    social: { title: string; desc: string; tools: string };
    content: { title: string; desc: string; tools: string };
    chatbot: { title: string; desc: string; tools: string };
    webDev: { title: string; desc: string; tools: string };
  };
}

const services = [
  { key: 'video', icon: Video, gradient: 'from-red-500 to-pink-500' },
  { key: 'djSuno', icon: Music, gradient: 'from-purple-500 to-indigo-500' },
  { key: 'social', icon: Share2, gradient: 'from-blue-500 to-cyan-500' },
  { key: 'content', icon: FileText, gradient: 'from-green-500 to-emerald-500' },
  { key: 'chatbot', icon: MessageSquare, gradient: 'from-orange-500 to-amber-500' },
  { key: 'webDev', icon: Code, gradient: 'from-violet-500 to-purple-500' },
];

export function AIServicesGrid({ translations }: AIServicesGridProps) {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-white text-center mb-4">{translations.title}</h2>
      <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        Powered by cutting-edge AI tools for maximum efficiency and profit
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ key, icon: Icon, gradient }) => {
          const service = translations[key as keyof typeof translations];
          if (typeof service === 'string') return null;

          return (
            <div
              key={key}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {service.tools.split(', ').map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm mb-4">
          All services powered by AI for rapid delivery & scalability
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full">Suno AI</span>
          <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">Google Flow</span>
          <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full">Vo3</span>
          <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">Metricool</span>
          <span className="px-3 py-1 text-xs bg-orange-500/20 text-orange-400 rounded-full">Gemini Flow</span>
        </div>
      </div>
    </div>
  );
}
