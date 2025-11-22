// HeroSection.tsx
import React, { useState, useEffect, useMemo } from "react";

type Mouse = { x: number; y: number };

const styles = `
  .hero-cursor {
    position: absolute;
    pointer-events: none;
    border-radius: 9999px;
    transition: width .7s, height .7s, background-color .7s, border .7s, backdrop-filter .7s;
    transform: translate(-50%, -50%) scale(var(--scale, 0));
    opacity: var(--opacity, 0);
  }
`;

const Line: React.FC<{
  desktop: string;
  mobile: string;
  className?: string;
  onHover: (v: boolean) => void;
}> = React.memo(({ desktop, mobile, className = "", onHover }) => (
  <h1
    className={`${className} fade-in-up`}
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
  >
    <span className="md:hidden">{mobile}</span>
    <span className="hidden md:inline">{desktop}</span>
  </h1>
));

const HeroSection: React.FC = () => {
  const [pos, setPos] = useState<Mouse>({ x: 0, y: 0 });
  const [inside, setInside] = useState(false);
  const [hovering, setHovering] = useState(false);

  /* ------------- mouse tracking with single RAF loop ---------------- */
  useEffect(() => {
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const hero = document.getElementById("hero");

    const move = (e: MouseEvent) => {
      const r = hero!.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };

    const tick = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      setPos({ x: cx, y: cy });
      raf = requestAnimationFrame(tick);
    };

    const enter = () => (setInside(true), (raf = requestAnimationFrame(tick)));
    const leave = () => (
      setInside(false), setHovering(false), cancelAnimationFrame(raf)
    );

    hero?.addEventListener("mousemove", move);
    hero?.addEventListener("mouseenter", enter);
    hero?.addEventListener("mouseleave", leave);

    return () => {
      hero?.removeEventListener("mousemove", move);
      hero?.removeEventListener("mouseenter", enter);
      hero?.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ------------- static data memoised ------------------------------- */
  const headings = useMemo(
    () => ["Your Essential Tools in One Place", "Fast, Private & Always Ready"],
    []
  );

  /* ------------- render -------------------------------------------- */
  return (
    <>
      <style>{styles}</style>

      <section
        id="hero"
        className="relative w-full md:h-[25vw] h-[30vh] overflow-hidden rounded-2xl select-none cursor-none border-2 border-zinc-100/50 dark:border-zinc-900/50"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(99,102,241,.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(14,165,233,.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(168,85,247,.08) 0%, transparent 60%)`,
        }}
      >
        {/* cursor follower */}
        <div
          className="hero-cursor z-15 hidden md:block"
          style={
            {
              left: pos.x,
              top: pos.y,
              width: hovering ? 180 : 20,
              height: hovering ? 180 : 20,
              backgroundColor: hovering
                ? "rgba(59,130,246,.1)"
                : "rgba(113,113,122,1)",
              backdropFilter: hovering ? "blur(8px)" : "blur(0)",
              border: hovering ? "2px solid rgba(255,255,255,.5)" : "none",
              "--scale": inside ? 1 : 0,
              "--opacity": inside ? 1 : 0,
            } as React.CSSProperties
          }
        />

        {/* content */}
        <div className="flex h-full flex-col items-center justify-center text-center font-semibold">
          {headings.map((text, i) => (
            <Line
              key={i}
              desktop={text}
              mobile={text}
              className="md:text-[2.8vw] text-[2.5vh] tracking-tight md:leading-[3vw] leading-[3.3vh] text-zinc-700 dark:text-zinc-300"
              onHover={setHovering}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
