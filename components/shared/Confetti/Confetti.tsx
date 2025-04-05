'use client'

import { useEffect } from "react";
import conffeti from "canvas-confetti";

export function Confetti() {
    const duration = 15 * 1000; // duration in milliseconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, ticks: 60, spread: 360, zIndex: 0 };

    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    const handleConfetti = () => {
        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval); // Stop the interval when the time is up
            }
            
            const particleCount = 50 * (timeLeft / duration); 
            
            conffeti(
                Object.assign({}, defaults, {
                    particleCount, // Number of particles
                    origin: {
                        x: randomInRange(0.1, 0.3), // Random x position
                        y: Math.random() - 0.2 // Random y position (to start from the top)
                    }
                })
            )

            conffeti(
                Object.assign({}, defaults, {
                    particleCount, // Number of particles
                    origin: {
                        x: randomInRange(0.7, 0.9), // Random x position
                        y: Math.random() - 0.2 // Random y position (to start from the top)
                    }
                })
            )
        }, 250)
    }

    useEffect(() => {
        handleConfetti()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return null
}