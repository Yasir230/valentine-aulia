import { useMemo } from 'react';
import { Heart } from 'lucide-react';

export default function FloatingHearts() {
    const hearts = useMemo(() =>
        Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: 10 + Math.random() * 18,
            duration: 8 + Math.random() * 12,
            delay: Math.random() * 10,
            opacity: 0.15 + Math.random() * 0.2,
        })),
        []
    );

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map((h) => (
                <div
                    key={h.id}
                    className="floating-heart"
                    style={{
                        left: h.left,
                        bottom: '-30px',
                        animationDuration: `${h.duration}s`,
                        animationDelay: `${h.delay}s`,
                        opacity: h.opacity,
                    }}
                >
                    <Heart size={h.size} fill="currentColor" />
                </div>
            ))}
        </div>
    );
}
