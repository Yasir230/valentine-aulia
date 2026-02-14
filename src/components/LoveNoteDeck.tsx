import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const kawaii: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const loveNotes = [
    "The way you laugh makes my whole world light up ✨",
    "I fall in love with you all over again every morning 🌅",
    "You make even the ordinary moments feel magical 💫",
    "Your smile is my favorite thing in the entire universe 🌌",
    "Being with you feels like coming home 🏠💕",
    "I love how you always know exactly what to say 💬",
    "Every adventure with you is my favorite story 📖",
];

export default function LoveNoteDeck() {
    const [flipped, setFlipped] = useState(false);
    const [noteIndex, setNoteIndex] = useState(0);
    const [flipCount, setFlipCount] = useState(0);

    const shuffledNotes = useMemo(() => {
        const shuffled = [...loveNotes];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);

    const handleFlip = useCallback(() => {
        if (flipped) {
            setFlipped(false);
            setTimeout(() => {
                setNoteIndex((prev) => (prev + 1) % shuffledNotes.length);
                setFlipCount((prev) => prev + 1);
            }, 400);
        } else {
            setFlipped(true);
        }
    }, [flipped, shuffledNotes.length]);

    return (
        <section className="relative py-20 px-4 z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: kawaii }}
                className="text-center mb-10"
            >
                <div className="inline-flex items-center gap-2 mb-4">
                    <Heart size={18} className="text-rose-400" fill="currentColor" />
                    <span className="text-sm tracking-[0.2em] uppercase text-rose-400/70">Love Notes</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-gradient mb-3">
                    Reasons I Love You
                </h3>
                <p className="font-body text-lg text-rose-500/50 italic">
                    Tap the card to discover...
                </p>
            </motion.div>

            {/* Card container with perspective */}
            <div className="flex justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: kawaii }}
                    className="relative w-72 h-96 sm:w-80 sm:h-[420px] cursor-pointer"
                    style={{ perspective: '1200px' }}
                    onClick={handleFlip}
                >
                    {/* Stacked cards behind (decorative) */}
                    <div
                        className="absolute inset-0 rounded-2xl border border-rose-200/30 bg-white/30 backdrop-blur-sm"
                        style={{ transform: 'rotate(6deg) translateY(8px)', zIndex: 1 }}
                    />
                    <div
                        className="absolute inset-0 rounded-2xl border border-rose-200/30 bg-white/30 backdrop-blur-sm"
                        style={{ transform: 'rotate(-4deg) translateY(4px)', zIndex: 2 }}
                    />

                    {/* Main flipping card */}
                    <motion.div
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: kawaii }}
                        className="relative w-full h-full"
                        style={{ transformStyle: 'preserve-3d', zIndex: 3 }}
                    >
                        {/* Front face */}
                        <div
                            className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8"
                            style={{ backfaceVisibility: 'hidden' }}
                        >
                            {/* Glass effect — pastel */}
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-xl border border-rose-200/40 rounded-2xl" />
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-100/30 via-transparent to-pink-100/30 rounded-2xl" />
                            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(251,113,133,0.06),0_0_40px_rgba(251,113,133,0.06)]" />

                            <div className="relative z-10 text-center">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
                                >
                                    <Heart size={48} className="text-rose-400 mx-auto mb-6" fill="currentColor" />
                                </motion.div>

                                <p className="font-display text-2xl text-rose-500 mb-3">
                                    Tap to reveal
                                </p>
                                <p className="font-display text-lg text-rose-400/50">
                                    a secret...
                                </p>

                                <div className="mt-6 flex items-center justify-center gap-1.5 text-rose-300/50">
                                    <Sparkles size={14} />
                                    <span className="text-xs tracking-wider">
                                        {flipCount > 0 ? `${flipCount} notes revealed` : 'Tap anywhere'}
                                    </span>
                                    <Sparkles size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Back face (love note) */}
                        <div
                            className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                            {/* Glass effect — pastel */}
                            <div className="absolute inset-0 bg-white/55 backdrop-blur-xl border border-rose-200/40 rounded-2xl" />
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-rose-100/10 to-rose-200/30 rounded-2xl" />
                            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(251,113,133,0.08),0_0_50px_rgba(251,113,133,0.08)]" />

                            <div className="relative z-10 text-center">
                                <div className="flex items-center justify-center gap-2 mb-6">
                                    <Heart size={16} className="text-rose-400" fill="currentColor" />
                                    <span className="font-display text-sm tracking-[0.2em] uppercase text-rose-400/70">
                                        Reason #{noteIndex + 1}
                                    </span>
                                    <Heart size={16} className="text-rose-400" fill="currentColor" />
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={noteIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4 }}
                                        className="font-body text-xl sm:text-2xl text-rose-700/70 leading-relaxed italic"
                                    >
                                        "{shuffledNotes[noteIndex]}"
                                    </motion.p>
                                </AnimatePresence>

                                <div className="mt-8 text-rose-400/40 text-xs tracking-wider">
                                    Tap to see another ♡
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
