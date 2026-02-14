import { useMemo } from 'react';

interface Doodle {
    id: number;
    type: 'star' | 'cloud' | 'heart' | 'sparkle';
    left: string;
    top: string;
    size: number;
    delay: string;
    duration: string;
    opacity: number;
    rotation: number;
}

const doodleSVGs = {
    star: (size: number) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    ),
    cloud: (size: number) => (
        <svg width={size} height={size * 0.65} viewBox="0 0 32 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 18h16a6 6 0 000-12 6 6 0 00-5.2 3A5 5 0 008 13a5 5 0 000 5z" />
        </svg>
    ),
    heart: (size: number) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
    ),
    sparkle: (size: number) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v3m0 12v3m-6.36-4.64l2.12-2.12m8.48-8.48l2.12-2.12M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48l2.12 2.12" />
        </svg>
    ),
};

export default function FloatingDoodles() {
    const doodles = useMemo<Doodle[]>(() => {
        const types: Doodle['type'][] = ['star', 'cloud', 'heart', 'sparkle'];
        return Array.from({ length: 18 }, (_, i) => ({
            id: i,
            type: types[i % types.length],
            left: `${Math.random() * 95}%`,
            top: `${Math.random() * 95}%`,
            size: 16 + Math.random() * 20,
            delay: `${Math.random() * 8}s`,
            duration: `${5 + Math.random() * 6}s`,
            opacity: 0.15 + Math.random() * 0.2,
            rotation: Math.random() * 30 - 15,
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            {doodles.map((d) => (
                <div
                    key={d.id}
                    className="doodle"
                    style={{
                        left: d.left,
                        top: d.top,
                        opacity: d.opacity,
                        animationDelay: d.delay,
                        animationDuration: d.duration,
                        transform: `rotate(${d.rotation}deg)`,
                        color: d.type === 'heart'
                            ? 'rgba(251, 113, 133, 0.5)'
                            : d.type === 'star'
                                ? 'rgba(251, 191, 36, 0.4)'
                                : d.type === 'cloud'
                                    ? 'rgba(196, 181, 253, 0.35)'
                                    : 'rgba(249, 168, 212, 0.4)',
                    }}
                >
                    {doodleSVGs[d.type](d.size)}
                </div>
            ))}
        </div>
    );
}
