import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const kawaii: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const photoPositions = [
    { x: 5, y: 8, rotation: -12 },
    { x: 55, y: 5, rotation: 8 },
    { x: 2, y: 38, rotation: 15 },
    { x: 52, y: 35, rotation: -8 },
    { x: 10, y: 65, rotation: -5 },
    { x: 48, y: 62, rotation: 10 },
    { x: 60, y: 20, rotation: -15 },
    { x: 25, y: 30, rotation: 5 },
];

const photos = [
    {
        url: 'https://i.imgur.com/LF5iexj.jpeg',
        caption: 'Our First Olahraga Date',
    },
    {
        url: 'https://i.imgur.com/IqtEtnD.jpeg',
        caption: 'Favourite Hairstyle',
    },
    {
        url: 'https://i.imgur.com/1OZibbe.jpeg',
        caption: 'Selfie',
    },
    {
        url: 'https://i.imgur.com/Rr59XWC.jpeg',
        caption: 'My Favorite Picture',
    },
    {
        url: 'https://i.imgur.com/pcOWlAW.jpeg',
        caption: 'FunnyFace',
    },
    {
        url: 'https://i.imgur.com/DWRJ1WB.jpeg',
        caption: 'Angry Face',
    },
    {
        url: 'https://i.imgur.com/NedWfs5.jpeg',
        caption: 'Cake',
    },
    {
        url: 'https://i.imgur.com/tyVIW2O.jpeg',
        caption: 'BOKEMMMM',
    },
];

const entryDirections = [
    { x: -400, y: -300, rotate: -60 },
    { x: 400, y: -250, rotate: 50 },
    { x: -350, y: 100, rotate: 40 },
    { x: 350, y: 50, rotate: -45 },
    { x: -300, y: 300, rotate: -30 },
    { x: 400, y: 350, rotate: 55 },
    { x: 300, y: -300, rotate: 35 },
    { x: -200, y: 400, rotate: -40 },
];

