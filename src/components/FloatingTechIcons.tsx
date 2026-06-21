import { useMemo, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiSupabase,
  SiVite,
  SiPostgresql,
  SiGithub,
  SiVercel,
  SiGit,
  SiNodedotjs,
  SiJavascript,
  SiHtml5,
  SiNextdotjs,
  SiGooglegemini,
  SiDocker,
  SiPython,
  SiOpenai,
  SiFigma,
  SiSass,
} from "react-icons/si";

// Reuses the exact brand colors already defined in About.tsx's getSkillIcon()
// — keep these in sync if that list ever changes.
const TECH_ICONS = [
  { Icon: SiReact, color: "#61DAFB" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: SiTailwindcss, color: "#38BDF8" },
  { Icon: SiFramer, color: "#E10098" },
  { Icon: SiSupabase, color: "#3ECF8E" },
  { Icon: SiVite, color: "#646CFF" },
  { Icon: SiPostgresql, color: "#336791" },
  { Icon: SiGithub, color: "#FFFFFF" },
  { Icon: SiVercel, color: "#FFFFFF" },
  { Icon: SiGit, color: "#F05032" },
  { Icon: SiNodedotjs, color: "#339933" },
  { Icon: SiJavascript, color: "#F7DF1E" },
  { Icon: SiHtml5, color: "#E34F26" },
  { Icon: SiNextdotjs, color: "#FFFFFF" },
  { Icon: SiGooglegemini, color: "#FFD700" },
  { Icon: SiDocker, color: "#2496ED" },
  { Icon: SiPython, color: "#3776AB" },
  { Icon: SiOpenai, color: "#19C37D" },
  { Icon: SiFigma, color: "#F24E1E" },
  { Icon: SiSass, color: "#CC6699" },
] as const;

interface FloatingIcon {
  key: number;
  Icon: (typeof TECH_ICONS)[number]["Icon"];
  color: string;
  size: number;
  startXVw: number;
  startYVh: number;
  driftX: number; // px, relative drift applied via animate
  driftY: number; // px
  duration: number;
  delay: number;
  rotateTo: number;
}

function buildIcons(count: number): FloatingIcon[] {
  return Array.from({ length: count }, (_, i) => {
    const base = TECH_ICONS[i % TECH_ICONS.length];
    return {
      key: i,
      Icon: base.Icon,
      color: base.color,
      size: 18 + Math.random() * 14, // 18px - 32px
      startXVw: Math.random() * 100,
      startYVh: Math.random() * 100,
      driftX: (Math.random() - 0.5) * 120, // -60px to 60px
      driftY: (Math.random() - 0.5) * 140, // -70px to 70px
      duration: 18 + Math.random() * 18, // 18s - 36s
      delay: Math.random() * 8,
      rotateTo: (Math.random() - 0.5) * 40, // -20deg to 20deg
    };
  });
}

export default function FloatingTechIcons() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Built once per mount so icons don't reshuffle on unrelated re-renders.
  const icons = useMemo(() => buildIcons(isMobile ? 12 : 28), [isMobile]);

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {icons.map(({ key, Icon, color, size, startXVw, startYVh, driftX, driftY, duration, delay, rotateTo }) => (
        <motion.div
          key={key}
          className="absolute"
          style={{
            left: `${startXVw}vw`,
            top: `${startYVh}vh`,
            color,
            opacity: 0.12,
          }}
          animate={{
            x: [0, driftX, 0],
            y: [0, driftY, 0],
            rotate: [0, rotateTo, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}
    </div>
  );
}
