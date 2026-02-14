import { useEffect, useRef, useCallback } from 'react';

export default function CursorTrail() {
    const lastPos = useRef({ x: 0, y: 0 });
    const throttle = useRef(false);

    const createParticle = useCallback((x: number, y: number) => {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';

        // Randomly pick heart or sparkle
        const isHeart = Math.random() > 0.4;
        particle.textContent = isHeart ? '♥' : '✦';

        const size = 8 + Math.random() * 12;
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        Object.assign(particle.style, {
            left: `${x + offsetX}px`,
            top: `${y + offsetY}px`,
            fontSize: `${size}px`,
            color: isHeart
                ? `hsl(${340 + Math.random() * 30}, 80%, ${65 + Math.random() * 20}%)`
                : `hsl(${35 + Math.random() * 20}, 90%, ${70 + Math.random() * 15}%)`,
        });

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
    }, []);

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (throttle.current) return;
            throttle.current = true;

            const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

            const dx = x - lastPos.current.x;
            const dy = y - lastPos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 8) {
                createParticle(x, y);
                lastPos.current = { x, y };
            }

            requestAnimationFrame(() => {
                throttle.current = false;
            });
        };

        window.addEventListener('mousemove', handleMove, { passive: true });
        window.addEventListener('touchmove', handleMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
        };
    }, [createParticle]);

    return null;
}
