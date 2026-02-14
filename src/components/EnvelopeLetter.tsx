import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Heart } from 'lucide-react';

const kawaii: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export default function EnvelopeLetter() {
    const [isOpen, setIsOpen] = useState(false);
    const [showLetter, setShowLetter] = useState(false);

    const handleEnvelopeClick = () => {
        setIsOpen(true);
        setTimeout(() => setShowLetter(true), 800);
    };

    const handleClose = () => {
        setShowLetter(false);
        setTimeout(() => setIsOpen(false), 300);
    };

    return (
        <section className="relative py-20 px-4 z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: kawaii }}
                className="text-center"
            >
                <h3 className="font-display text-3xl sm:text-4xl text-gradient mb-3">
                    A Letter For You
                </h3>
                <p className="text-rose-500/60 mb-10 font-body text-lg">
                    Click the envelope to read my heart
                </p>

                {/* Envelope */}
                <motion.div
                    className="inline-block cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnvelopeClick}
                >
                    <div className={`envelope-wrapper ${isOpen ? 'envelope-open' : ''}`}>
                        <svg
                            width="200"
                            height="160"
                            viewBox="0 0 200 160"
                            className="drop-shadow-lg"
                        >
                            {/* Envelope body — pastel pink */}
                            <rect
                                x="10"
                                y="40"
                                width="180"
                                height="110"
                                rx="8"
                                fill="url(#envelopeGrad)"
                                stroke="rgba(251,113,133,0.3)"
                                strokeWidth="1"
                            />
                            {/* Letter peeking */}
                            <rect
                                x="30"
                                y="25"
                                width="140"
                                height="90"
                                rx="4"
                                fill="rgba(255,255,255,0.95)"
                                className={`transition-transform duration-700 ${isOpen ? '-translate-y-4' : ''}`}
                            />
                            <line x1="50" y1="45" x2="150" y2="45" stroke="rgba(251,113,133,0.2)" strokeWidth="1" />
                            <line x1="50" y1="60" x2="150" y2="60" stroke="rgba(251,113,133,0.2)" strokeWidth="1" />
                            <line x1="50" y1="75" x2="120" y2="75" stroke="rgba(251,113,133,0.2)" strokeWidth="1" />
                            {/* Envelope flap */}
                            <path
                                d="M10,40 L100,100 L190,40"
                                fill="url(#flapGrad)"
                                stroke="rgba(251,113,133,0.2)"
                                strokeWidth="1"
                                className="envelope-flap"
                            />
                            {/* Heart seal */}
                            <circle cx="100" cy="95" r="18" fill="url(#sealGrad)" />
                            <Heart
                                x={88}
                                y={83}
                                size={24}
                                fill="white"
                                color="white"
                                className="opacity-90"
                            />
                            <defs>
                                <linearGradient id="envelopeGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#fecdd3" />
                                    <stop offset="100%" stopColor="#fda4af" />
                                </linearGradient>
                                <linearGradient id="flapGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#fda4af" />
                                    <stop offset="100%" stopColor="#fb7185" />
                                </linearGradient>
                                <radialGradient id="sealGrad">
                                    <stop offset="0%" stopColor="#fb7185" />
                                    <stop offset="100%" stopColor="#f43f5e" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>

                    <motion.div
                        className="mt-4 flex items-center justify-center gap-2 text-rose-400/60"
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <Mail size={16} />
                        <span className="text-sm tracking-wider">Tap to Open</span>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Letter Modal */}
            <AnimatePresence>
                {showLetter && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={handleClose}
                    >
                        {/* Backdrop — softer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-rose-900/30 backdrop-blur-md"
                        />

                        {/* Letter card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.5, ease: kawaii }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto letter-modal rounded-2xl p-8 sm:p-10 bg-white/90 backdrop-blur-xl border border-rose-200/50 shadow-xl"
                        >
                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-rose-100/80 text-rose-400 hover:text-rose-600 hover:bg-rose-200/80 transition-all cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            {/* Letter content */}
                            <div className="text-center mb-8">
                                <Heart size={32} className="text-rose-400 mx-auto mb-4" fill="currentColor" />
                                <h4 className="font-display text-3xl sm:text-4xl text-gradient mb-2">
                                    My Dearest Aulia
                                </h4>
                                <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
                            </div>

                            <div className="space-y-5 font-body text-base sm:text-lg text-rose-900/70 leading-relaxed">
                                <p>
                                    To my sweetest Aulia,
                                </p>
                                <p>
                                    From the very first moment you walked into my life, everything changed.
                                    The world became brighter, more beautiful, more meaningful — all because of you.
                                </p>
                                <p>
                                    You are the reason I believe in magic. The way your eyes sparkle when you laugh,
                                    the warmth of your smile, the gentle kindness in everything you do —
                                    you make every ordinary moment feel extraordinary.
                                </p>
                                <p>
                                    On this Valentine's Day, I want you to know that my love for you grows deeper
                                    with each passing day. You are not just the love of my life — you are my best friend,
                                    my confidante, my everything.
                                </p>
                                <p>
                                    I promise to cherish every moment with you, to hold your hand through storms
                                    and sunshine, to make you laugh when you want to cry, and to love you endlessly
                                    — today, tomorrow, and always.
                                </p>
                                <p className="text-center font-display text-xl text-gradient-gold pt-4">
                                    Happy Valentine's Day, my love 💕
                                </p>
                                <p className="text-center font-display text-lg text-rose-500 italic">
                                    Forever and always yours
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
