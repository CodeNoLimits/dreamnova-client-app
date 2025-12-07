'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Shield, Wifi, Battery, Command } from 'lucide-react';

export default function AdminModule() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([
        '> MATAT OS v2.0.4 INITIALIZED',
        '> SYSTEM CHECK... OK',
        '> CONNECTED TO DREAMNOVA NEXUS',
        '> WAITING FOR COMMAND...'
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        const newHistory = [...history, `> ${input}`];

        // Simple command processing
        if (cmd === 'help') {
            newHistory.push('AVAILABLE COMMANDS: STATUS, DEPLOY, LOGS, CLEAR, EXIT');
        } else if (cmd === 'status') {
            newHistory.push('SYSTEM STATUS: ONLINE');
            newHistory.push('CPU: 12% | MEM: 4.2GB | NET: 1.2GBps');
        } else if (cmd === 'clear') {
            setHistory(['> CONSOLE CLEARED']);
            setInput('');
            return;
        } else if (cmd === 'deploy') {
            newHistory.push('INITIATING DEPLOYMENT SEQUENCE...');
            newHistory.push('... [SIMULATION] DEPLOYED SUCCESSFULLY');
        } else {
            newHistory.push(`UNKNOWN COMMAND: ${cmd}`);
        }

        setHistory(newHistory);
        setInput('');
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-black border border-green-500/30 rounded-xl overflow-hidden shadow-[0_0_50px_-10px_rgba(34,197,94,0.2)] font-mono text-sm">

            {/* HEADER */}
            <div className="bg-gray-900 border-b border-green-500/20 p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <span className="text-green-500 font-bold ml-4 flex items-center">
                        <Terminal className="w-4 h-4 mr-2" /> MATAT_OS_TERMINAL
                    </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-green-400/60">
                    <span className="flex items-center"><Cpu className="w-3 h-3 mr-1" /> 12%</span>
                    <span className="flex items-center"><Shield className="w-3 h-3 mr-1" /> SECURE</span>
                    <span className="flex items-center"><Wifi className="w-3 h-3 mr-1" /> 5G</span>
                    <span className="flex items-center"><Battery className="w-3 h-3 mr-1" /> 100%</span>
                </div>
            </div>

            {/* TERMINAL BODY */}
            <div
                ref={scrollRef}
                className="h-[400px] bg-black/90 p-4 overflow-y-auto text-green-400 space-y-1 scrollbar-hide"
            >
                {history.map((line, i) => (
                    <div key={i} className="break-all">{line}</div>
                ))}

                {/* INPUT LINE */}
                <form onSubmit={handleCommand} className="flex items-center mt-2">
                    <span className="mr-2 text-green-500">{'>'}</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-green-800"
                        placeholder="Enter command..."
                        autoFocus
                    />
                </form>
            </div>

            {/* FOOTER */}
            <div className="bg-gray-900 border-t border-green-500/20 p-2 text-[10px] text-green-600 flex justify-between px-4">
                <span>SESSION ID: 0x8F3A2C1</span>
                <span className="flex items-center"><Command className="w-3 h-3 mr-1" /> ADMIN ACCESS GRANTED</span>
            </div>
        </div>
    );
}
