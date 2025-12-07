'use client';
import React from 'react';
import { Settings, ExternalLink, Activity } from 'lucide-react';
import { useAdminStore } from '@/lib/store';

type Action = {
    label: string;
    href?: string;
    onClick?: () => void;
};

export default function AdminToolbar({ actions = [] }: { actions?: Action[] }) {
    const { isAdmin } = useAdminStore();

    if (!isAdmin) return null;

    return (
        <div className="w-full bg-green-900/20 border-b border-green-500/30 p-2 flex flex-wrap justify-center gap-4 items-center backdrop-blur-sm sticky top-0 z-50" role="toolbar" aria-label="Admin Toolbar">
            <span className="text-green-400 font-mono text-xs flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                WORKSPACE ACTIVE
            </span>

            <div className="h-4 w-px bg-green-500/30 hidden md:block" role="presentation"></div>

            <div className="flex gap-2">
                {actions.map((action, i) => (
                    <button
                        key={i}
                        onClick={() => action.href ? window.open(action.href, '_blank') : action.onClick?.()}
                        className="flex items-center gap-1 text-xs bg-green-500/10 border border-green-500/30 text-green-300 px-3 py-1 rounded hover:bg-green-500/20 transition-colors"
                        aria-label={action.label}
                    >
                        <Settings className="w-3 h-3" aria-hidden="true" />
                        {action.label}
                        {action.href && <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />}
                    </button>
                ))}
                <button
                    className="flex items-center gap-1 text-xs bg-green-500/10 border border-green-500/30 text-green-300 px-3 py-1 rounded hover:bg-green-500/20 transition-colors"
                    aria-label="View Analytics"
                >
                    <Activity className="w-3 h-3" aria-hidden="true" />
                    Analytics
                </button>
            </div>
        </div>
    );
};
