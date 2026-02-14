import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const romanticMessages = [
    "You are my everything...",
    "Every moment with you is magical...",
    "You make my world beautiful...",
    "My heart beats only for you...",
    "I fall in love with you every day...",
    "You are the reason I smile...",
    "Forever isn't long enough with you...",
    "You are my forever and always...",
];

// Kawaii bouncy easing
const kawaii: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

interface ValentineOverlayProps {
    onAccept: () => void;
}

export default function ValentineOverlay({ onAccept }: ValentineOverlayProps) {
    const [accepted, setAccepted] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(0);
    const [showMessages, setShowMessages] = useState(false);
    const noBtnRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const messageTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Evasive No button — GSAP-powered teleport with bouncy ease
    const evadeButton = useCallback(() => {
        if (!noBtnRef.current || !containerRef.current) return;

        const container = containerRef.current.getBoundingClientRect();
        const btn = noBtnRef.current.getBoundingClientRect();

        const maxX = container.width - btn.width - 40;
        const maxY = container.height - btn.height - 40;

        const newX = Math.random() * maxX + 20;
        const newY = Math.random() * maxY + 20;

        gsap.to(noBtnRef.current, {
            x: newX - btn.left + container.left,
            y: newY - btn.top + container.top,
            duration: 0.35,
            ease: 'back.out(2)',
        });
    }, []);

    useEffect(() => {
        if (showMessages) {
            messageTimerRef.current = setInterval(() => {
                setCurrentMessage((prev) => (prev + 1) % romanticMessages.length);
            }, 3000);
        }
        return () => {
            if (messageTimerRef.current) clearInterval(messageTimerRef.current);
        };
    }, [showMessages]);

    const handleYes = () => {
        setAccepted(true);
        setShowMessages(true);

        const heart = confetti.shapeFromText({ text: '❤️', scalar: 2 });
        confetti({
            particleCount: 80,
            spread: 360,
            origin: { x: 0.5, y: 0.5 },
            shapes: [heart],
            colors: ['#fb7185', '#f9a8d4', '#fda4af', '#fbbf24', '#fecdd3'],
            ticks: 120,
            gravity: 0.3,
            scalar: 1.5,
        });

        setTimeout(() => {
            onAccept();
        }, 4500);
    };

    return (
        <AnimatePresence>
            {!accepted ? (
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Soft pastel background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F3] via-[#FFE0E8] to-[#FFD1DA]" />
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-rose-300/20 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-200/25 rounded-full blur-[120px] animate-pulse" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-peach-200/20 rounded-full blur-[80px]" />
                    </div>

                    {/* Floating mini hearts */}
                    {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-rose-300/30"
                            initial={{
                                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
                                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, Math.random() * 20 - 10, 0],
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: 'easeInOut' as const,
                            }}
                        >
                            <Heart size={12 + Math.random() * 16} fill="currentColor" />
                        </motion.div>
                    ))}

                    {/* Main content */}
                    <div className="relative z-10 text-center px-6 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: kawaii }}
                            className="flex justify-center mb-6"
                        >
                            <Sparkles size={32} className="text-amber-400 opacity-80" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.5, duration: 1, ease: kawaii }}
                            className="font-display text-4xl sm:text-5xl md:text-7xl text-gradient leading-tight mb-4"
                        >
                            Will you be my
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.8, duration: 1, ease: kawaii }}
                            className="font-display text-4xl sm:text-5xl md:text-7xl text-gradient leading-tight mb-3"
                        >
                            Valentine?
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8, ease: kawaii }}
                            className="font-display text-2xl sm:text-3xl text-gradient-gold mb-12"
                        >
                            — Aulia —
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 1.5, duration: 0.6, ease: kawaii }}
                            className="flex items-center justify-center gap-3 mb-12"
                        >
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400/40" />
                            <Heart size={16} className="text-rose-400" fill="currentColor" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400/40" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8, duration: 0.8, ease: kawaii }}
                            className="flex items-center justify-center gap-6 flex-wrap"
                        >
                            {/* YES button */}
                            <motion.button
                                onClick={handleYes}
                                animate={{
                                    scale: [1, 1.06, 1],
                                    boxShadow: [
                                        '0 0 20px rgba(251,113,133,0.3), 0 0 40px rgba(249,168,212,0.15)',
                                        '0 0 30px rgba(251,113,133,0.5), 0 0 60px rgba(249,168,212,0.3)',
                                        '0 0 20px rgba(251,113,133,0.3), 0 0 40px rgba(249,168,212,0.15)',
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative px-12 py-4 rounded-full font-display text-xl text-white overflow-hidden cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400" />
                                <span className="relative flex items-center gap-2">
                                    <Heart size={20} fill="currentColor" />
                                    Yes!
                                    <Heart size={20} fill="currentColor" />
                                </span>
                            </motion.button>

                            {/* NO button — evasive */}
                            <button
                                ref={noBtnRef}
                                onMouseEnter={evadeButton}
                                onTouchStart={evadeButton}
                                onClick={evadeButton}
                                className="px-8 py-3 rounded-full font-display text-lg text-rose-400/60 border border-rose-300/30 hover:border-rose-400/40 transition-colors cursor-pointer bg-white/30 backdrop-blur-sm"
                            >
                                No
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F3] via-[#FFE0E8] to-[#FFD1DA]" />
                    <div className="absolute inset-0">
                        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-rose-300/20 rounded-full blur-[80px] animate-pulse" />
                        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-pink-200/20 rounded-full blur-[100px] animate-pulse" />
                    </div>

                    <div className="relative z-10 text-center px-6 max-w-xl">
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
                            className="mb-8"
                        >
                            <Heart size={64} className="text-rose-400 mx-auto" fill="currentColor" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: kawaii }}
                            className="font-display text-4xl sm:text-5xl text-gradient mb-8"
                        >
                            I knew you'd say yes! 💕
                        </motion.h2>

                        <div className="h-16 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentMessage}
                                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                                    transition={{ duration: 0.8 }}
                                    className="font-body text-xl sm:text-2xl text-rose-600/70 italic"
                                >
                                    {romanticMessages[currentMessage]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
