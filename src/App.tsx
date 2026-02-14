import { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import FloatingDoodles from './components/FloatingDoodles';
import CursorTrail from './components/CursorTrail';
import HeroSection from './components/HeroSection';
import EnvelopeLetter from './components/EnvelopeLetter';
import PhotoGallery from './components/PhotoGallery';
import LoveNoteDeck from './components/LoveNoteDeck';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import ValentineOverlay from './components/ValentineOverlay';
import { motion, AnimatePresence } from 'framer-motion';

const kawaii: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export default function App() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [musicAutoPlay, setMusicAutoPlay] = useState(false);

  const handleAccept = () => {
    setMusicAutoPlay(true);
    setShowOverlay(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cursor sparkle trail */}
      <CursorTrail />

      {/* Valentine question overlay */}
      <AnimatePresence>
        {showOverlay && <ValentineOverlay onAccept={handleAccept} />}
      </AnimatePresence>

      {/* Ambient background layers */}
      <FloatingHearts />
      <FloatingDoodles />

      {/* Soft gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-200/15 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-peach-200/10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <AnimatePresence>
        {!showOverlay && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: kawaii }}
          >
            <HeroSection />

            {/* Divider */}
            <div className="relative z-10 flex items-center justify-center py-4">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-rose-300/30 to-transparent" />
            </div>

            <EnvelopeLetter />

            <div className="relative z-10 flex items-center justify-center py-4">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-rose-300/30 to-transparent" />
            </div>

            <PhotoGallery />

            <div className="relative z-10 flex items-center justify-center py-4">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-rose-300/30 to-transparent" />
            </div>

            <LoveNoteDeck />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Floating music player */}
      {!showOverlay && <MusicPlayer autoPlay={musicAutoPlay} />}
    </div>
  );
}
