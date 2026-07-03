'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';

/**
 * Abelhas decorativas do UP Connection — usa a mesma arte da abelha do
 * up-dashboard (logo-abelha.png) para manter a identidade visual da marca.
 * Cada abelha ganha uma trajetória de voo única, gerada de forma
 * pseudoaleatória mas determinística (mesma semente => mesmo resultado no
 * servidor e no cliente, evitando erros de hidratação do Next).
 */

type BeeProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** Espelha a abelha para ela "voar" para a esquerda. */
  flip?: boolean;
};

function Bee({ size = 56, className = '', style, flip = false }: BeeProps) {
  return (
    <Image
      src="/logo-abelha.png"
      alt=""
      width={size}
      height={Math.round((size * 389) / 503)}
      className={`up-bee ${className}`}
      style={{ ...style, transform: `${flip ? 'scaleX(-1) ' : ''}${style?.transform ?? ''}` }}
      aria-hidden="true"
    />
  );
}

/** PRNG determinístico (mulberry32) — garante o mesmo voo no SSR e no client. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type BeesArea = {
  /** Faixa de posição horizontal (% do container). */
  xRange?: [number, number];
  /** Faixa de posição vertical (% do container). */
  yRange?: [number, number];
  /** Faixa de tamanho em px. */
  sizeRange?: [number, number];
};

/**
 * Campo de abelhas: espalha `count` abelhas com voo aleatório dentro de um
 * container relativo. Não captura cliques (decorativo).
 */
export function FloatingBees({
  count = 4,
  seed = 1,
  className = '',
  area,
}: {
  count?: number;
  seed?: number;
  className?: string;
  area?: BeesArea;
}) {
  const rand = mulberry32(seed * 2654435761);
  const r = (min: number, max: number) => min + rand() * (max - min);

  const [xMin, xMax] = area?.xRange ?? [2, 92];
  const [yMin, yMax] = area?.yRange ?? [4, 88];
  const [sMin, sMax] = area?.sizeRange ?? [24, 36];

  // Movimento de "pairar" — mesmos limites do loading do up-dashboard:
  // deslocamentos curtos (±34px), rotações leves (±8°), ciclos de 2–3.5s.
  const bees = Array.from({ length: count }, () => ({
    left: r(xMin, xMax),
    top: r(yMin, yMax),
    size: r(sMin, sMax),
    opacity: r(0.55, 0.85),
    flip: rand() > 0.5,
    duration: r(2.2, 3.4),
    delay: -r(0, 3),
    x1: r(-20, 20),
    y1: r(-12, 12),
    x2: r(-34, 34),
    y2: r(-10, 10),
    x3: r(-16, 16),
    y3: r(6, 18),
    r0: r(-8, 8),
    r1: r(-6, 6),
    r2: r(-8, 8),
    r3: r(-6, 6),
  }));

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {bees.map((bee, i) => (
        <span
          key={i}
          className="up-bee-floater"
          style={
            {
              position: 'absolute',
              left: `${bee.left}%`,
              top: `${bee.top}%`,
              opacity: bee.opacity,
              animationDuration: `${bee.duration}s`,
              animationDelay: `${bee.delay}s`,
              '--x1': `${bee.x1}px`,
              '--y1': `${bee.y1}px`,
              '--x2': `${bee.x2}px`,
              '--y2': `${bee.y2}px`,
              '--x3': `${bee.x3}px`,
              '--y3': `${bee.y3}px`,
              '--r0': `${bee.r0}deg`,
              '--r1': `${bee.r1}deg`,
              '--r2': `${bee.r2}deg`,
              '--r3': `${bee.r3}deg`,
            } as CSSProperties
          }
        >
          <Bee size={bee.size} flip={bee.flip} />
        </span>
      ))}
    </div>
  );
}

/**
 * Textura fixa de favo de mel cobrindo toda a página — reforça o tema
 * de colmeia/abelha de forma bem sutil, atrás de todo o conteúdo.
 */
export function HoneycombBackdrop() {
  return <div className="up-honeycomb pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}

export default Bee;
