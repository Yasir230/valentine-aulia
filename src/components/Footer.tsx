import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative py-12 px-4 z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300/40" />
                    <Heart size={14} className="text-rose-400" fill="currentColor" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-300/40" />
                </div>
                <p className="font-body text-base text-rose-500/70">
                    Made with <span className="text-rose-500">❤️</span> by Yaris for Aulia
                </p>
                <p className="font-body text-sm text-rose-400/50 mt-1">
                    February 14, 2026
                </p>
            </motion.div>
        </footer>
    );
}
