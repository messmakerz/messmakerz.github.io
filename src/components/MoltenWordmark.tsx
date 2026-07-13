"use client";

import { useEffect, useRef, useState } from "react";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/* Molten Core — a domain-warped FBM field in a raw WebGL fragment shader
   (no three.js, zero deps), masked to the MESS wordmark so the lava only
   shows through the letters. Interactive: a heat hotspot follows the cursor,
   and the letters "ignite" left-to-right on load. Guardrails so it never
   janks: capped DPR + reduced-res render, 30fps throttle, pauses off-screen
   and on hidden tabs, and falls back to a static ember gradient when WebGL
   is unavailable or the user prefers reduced motion.

   The mask uses the full MESS PRODUCTION lockup SVG but the wrap is cropped
   to the MESS-only region via aspect-ratio + left-anchored mask sizing. */

const NATIVE_H = 206;
const MESS_W = 452;

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}`;

const frag = (octaves: number) => `precision mediump float;
uniform float u_time;
uniform float u_prog;
uniform vec2 u_res;
uniform vec2 u_mouse;
#define OCTAVES ${octaves}

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < OCTAVES; i++){ v += a * noise(p); p = p * 2.0 + vec2(37.0, 17.0); a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / u_res.y;
  vec2 p = uv * vec2(aspect, 1.0) * 2.6;
  float t = u_time * 0.06;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 0.5),
    fbm(p + 3.0 * q + vec2(8.3, 2.8) - t * 0.5)
  );
  float f = fbm(p + 2.4 * r);

  float md = distance(vec2(uv.x * aspect, uv.y), vec2(u_mouse.x * aspect, u_mouse.y));
  float heat = smoothstep(0.55, 0.0, md);
  f += heat * 0.28;
  f = pow(f * 1.25, 1.25) + 0.08;

  vec3 c1 = vec3(0.09, 0.02, 0.03);
  vec3 c2 = vec3(0.62, 0.09, 0.12);
  vec3 c3 = vec3(0.86, 0.18, 0.20);
  vec3 c4 = vec3(1.0, 0.55, 0.26);
  vec3 col = mix(c1, c2, smoothstep(0.0, 0.42, f));
  col = mix(col, c3, smoothstep(0.34, 0.7, f));
  col = mix(col, c4, smoothstep(0.66, 0.96, f));
  col += heat * vec3(0.32, 0.10, 0.03);
  col *= 1.12 * (0.9 + 0.12 * sin(u_time * 0.5 + length(q)));

  float front = u_prog * 1.3;
  float lit = smoothstep(front, front - 0.28, uv.x);
  float burn = smoothstep(0.07, 0.0, abs(uv.x - front)) * (1.0 - step(1.0, u_prog));
  col = mix(col * 0.04, col, lit) + burn * vec3(1.0, 0.5, 0.18);

  gl_FragColor = vec4(col, 1.0);
}`;

interface MoltenWordmarkProps {
  width?: string;
  opacity?: number;
}

export default function MoltenWordmark({ width = "clamp(280px, 78vw, 760px)", opacity = 1 }: MoltenWordmarkProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shaderOn, setShaderOn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", {
        alpha: false, antialias: false, depth: false,
        stencil: false, powerPreference: "low-power",
      }) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }
    if (!gl || gl.isContextLost()) return;
    const ctx = gl;

    const octaves = window.matchMedia("(max-width: 768px)").matches ? 3 : 5;

    const compile = (type: number, src: string) => {
      const s = ctx.createShader(type);
      if (!s) return null;
      ctx.shaderSource(s, src);
      ctx.compileShader(s);
      if (!ctx.getShaderParameter(s, ctx.COMPILE_STATUS)) return null;
      return s;
    };

    const vs = compile(ctx.VERTEX_SHADER, VERT);
    const fs = compile(ctx.FRAGMENT_SHADER, frag(octaves));
    if (!vs || !fs) return;

    const prog = ctx.createProgram();
    if (!prog) return;
    ctx.attachShader(prog, vs);
    ctx.attachShader(prog, fs);
    ctx.linkProgram(prog);
    if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) return;
    ctx.useProgram(prog);

    const buf = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buf);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), ctx.STATIC_DRAW);
    const loc = ctx.getAttribLocation(prog, "a");
    ctx.enableVertexAttribArray(loc);
    ctx.vertexAttribPointer(loc, 2, ctx.FLOAT, false, 0, 0);

    const uTime = ctx.getUniformLocation(prog, "u_time");
    const uProg = ctx.getUniformLocation(prog, "u_prog");
    const uRes = ctx.getUniformLocation(prog, "u_res");
    const uMouse = ctx.getUniformLocation(prog, "u_mouse");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const renderScale = 0.7;
    const resize = () => {
      const w = Math.max(1, Math.floor(wrap.clientWidth * dpr * renderScale));
      const h = Math.max(1, Math.floor(wrap.clientHeight * dpr * renderScale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        ctx.viewport(0, 0, w, h);
      }
    };
    resize();
    setShaderOn(true);

    const mouse = { x: 0.5, y: 0.55, tx: 0.5, ty: 0.55 };
    const onMove = (e: PointerEvent) => {
      const b = wrap.getBoundingClientRect();
      mouse.tx = (e.clientX - b.left) / b.width;
      mouse.ty = 1 - (e.clientY - b.top) / b.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let last = 0;
    let visible = true;
    let hidden = document.hidden;
    const start = performance.now();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(wrap);
    const onVis = () => { hidden = document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    const frameLoop = (now: number) => {
      raf = requestAnimationFrame(frameLoop);
      if (hidden || !visible) { last = now; return; }
      if (now - last < 33) return;
      last = now;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      const p = Math.min((now - start) / 1700, 1);
      ctx.uniform2f(uRes, canvas.width, canvas.height);
      ctx.uniform2f(uMouse, mouse.x, mouse.y);
      ctx.uniform1f(uProg, p);
      ctx.uniform1f(uTime, now * 0.001);
      ctx.drawArrays(ctx.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frameLoop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      // Note: we intentionally do NOT lose the WebGL context here — React dev
      // strict-mode re-runs this effect, and a lost context can't be reused on
      // the same canvas. The hero never unmounts in practice; GC handles it.
    };
  }, []);

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: `url(${base}/mess-logo.svg)`,
    maskImage: `url(${base}/mess-logo.svg)`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "left center",
    maskPosition: "left center",
    WebkitMaskSize: "auto 100%",
    maskSize: "auto 100%",
  };

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="MESS"
      style={{
        position: "relative",
        width,
        aspectRatio: `${MESS_W} / ${NATIVE_H}`,
        opacity,
        ...maskStyle,
      }}
    >
      {/* Static ember fallback — also the reduced-motion / no-WebGL state */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(130% 150% at 35% 62%, #e23b34 0%, #c8293a 22%, #7a1320 48%, #2a0810 78%, #16060a 100%)",
        }}
      />
      {/* Live molten shader, fades in over the fallback once running */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          opacity: shaderOn ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />
    </div>
  );
}
