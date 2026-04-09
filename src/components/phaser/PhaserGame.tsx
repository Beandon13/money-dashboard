"use client";

import { useEffect, useRef } from "react";
import type { Game } from "phaser";
import { phaserConfig } from "./DashboardScene";

interface PhaserGameProps {
  className?: string;
}

export function PhaserGame({ className = "" }: PhaserGameProps) {
  const gameRef = useRef<Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const game = new Phaser.Game({
      ...phaserConfig,
      parent: containerRef.current,
    });

    gameRef.current = game;

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="phaser-container"
      className={`w-full h-full ${className}`}
    />
  );
}
