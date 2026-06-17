'use client';

import type { CSSProperties } from 'react';

/**
 * Abelhas decorativas do UP Connection — a abelha é o mascote da marca.
 * Cada abelha ganha uma trajetória de voo única, gerada de forma
 * pseudoaleatória mas determinística (mesma semente => mesmo resultado no
 * servidor e no cliente, evitando erros de hidratação do Next).
 * As cores acompanham a paleta da marca (dourado/mel sobre vinho).
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
    <svg
      viewBox="0 0 120 84"
      width={size}
      height={(size * 84) / 120}
      className={`up-bee ${className}`}
      style={{ ...style, transform: `${flip ? 'scaleX(-1) ' : ''}${style?.transform ?? ''}` }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="beeBody" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="hsl(45 96% 72%)" />
          <stop offset="55%" stopColor="hsl(38 92% 58%)" />
          <stop offset="100%" stopColor="hsl(32 80% 46%)" />
        </radialGradient>
        <linearGradient id="beeWing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(45 100% 96%)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(40 90% 78%)" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* Asas (batem com animação) */}
      <g className="up-bee__wings" style={{ transformOrigin: '54px 30px' }}>
        <ellipse cx="44" cy="22" rx="26" ry="15" fill="url(#beeWing)" stroke="hsl(40 60% 70%)" strokeWidth="1" />
        <ellipse cx="66" cy="20" rx="22" ry="12" fill="url(#beeWing)" stroke="hsl(40 60% 70%)" strokeWidth="1" opacity="0.9" />
      </g>

      {/* Corpo / abdômen */}
      <g>
        <ellipse cx="62" cy="50" rx="42" ry="26" fill="url(#beeBody)" stroke="hsl(28 70% 38%)" strokeWidth="2" />
        <path d="M58 26 q12 24 0 48" fill="none" stroke="hsl(330 45% 15%)" strokeWidth="7" strokeLinecap="round" opacity="0.92" />
        <path d="M78 30 q10 20 0 40" fill="none" stroke="hsl(330 45% 15%)" strokeWidth="7" strokeLinecap="round" opacity="0.92" />
        <path d="M96 38 q4 12 0 24" fill="none" stroke="hsl(330 45% 15%)" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
        <path d="M104 50 l14 -3 l-14 8 z" fill="hsl(28 70% 38%)" />
      </g>

      {/* Cabeça */}
      <circle cx="26" cy="50" r="16" fill="hsl(330 45% 14%)" />
      <circle cx="22" cy="46" r="4.2" fill="hsl(45 100% 92%)" />
      <circle cx="23" cy="47" r="2" fill="hsl(330 45% 12%)" />
      {/* Antenas */}
      <g stroke="hsl(330 45% 14%)" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M18 38 q-8 -12 -16 -12" />
        <path d="M26 34 q-2 -14 6 -20" />
      </g>
      <circle cx="2" cy="26" r="3" fill="hsl(38 92% 58%)" />
      <circle cx="32" cy="14" r="3" fill="hsl(38 92% 58%)" />
    </svg>
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
  const [sMin, sMax] = area?.sizeRange ?? [24, 56];

  const bees = Array.from({ length: count }, () => ({
    left: r(xMin, xMax),
    top: r(yMin, yMax),
    size: r(sMin, sMax),
    flip: rand() > 0.5,
    duration: r(15, 30),
    delay: -r(0, 26),
    flutter: r(0.14, 0.22),
    x1: r(-90, 90),
    y1: r(-72, 72),
    x2: r(-90, 90),
    y2: r(-72, 72),
    x3: r(-90, 90),
    y3: r(-72, 72),
    r0: r(-8, 8),
    r1: r(-12, 12),
    r2: r(-12, 12),
    r3: r(-12, 12),
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
              animationDuration: `${bee.duration}s`,
              animationDelay: `${bee.delay}s`,
              '--flutter': `${bee.flutter}s`,
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
