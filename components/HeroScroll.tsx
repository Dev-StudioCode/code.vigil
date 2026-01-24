'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTransform, MotionValue } from 'framer-motion';

// === CONFIGURATION ===
// CHECK THIS: Go to your folder. What is the Highest Number? 
// If you only have 50 frames, change this to 50.
const FRAME_COUNT = 120;
const FRAME_PATH = '/frames/ezgif-frame-';
const FRAME_EXT = '.jpg';
// =====================

interface HeroScrollProps {
    scrollYProgress: MotionValue<number>;
}

export default function HeroScroll({ scrollYProgress }: HeroScrollProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // === FIX 1: DIRECTION ===
    // Changed to [1, FRAME_COUNT] so it starts at Frame 1 (Assembled) -> Frame 120 (Exploded)
    const currentIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise((resolve, reject) => {
                    const img = new Image();
                    const paddedIndex = i.toString().padStart(3, '0');
                    img.src = `${FRAME_PATH}${paddedIndex}${FRAME_EXT}`;
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null); // Resolve null if missing
                    loadedImages[i] = img;
                });
                promises.push(promise);
            }

            await Promise.all(promises);

            // Filter out broken images so we don't crash
            const validImages = loadedImages.filter(img => img !== null);
            console.log(`✅ Loaded ${validImages.length} frames successfully.`); // Check your browser console!

            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!isLoaded || !canvasRef.current) return;

        const render = (index: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const safeIndex = Math.max(1, Math.min(FRAME_COUNT, Math.round(index)));
            const img = images[safeIndex];

            // Only draw if the image exists (Prevents flickering/stopping)
            if (img && img.complete && img.naturalHeight !== 0) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        const unsubscribe = currentIndex.on("change", (latest) => {
            render(latest);
        });

        render(1); // Start at Frame 1
        return () => unsubscribe();
    }, [isLoaded, currentIndex, images]);

    return (
        <div className="w-full h-full">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover -z-10"
            />
            <div className="absolute inset-0 bg-black/60 z-0" />
        </div>
    );
}