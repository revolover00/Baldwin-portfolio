import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position across the process section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Reactive nodes on the central line
  const node1Progress = useTransform(scrollYProgress, [0, 0.25], [0.15, 1]);
  const node2Progress = useTransform(scrollYProgress, [0.22, 0.48], [0.15, 1]);
  const node3Progress = useTransform(scrollYProgress, [0.45, 0.72], [0.15, 1]);
  const node4Progress = useTransform(scrollYProgress, [0.68, 0.95], [0.15, 1]);

  const steps = [
    {
      icon: Search,
      title: "Discovery",
      desc: "Deep dive into your brand, audience, and goals.",
      align: "left",
      nodeProgress: node1Progress,
      nodeTop: "15%",
    },
    {
      icon: PenTool,
      title: "Design",
      desc: "Crafting the visual identity and user experience.",
      align: "right",
      nodeProgress: node2Progress,
      nodeTop: "40%",
    },
    {
      icon: Code2,
      title: "Build",
      desc: "Robust, performant engineering and animation.",
      align: "left",
      nodeProgress: node3Progress,
      nodeTop: "65%",
    },
    {
      icon: Rocket,
      title: "Launch",
      desc: "Deployment, optimization, and handoff.",
      align: "right",
      nodeProgress: node4Progress,
      nodeTop: "90%",
    },
  ];

  return (
    <div 
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 z-10 selection:bg-[#CC00FF]/20 selection:text-white relative"
    >
      {/* Grid section header */}
      <div className="flex flex-col mb-16 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start gap-4"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#CC00FF] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E8D5F5]">
              Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-2 font-display">
            How I Work
          </h2>
          <p className="text-xs sm:text-base text-[#A78BCA] max-w-xl leading-relaxed">
            A streamlined approach from raw concept to a polished, high-performance web experience.
          </p>
        </motion.div>
      </div>

      <div className="relative mt-12 md:mt-16 pb-12 md:pb-28">
        {/* DESKTOP CENTRAL PROGRESS LINE SPINE */}
        <div className="hidden md:block absolute left-1/2 top-[5%] bottom-[5%] w-[1px] -translate-x-1/2 bg-white/10 pointer-events-none z-0">
          <motion.div 
            className="w-full bg-gradient-to-b from-[#CC00FF] via-[#7B2FBE] to-[#CC00FF] origin-top"
            style={{ 
              height: "100%",
              scaleY: scrollYProgress,
              boxShadow: "0 0 12px #CC00FF, 0 0 4px #CC00FF",
              filter: "blur(0.5px)"
            }}
          />

          {/* Glowing node checkpoints */}
          {steps.map((step, idx) => (
            <motion.div
              key={`node-${idx}`}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#130d1d] border-2 border-white/10 flex items-center justify-center"
              style={{ 
                top: step.nodeTop,
              }}
            >
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-[#CC00FF]"
                style={{ 
                  scale: step.nodeProgress, 
                  opacity: step.nodeProgress,
                  boxShadow: "0 0 8px #CC00FF"
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* MOBILE VERTICAL PROGRESS LINE RAIL */}
        <div className="md:hidden absolute left-[22px] top-[4%] bottom-[4%] w-[1px] bg-white/10 pointer-events-none z-0">
          <motion.div 
            className="w-full bg-gradient-to-b from-[#CC00FF] to-[#7B2FBE] origin-top"
            style={{ 
              height: "100%",
              scaleY: scrollYProgress,
              boxShadow: "0 0 8px #CC00FF"
            }}
          />
        </div>

        {/* 2X2 CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12 md:gap-y-0 relative z-10">
          {steps.map((step, index) => {
            const isLeft = step.align === "left";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
                className={`flex flex-col md:w-full relative ${
                  index % 2 === 1 ? "md:translate-y-24" : "md:translate-y-0"
                } ${
                  index > 1 ? "md:mt-16" : ""
                }`}
              >
                {/* BRANCH CONNECTING LINE TO CENTER (DESKTOP) */}
                {isLeft ? (
                  <div className="hidden md:block absolute right-[-48px] lg:right-[-96px] top-[48px] w-[48px] lg:w-[96px] h-[1px] bg-white/15 pointer-events-none z-0">
                    <motion.div 
                      className="h-full bg-[#CC00FF]"
                      style={{ 
                        scaleX: step.nodeProgress,
                        originX: 1,
                        opacity: step.nodeProgress,
                        boxShadow: "0 0 4px #CC00FF"
                      }}
                    />
                  </div>
                ) : (
                  <div className="hidden md:block absolute left-[-48px] lg:left-[-96px] top-[48px] w-[48px] lg:w-[96px] h-[1px] bg-white/15 pointer-events-none z-0">
                    <motion.div 
                      className="h-full bg-[#CC00FF]"
                      style={{ 
                        scaleX: step.nodeProgress,
                        originX: 0,
                        opacity: step.nodeProgress,
                        boxShadow: "0 0 4px #CC00FF"
                      }}
                    />
                  </div>
                )}

                {/* THE CORE STEP CARD */}
                <div className="gothic-card rounded-2xl p-6 sm:p-8 flex flex-col group relative z-10 bg-[#0E0715]/40 border border-white/5 backdrop-blur-md hover:border-[#CC00FF]/30 transition-all duration-300 shadow-xl pl-12 md:pl-8">
                  {/* Step counter / icon */}
                  <div className="flex items-center justify-between mb-6 sm:mb-10">
                    <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-[#CC00FF]/10 group-hover:border-[#CC00FF]/40">
                      <step.icon size={20} className="text-[#A78BCA] group-hover:text-[#CC00FF] transition-colors" />
                    </div>
                    <span className="text-[#7B2FBE]/20 font-display font-black text-3xl sm:text-4xl group-hover:text-[#CC00FF]/30 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title and description */}
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-[#E8D5F5] mb-2 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A78BCA] leading-relaxed relative">
                    {step.desc}
                  </p>

                  {/* Glow accent bottom border */}
                  <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#CC00FF]/0 to-transparent group-hover:via-[#CC00FF]/40 transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
