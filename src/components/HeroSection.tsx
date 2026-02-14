import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Heart, Sparkles, Stars } from 'lucide-react';

const kawaii: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: kawaii },
    },
};

const sparkleVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    show: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { duration: 0.8, ease: kawaii },
    },
};

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 z-10 overflow-hidden">
            {/* Sparkle decorations */}
            <motion.div variants={sparkleVariants} initial="hidden" animate="show" className="absolute top-20 left-10 sm:left-20">
                <Stars size={24} className="text-amber-400/40" />
            </motion.div>
            <motion.div variants={sparkleVariants} initial="hidden" animate="show" className="absolute top-32 right-12 sm:right-24" style={{ transitionDelay: '0.5s' }}>
                <Sparkles size={20} className="text-rose-300/40" />
            </motion.div>
            <motion.div variants={sparkleVariants} initial="hidden" animate="show" className="absolute bottom-32 left-16" style={{ transitionDelay: '1s' }}>
                <Sparkles size={18} className="text-pink-300/40" />
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="text-center max-w-3xl mx-auto"
            >
                {/* Decorative hearts */}
                <motion.div variants={itemVariants} className="flex justify-center gap-3 mb-6">
                    <Heart size={18} className="text-rose-300" fill="currentColor" />
                    <Heart size={14} className="text-pink-300" fill="currentColor" />
                    <Heart size={18} className="text-rose-300" fill="currentColor" />
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="text-sm sm:text-base tracking-[0.3em] uppercase text-rose-400/70 mb-4 font-body"
                >
                    Happy Valentine's Day
                </motion.p>

                {/* Main heading */}
                <motion.h1
                    variants={itemVariants}
                    className="font-display text-5xl sm:text-6xl md:text-8xl text-gradient leading-tight mb-2"
                >
                    For My Beloved
                </motion.h1>
                <motion.h2
                    variants={itemVariants}
                    className="font-display text-4xl sm:text-5xl md:text-7xl text-gradient-gold leading-tight mb-8"
                >
                    Aulia
                </motion.h2>

                {/* Tagline */}
                <motion.p
                    variants={itemVariants}
                    className="font-body text-lg sm:text-xl md:text-2xl text-rose-500/60 max-w-lg mx-auto leading-relaxed italic"
                >
                    "You are my sun, my moon, and all my stars."
                </motion.p>

                {/* Scroll indicator */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 flex flex-col items-center"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }}
                    >
                        <Heart size={20} className="text-rose-300/50" />
                    </motion.div>
                    <span className="text-xs text-rose-400/40 tracking-widest mt-2">SCROLL DOWN</span>
                </motion.div>
            </motion.div>
        </section>
    );
}
