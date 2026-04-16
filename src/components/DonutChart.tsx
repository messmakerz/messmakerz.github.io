"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DonutChartProps {
  female: number;
  male: number;
}

export default function DonutChart({ female, male }: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const femaleArcRef = useRef<SVGCircleElement>(null);
  const countFemaleRef = useRef<HTMLSpanElement>(null);
  const countMaleRef = useRef<HTMLSpanElement>(null);

  const SIZE = 320;
  const STROKE = 48;
  const R = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * R;
  const femaleOffset = CIRCUMFERENCE * (1 - female / 100);

  useEffect(() => {
    const arc = femaleArcRef.current;
    if (!arc) return;

    gsap.set(arc, { strokeDashoffset: CIRCUMFERENCE });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 80%",
      },
    });

    tl.to(arc, {
      strokeDashoffset: femaleOffset,
      duration: 1.6,
      ease: "power2.inOut",
    });

    // Count up animation
    const objF = { val: 0 };
    const objM = { val: 0 };
    tl.to(
      objF,
      {
        val: female,
        duration: 1.4,
        ease: "power2.out",
        onUpdate() {
          if (countFemaleRef.current)
            countFemaleRef.current.textContent = `${Math.round(objF.val)}%`;
        },
      },
      0.2
    );
    tl.to(
      objM,
      {
        val: male,
        duration: 1.4,
        ease: "power2.out",
        onUpdate() {
          if (countMaleRef.current)
            countMaleRef.current.textContent = `${Math.round(objM.val)}%`;
        },
      },
      0.2
    );
  }, [female, male, femaleOffset, CIRCUMFERENCE]);

  const cx = SIZE / 2;
  const cy = SIZE / 2;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <svg
          ref={svgRef}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="rotate-[-90deg]"
        >
          {/* Background track */}
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke="var(--card-bg)"
            strokeWidth={STROKE}
          />
          {/* Female arc */}
          <circle
            ref={femaleArcRef}
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke="var(--red)"
            strokeWidth={STROKE}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            strokeLinecap="butt"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-4xl font-bold leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            <span ref={countFemaleRef}>0%</span>
          </span>
          <span
            className="text-sm font-light text-[var(--text-muted)] mt-1 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Female
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-8" style={{ fontFamily: "var(--font-display)" }}>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--red)]" />
          <span className="text-sm font-light">
            FEMALE{" "}
            <strong ref={countFemaleRef} className="font-normal">
              0%
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--card-bg)]" />
          <span className="text-sm font-light">
            MALE{" "}
            <strong ref={countMaleRef} className="font-normal text-[var(--text-muted)]">
              0%
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}
