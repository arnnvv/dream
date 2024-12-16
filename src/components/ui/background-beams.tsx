"use client";

import { JSX, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export const BackgroundBeams = (): JSX.Element => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const TWO_PI = Math.PI * 2;
    const HALF_PI = Math.PI * 0.5;
    const RIPPLE_SPEED = 0.06;

    class Ripple {
      x: number;
      y: number;
      radius: number;
      speed: number;
      colorKeys: string[];
      constructor(
        x: number,
        y: number,
        radius: number,
        speed: number,
        colorKeys: string[],
      ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.colorKeys = colorKeys;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const t = time * this.speed;
        const radius = this.radius + Math.sin(t) * 20;

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          radius,
        );
        this.colorKeys.forEach((color, index) => {
          gradient.addColorStop(index / (this.colorKeys.length - 1), color);
        });

        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, TWO_PI);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const ripples: Ripple[] = [
      new Ripple(0, 0, 400, RIPPLE_SPEED, [
        "rgba(55, 235, 255, 0.3)",
        "rgba(55, 235, 255, 0)",
      ]),
      new Ripple(canvas.width, 0, 400, RIPPLE_SPEED, [
        "rgba(255, 155, 255, 0.3)",
        "rgba(255, 155, 255, 0)",
      ]),
      new Ripple(canvas.width, canvas.height, 400, RIPPLE_SPEED, [
        "rgba(55, 255, 55, 0.3)",
        "rgba(55, 255, 55, 0)",
      ]),
      new Ripple(0, canvas.height, 400, RIPPLE_SPEED, [
        "rgba(255, 255, 55, 0.3)",
        "rgba(255, 255, 55, 0)",
      ]),
    ];

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripples.forEach((ripple) => ripple.draw(ctx, time));
      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
};
