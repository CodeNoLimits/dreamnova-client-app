'use client';

import React, { useState } from 'react';
import {
    AlertTriangle,
    CheckCircle,
    Play,
    Pause,
    Volume2,
    Scale,
    Clock
} from 'lucide-react';

export default function LeadsModule() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="w-full space-y-8 text-gray-100 font-sans">

            {/* TICKER TAPE (MARQUEE) */}
            <div className="w-full bg-yellow-500/10 border-y border-yellow-500/20 overflow-hidden py-2">
                <div className="animate-marquee whitespace-nowrap flex space-x-8 text-yellow-400 font-mono text-sm">
                    <span>⚠ ZFE PARIS 2025: CRIT'AIR 3 BANNED</span>
                    <span>⚠ LOGISTICS DISRUPTION IMMINENT</span>
                    <span>⚠ SECURE YOUR SUPPLY CHAIN NOW</span>
                    <span>⚠ DREAMNOVA LOGISTICS: OPERATIONAL</span>
                    <span>⚠ ZFE PARIS 2025: CRIT'AIR 3 BANNED</span>
                    <span>⚠ LOGISTICS DISRUPTION IMMINENT</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* LEGAL COUNTER (ZFE ARGUMENT) */}
                <div className="bg-red-900/20 border border-red-500/30 rounded-3xl p-8 flex flex-col justify-between">
                    <div className="flex items-start space-x-4 mb-6">
                        <div className="p-3 bg-red-500/20 rounded-2xl">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Legal Countdown: ZFE Paris 2025</h3>
                            <p className="text-gray-300 text-sm">
                                Starting January 1st, 2025, Paris bans <strong>Crit'Air 3</strong> vehicles.
                                Diesel vans are effectively locked out between 8am and 8pm.
                            </p>
                        </div>
                    </div>

                    <div className="bg-black/40 rounded-xl p-4 border border-red-500/20 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-red-400">
                            <Clock className="w-5 h-5" />
                            <span className="font-mono font-bold">DEADLINE</span>
                        </div>
                        <div className="font-mono text-2xl font-black text-white">
                            00:00:00:00
                        </div>
                    </div>
                </div>

                {/* AUDIO TEST (SOUND CHECK) */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
                    <div className="flex items-start space-x-4 mb-6">
                        <div className="p-3 bg-blue-500/20 rounded-2xl">
                            <Volume2 className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Audio Calibration</h3>
                            <p className="text-gray-400 text-sm">
                                Verify your audio output for the immersive experience.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white transition-colors"
                        >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                        </button>
                        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className={`h-full bg-blue-500 transition-all duration-300 ${isPlaying ? 'w-full animate-pulse' : 'w-0'}`}></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
