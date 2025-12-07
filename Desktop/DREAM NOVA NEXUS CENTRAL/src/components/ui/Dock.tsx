'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Globe, Briefcase, Brain, ShoppingCart, BookOpen, Music, GraduationCap, TrendingUp, Heart, Lock, Unlock, X } from 'lucide-react';
import { useAdminStore } from '@/lib/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DockItem = ({ icon, label, href, active, onClick }: any) => {
    const content = (
        <div className={`group relative flex flex-col items-center justify-center w-10 h-10 md:w-12 md:h-12 transition-all duration-300 hover:-translate-y-2 cursor-pointer`}>
            <div className={`p-2 md:p-3 rounded-2xl backdrop-blur-md border transition-all duration-300 ${active ? 'bg-white/20 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-110' : 'bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30'}`}>
                {icon}
            </div>
            {active && <div className="absolute -bottom-2 w-1 h-1 bg-cyan-400 rounded-full"></div>}
        </div>
    );

    if (onClick) {
        return <div onClick={onClick}>{content}</div>;
    }

    return <Link href={href}>{content}</Link>;
};

export const Dock = () => {
    const pathname = usePathname();
    const { isAdmin, login, logout } = useAdminStore();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);

    const handleLockClick = () => {
        if (isAdmin) {
            logout();
        } else {
            setShowLoginModal(true);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(code)) {
            setShowLoginModal(false);
            setCode('');
            setError(false);
        } else {
            setError(true);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] w-auto max-w-[95vw]">
                <div className="flex items-center gap-1 px-4 py-3 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-x-auto scrollbar-hide">
                    <DockItem icon={<Home size={20} className="text-cyan-400" />} label="Hub" href="/" active={pathname === '/'} />
                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                    <DockItem icon={<Briefcase size={20} className="text-purple-400" />} label="Consult" href="/dreamnova-consult" active={pathname === '/dreamnova-consult'} />
                    <DockItem icon={<Globe size={20} className="text-blue-400" />} label="Global" href="/dreamnova-global" active={pathname === '/dreamnova-global'} />
                    <DockItem icon={<ShoppingCart size={20} className="text-orange-400" />} label="Ha-Mazon" href="/ha-mazon" active={pathname === '/ha-mazon'} />
                    <DockItem icon={<Brain size={20} className="text-pink-400" />} label="Tera" href="/tera-mind" active={pathname === '/tera-mind'} />
                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                    <DockItem icon={<BookOpen size={20} className="text-amber-400" />} label="Breslev" href="/breslev-books" active={pathname === '/breslev-books'} />
                    <DockItem icon={<Music size={20} className="text-rose-400" />} label="Music" href="/tetrabrame" active={pathname === '/tetrabrame'} />
                    <DockItem icon={<GraduationCap size={20} className="text-emerald-400" />} label="Academy" href="/academy" active={pathname === '/academy'} />
                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                    <DockItem icon={<TrendingUp size={20} className="text-yellow-400" />} label="Pitch" href="/pitch-deck" active={pathname === '/pitch-deck'} />
                    <DockItem icon={<Heart size={20} className="text-red-500" />} label="Foundation" href="/nova-foundation" active={pathname === '/nova-foundation'} />
                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                    <DockItem
                        icon={isAdmin ? <Unlock size={20} className="text-green-400" /> : <Lock size={20} className="text-gray-400" />}
                        label="Admin"
                        href="#"
                        active={isAdmin}
                        onClick={handleLockClick}
                    />
                </div>
            </div>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative">
                        <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Admin Access</h3>
                        <p className="text-gray-400 mb-6">Enter security code to access the Venture OS Back-Office.</p>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="password"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-center text-xl tracking-widest focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="••••"
                                autoFocus
                            />
                            {error && <p className="text-red-500 text-sm">Access Denied</p>}
                            <button type="submit" className="w-full py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors">
                                Unlock System
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
