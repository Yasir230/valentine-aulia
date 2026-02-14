import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Pause } from 'lucide-react';

const YOUTUBE_VIDEO_ID = 'wXmsqoGrAic';

interface MusicPlayerProps {
    autoPlay?: boolean;
}

export default function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (autoPlay && !isLoaded) {
            setIsLoaded(true);
            setIsPlaying(true);
        }
    }, [autoPlay, isLoaded]);

    const handleToggle = useCallback(() => {
        if (!isLoaded) {
            setIsLoaded(true);
            setIsPlaying(true);
            return;
        }

        const iframe = iframeRef.current;
        if (!iframe?.contentWindow) return;

        if (isPlaying) {
            iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo' }),
                '*'
            );
        } else {
            iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'playVideo' }),
                '*'
            );
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying, isLoaded]);

    return (
        <>
            {isLoaded && (
                <iframe
                    ref={iframeRef}
                    src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}`}
                    className="hidden"
                    allow="autoplay"
                    title="Background Music"
                />
            )}

            {/* Floating music toggle — pastel glass */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5, type: 'spring', bounce: 0.5 }}
                onClick={handleToggle}
                className={`music-btn fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer bg-white/60 backdrop-blur-xl border border-rose-200/50 ${isPlaying ? 'playing' : ''
                    }`}
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
                <div className="relative">
                    <Heart
                        size={24}
                        className={`text-rose-400 transition-all duration-300 ${isPlaying ? 'fill-rose-400 scale-110' : ''
                            }`}
                        fill={isPlaying ? 'currentColor' : 'none'}
                    />
                    <AnimatePresence mode="wait">
                        {isPlaying ? (
                            <motion.div
                                key="pause"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Pause size={10} className="text-rose-600" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="play"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Music size={10} className="text-rose-300" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.button>

            {/* Now playing indicator — pastel glass */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fixed bottom-22 right-6 z-40 rounded-full px-4 py-2 flex items-center gap-2 bg-white/50 backdrop-blur-xl border border-rose-200/40"
                    >
                        <div className="flex gap-0.5 items-end h-4">
                            {[1, 2, 3, 4].map((bar) => (
                                <motion.div
                                    key={bar}
                                    className="w-0.5 bg-rose-400 rounded-full"
                                    animate={{
                                        height: ['4px', '16px', '8px', '14px', '4px'],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: bar * 0.15,
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-rose-500/70 whitespace-nowrap">Now Playing</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