const FloatingHearts = () => {
    const hearts = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 6,
        size: 12 + Math.random() * 20,
        opacity: 0.2 + Math.random() * 0.4,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute"
                    style={{
                        left: `${heart.left}%`,
                        bottom: '-50px',
                    }}
                    animate={{
                        y: [0, -800],
                        x: [0, Math.sin(heart.id) * 50, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: 'linear',
                    }}
                >
                    <Heart
                        size={heart.size}
                        fill="#FF6B9D"
                        color="#FF6B9D"
                        style={{ opacity: heart.opacity }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

const SparklesEffect = () => {
    const sparkles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        size: 8 + Math.random() * 12,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {sparkles.map((sparkle) => (
                <motion.div
                    key={sparkle.id}
                    className="absolute"
                    style={{
                        left: `${sparkle.left}%`,
                        top: `${sparkle.top}%`,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: sparkle.delay,
                        ease: 'easeInOut',
                    }}
                >
                    <Sparkles size={sparkle.size} color="#FFD700" />
                </motion.div>
            ))}
        </div>
    );
};

const BokehBackground = () => {
    const circles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 100 + Math.random() * 200,
        color: ['#FFB6C1', '#FFA6C9', '#FF69B4', '#FFC0CB'][Math.floor(Math.random() * 4)],
        delay: Math.random() * 2,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {circles.map((circle) => (
                <motion.div
                    key={circle.id}
                    className="absolute rounded-full blur-3xl"
                    style={{
                        left: `${circle.left}%`,
                        top: `${circle.top}%`,
                        width: circle.size,
                        height: circle.size,
                        backgroundColor: circle.color,
                        opacity: 0.15,
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 6 + Math.random() * 4,
                        repeat: Infinity,
                        delay: circle.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

export default function PhotoGallery() {
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const hasAnimated = useRef(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        animateCards();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const animateCards = () => {
        const cards = cardsRef.current.filter(Boolean);

        cards.forEach((card, i) => {
            if (!card) return;
            gsap.set(card, {
                opacity: 0,
                x: entryDirections[i % entryDirections.length].x,
                y: entryDirections[i % entryDirections.length].y,
                rotation: entryDirections[i % entryDirections.length].rotate,
                scale: 0.5,
            });
        });

        gsap.to(cards, {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: (i) => photoPositions[i]?.rotation || 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            onComplete: () => startFloating(cards),
        });
    };

    const startFloating = (cards: (HTMLDivElement | null)[]) => {
        cards.forEach((card, i) => {
            if (!card) return;
            const baseRotation = photoPositions[i]?.rotation || 0;

            gsap.to(card, {
                y: -10 + Math.random() * 8,
                rotation: baseRotation + (Math.random() * 4 - 2),
                duration: 3 + Math.random() * 2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: i * 0.3,
            });
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-10 px-4 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #FFE4EC 0%, #F0E6FF 50%, #FFE8E0 100%)',
            }}
        >
            <BokehBackground />
            <FloatingHearts />
            <SparklesEffect />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(255,182,193,0.15) 100%)',
                }}
            />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: kawaii }}
                className="text-center mb-8 relative z-10"
            >
                <div className="inline-flex items-center gap-2 mb-4">
                    <Camera size={20} className="text-rose-400" />
                    <span className="text-sm tracking-[0.2em] uppercase text-rose-400/70">Our Gallery</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Cherished Memories
                </h3>
                <motion.div
                    className="flex justify-center mt-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <Heart size={24} fill="#FF6B9D" color="#FF6B9D" />
                </motion.div>
            </motion.div>

            {/* Gallery */}
            <div className="relative w-full min-h-[600px] h-[75vh] sm:h-[85vh] max-w-7xl mx-auto">
                {photos.map((photo, i) => (
                    <motion.div
                        key={i}
                        ref={(el) => { cardsRef.current[i] = el; }}
                        className="absolute cursor-pointer"
                        style={{
                            opacity: 0,
                            left: `${photoPositions[i]?.x}%`,
                            top: `${photoPositions[i]?.y}%`,
                            zIndex: i + 1,
                        }}
                        whileHover={{
                            scale: 1.15,
                            zIndex: 100,
                            rotate: 0,
                            transition: { duration: 0.3, ease: 'easeOut' },
                        }}
                        onHoverStart={() => setHoveredCard(i)}
                        onHoverEnd={() => setHoveredCard(null)}
                    >
                        {/* Polaroid frame */}
                        <div
                            className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] w-28 sm:w-40 md:w-48 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                            style={{
                                transform: `rotate(${photoPositions[i]?.rotation}deg)`,
                                padding: '10px 10px 50px 10px', // Bottom padding for caption
                                borderRadius: '2px',
                            }}
                        >
                            {/* Photo container */}
                            <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '1/1' }}>
                                <img
                                    src={photo.url}
                                    alt={photo.caption}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    loading="lazy"
                                />
                                {/* Hover overlay */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center bg-black/30"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredCard === i ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Heart size={40} fill="white" color="white" />
                                </motion.div>
                            </div>

                            {/* Caption - Always visible */}
                            <div className="absolute bottom-0 left-0 right-0 h-[45px] flex items-center justify-center">
                                <p className="text-center font-handwriting text-sm text-gray-600 italic px-2 truncate w-full">
                                    {photo.caption}
                                </p>
                            </div>
                        </div>

                        {/* Floating hearts on hover */}
                        {hoveredCard === i && (
                            <>
                                {[...Array(3)].map((_, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="absolute"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0.5, 1.5, 0],
                                            y: -25 - idx * 15,
                                            x: (idx - 1) * 25,
                                        }}
                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                        style={{
                                            left: '50%',
                                            top: '0%',
                                        }}
                                    >
                                        <Heart size={14} fill="#FF6B9D" color="#FF6B9D" />
                                    </motion.div>
                                ))}
                            </>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Hover instruction - DARKER TEXT */}
            <motion.div
                className="text-center mt-8 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <p className="text-rose-500 font-medium text-sm tracking-wider drop-shadow-sm">
                    ✨ coba hover foto nya ada effectt ayyy ✨
                </p>
            </motion.div>
        </section>
    );
}