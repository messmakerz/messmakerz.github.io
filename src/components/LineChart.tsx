"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WIDTH = 600;
const HEIGHT = 280;
const PAD_LEFT = 48;
const PAD_RIGHT = 20;
const PAD_TOP = 30;
const PAD_BOTTOM = 50;

const CHART_W = WIDTH - PAD_LEFT - PAD_RIGHT;
const CHART_H = HEIGHT - PAD_TOP - PAD_BOTTOM;

const years = [2022, 2023, 2024, 2025, 2026];

// Age data lines — extracted from visual
const lines: { label: string; color: string; data: number[] }[] = [
  { label: "18–24", color: "var(--pink-blush)", data: [820, 900, 780, 850, 920] },
  { label: "25–32", color: "var(--red)", data: [600, 750, 900, 1050, 1200] },
  { label: "33–40", color: "var(--pink-mid)", data: [400, 500, 580, 620, 700] },
  { label: "41+", color: "var(--text)", data: [200, 250, 300, 320, 350] },
];

const allVals = lines.flatMap((l) => l.data);
const minV = Math.min(...allVals);
const maxV = Math.max(...allVals);

function toX(i: number) {
  return PAD_LEFT + (i / (years.length - 1)) * CHART_W;
}
function toY(v: number) {
  return PAD_TOP + CHART_H - ((v - minV) / (maxV - minV)) * CHART_H;
}

function makePath(data: number[]) {
  return data
    .map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`)
    .join(" ");
}

export default function LineChart() {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    pathRefs.current.forEach((path, idx) => {
      if (!path) return;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.8,
        delay: idx * 0.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: path,
          start: "top 95%",
        },
      });
    });

    if (dotsRef.current) {
      const dots = dotsRef.current.querySelectorAll("circle");
      gsap.fromTo(
        dots,
        { scale: 0, transformOrigin: "center" },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dotsRef.current,
            start: "top 95%",
          },
          delay: 1.2,
        }
      );
    }
  }, []);

  const yGridVals = [200, 400, 600, 800, 1000, 1200];

  return (
    <div className="overflow-x-auto">
      <svg
        width="100%"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{ fontFamily: "var(--font-data)", minWidth: 320 }}
      >
        {/* Y grid lines + labels */}
        {yGridVals.map((v) => (
          <g key={v}>
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={toY(v)}
              y2={toY(v)}
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={PAD_LEFT - 8}
              y={toY(v)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={11}
              fill="var(--text-muted)"
            >
              {v}
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {years.map((y, i) => (
          <text
            key={y}
            x={toX(i)}
            y={HEIGHT - 10}
            textAnchor="middle"
            fontSize={12}
            fill="var(--text-muted)"
          >
            {y}
          </text>
        ))}

        {/* Lines */}
        {lines.map((line, idx) => (
          <path
            key={line.label}
            ref={(el) => { pathRefs.current[idx] = el; }}
            d={makePath(line.data)}
            fill="none"
            stroke={line.color}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Dots */}
        <g ref={dotsRef}>
          {lines.map((line) =>
            line.data.map((v, i) => (
              <circle
                key={`${line.label}-${i}`}
                cx={toX(i)}
                cy={toY(v)}
                r={4}
                fill={line.color}
              />
            ))
          )}
        </g>
      </svg>

      {/* Legend */}
      <div
        className="flex flex-wrap gap-4 mt-4"
        style={{ fontFamily: "var(--font-data)" }}
      >
        {lines.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span
              className="w-6 h-0.5 inline-block rounded-full"
              style={{ backgroundColor: l.color }}
            />
            <span className="text-xs font-light text-[var(--text-muted)]">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
