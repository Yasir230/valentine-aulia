import { useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

export default function ConfettiButton() {
    const triggerConfetti = useCallback(() => {
        // Create heart shape
        const heart = confetti.shapeFromText({ text: '❤️', scalar: 2 });

        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0.4,
            decay: 0.94,
            startVelocity: 20,
            colors: ['#f43f5e', '#ec4899', '#f9a8d4', '#fda4af', '#fde68a', '#fbbf24'],
            shapes: [heart],
            scalar: 1.5,
        };

        // Multiple bursts
        confetti({ ...defaults, particleCount: 40, origin: { x: 0.3, y: 0.6 } });
        confetti({ ...defaults, particleCount: 40, origin: { x: 0.7, y: 0.6 } });

        setTimeout(() => {
            confetti({ ...defaults, particleCount: 60, origin: { x: 0.5, y: 0.5 }, startVelocity: 30 });
        }, 200);

        setTimeout(() => {
            confetti({ ...defaults, particleCount: 30, origin: { x: 0.2, y: 0.4 }, startVelocity: 25 });
            confetti({ ...defaults, particleCount: 30, origin: { x: 0.8, y: 0.4 }, startVelocity: 25 });
        }, 400);
    }, []);

    return (
        <section className="relative py-20 px-4 z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <p className="font-body text-lg text-rose-200/70 mb-8 italic">
                    "Press the button and make a wish for us..."
                </p>

                <motion.button
                    onClick={triggerConfetti}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-display text-xl text-white romantic-glow overflow-hidden cursor-pointer"
                >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-400 to-rose-600 opacity-0 group-hover:opacity-50 transition-opacity" />

                    {/* Content */}
                    <span className="relative flex items-center gap-3">
                        <Sparkles size={20} className="transition-transform group-hover:rotate-12" />
                        Send My Love
                        <Heart
                            size={20}
                            fill="currentColor"
                            className="transition-transform group-hover:scale-125"
                        />
                    </span>
                </motion.button>
            </motion.div>
        </section>
    );
}
