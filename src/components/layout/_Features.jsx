"use client";
import React, { useState } from "react";
import { data } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";
import "@/styles/AnimatedSvg.css";
import "@/styles/mask.css";
export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [positions, setPositions] = useState({});
  const [opacities, setOpacities] = useState({});

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPositions((prevPositions) => ({
      ...prevPositions,
      [index]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  const itemVariants = {
    hidden: { opacity: 0.5, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setOpacities((prevOpacities) => ({
      ...prevOpacities,
      [index]: 1,
    }));
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setOpacities((prevOpacities) => ({
      ...prevOpacities,
      [hoveredIndex]: 0,
    }));
  };

  const boxStyle =
    " relative overflow-hidden mask rounded-xl border-white/5 border rounded-xl flex flex-col items-center justify-center";

  return (
    <div className="grid md:grid-cols-4 auto-rows-[300px] gap-4 my-10">
      {data.map((item, i) => (
        <div
          key={i}
          onMouseMove={(e) => handleMouseMove(e, i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          className={`${boxStyle} ${
            i === 0 || i === 4 || i === 5 || i === 6 ? "md:col-span-2" : ""
          } ${i === 2 ? "md:row-span-2" : ""}`}
        >
          <input
            disabled={hoveredIndex !== i}
            style={{
              border: "2px solid rgb(255 255 255 / .5)",
              opacity: hoveredIndex === i ? opacities[i] : 0,
              WebkitMaskImage: `radial-gradient(30% 30px at ${
                positions[i]?.x || 0
              }px ${positions[i]?.y || 0}px, black 45%, transparent)`,
            }}
            aria-hidden="true"
            className=" z-20 pointer-events-none absolute left-0 top-0  h-full w-full cursor-default rounded-xl border bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
          />
          <div
            className="pointer-events-none z-10  absolute -inset-px"
            style={{
              opacity: hoveredIndex === i ? opacities[i] : 0,
              background: `radial-gradient(600px circle at ${
                positions[i]?.x || 0
              }px ${positions[i]?.y || 0}px, #1d1d1d, transparent 60%)`,
            }}
          />
         {i === 0 && (
            <>
              <Image
                src={"/bg.svg"}
                alt={"background image"}
                className="w-full z-0 h-full"
                quality={100}
                fill
              />
              <div className="flex z-10">
                <h1 className="md:text-3xl text-xl font-bold bg-gradient-to-l from-white to-[#1d1d1d] inline-block text-transparent bg-clip-text">
                  Precise&nbsp;
                </h1>
                <h1 className="md:text-3xl text-xl text-white font-bold">
                  Temperature&nbsp;
                </h1>
                <h1 className="md:text-3xl text-xl font-bold bg-gradient-to-r from-white to-[#1d1d1d] inline-block text-transparent bg-clip-text">
                  Control.
                </h1>
              </div>
            </>
          )}
          {i === 1 && (
            <div className="z-10 flex items-center justify-center">
              <Image
                className="z-10 animate-ping"
                src={"/Atom.svg"}
                width={50}
                height={50}
                alt={"Atom logo image"}
              ></Image>

              <h1 className="text-3xl font-bold bg-gradient-to-l from-white to-[#1d1d1d] inline-block text-transparent bg-clip-text">
                atom
              </h1>
              <svg>
                <defs>
                  <linearGradient id="gradient" gradientTransform="rotate(0)">
                    <stop offset="25%" stopColor="black" />
                    <stop offset="60%" stopColor="white" />
                    <stop offset="75%" stopColor="black" />
                  </linearGradient>
                  <mask id="gradientMask">
                    <rect
                      id="maskRect"
                      height="400"
                      width="400"
                      fill="url('#gradient')"
                    >
                      <animate
                        id="anim"
                        attributeName="x"
                        dur="1.5s"
                        from="-100%"
                        to="100%"
                        begin="0s; anim.end"
                      />
                    </rect>
                  </mask>
                </defs>
              </svg>

              <svg className="red" width="400px" viewBox="0 0 400 200">
                <path
                  d="M0,4 C200,4 200,78 400,78"
                  stroke="none"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  id="redLayer"
                  d="M0,4 C200,4 200,78 400,78"
                  stroke="#fff"
                  strokeWidth="4"
                  fill="none"
                  mask="url('#gradientMask')"
                />
              </svg>
              <svg className="blue" width="400px" viewBox="0 0 400 200">
                <path
                  d="M0,85 C200,85 200,98 400,98"
                  stroke="none"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  id="redLayer"
                  d="M0,85 C200,85 200,98 400,98"
                  stroke="#3c3c3c"
                  strokeWidth="4"
                  fill="none"
                  mask="url('#gradientMask')"
                />
              </svg>
              <svg className="green" width="400px" viewBox="0 0 400 200">
                <path
                  d="M0,200 C200,200 200,118 400,118"
                  stroke="none"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  id="redLayer"
                  d="M0,200 C200,200 200,118 400,118"
                  stroke="#fff"
                  strokeWidth="4"
                  fill="none"
                  mask="url('#gradientMask')"
                />
              </svg>
            </div>
          )}
          {i === 2 && (
            <div className="text-center z-10 flex-col items-center justify-center">
              <div className="flex absolute top-5 p-10">
                <h1 className="font-bold bg-gradient-to-l from-white to-white/50 inline-block text-transparent bg-clip-text">
                  Induction&nbsp;
                </h1>
                <motion.h1
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: [0.5, 1], scale: [1, 1.05] }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="text-white font-bold"
                >
                  Furnace&nbsp;
                </motion.h1>
                <h1 className="font-bold bg-gradient-to-r from-white to-white/50 inline-block text-transparent bg-clip-text">
                  Description.
                </h1>
              </div>
              <p className="font-bold relative text-lg text-white/50">
                An{" "}
                <motion.span
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: [0.5, 1], scale: [1, 1.05] }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                  className="text-white"
                >
                  induction{" "}
                </motion.span>
                furnace provides rapid heating and uniform temperature
                distribution.
              </p>
            </div>
          )}
          {i === 3 && (
            <div className="absolute flex flex-col gap-4 z-10 top-5 p-5">
              <h1 className="font-bold text-3xl text-white">
                Exothermic{" "}
                <motion.span
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: [0.5, 1], scale: [1, 1.05] }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                >
                  Reactions
                </motion.span>{" "}
                for Metal Heating
              </h1>
              <p className="font-bold text-lg text-white/50">
                Harness exothermic reactions to generate heat and manage the
                temperature efficiently.
              </p>
            </div>
          )}
          {i === 4 && (
            <div className="flex flex-col gap-4 absolute bottom-5 p-5 z-10">
              <h1 className="font-bold text-3xl text-white">
                Low{" "}
                <motion.span
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: [0.5, 1], scale: [1, 1.05] }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                >
                  Emission
                </motion.span>{" "}
                Systems
              </h1>
              <p className="font-bold text-lg text-white/50">
                Minimize environmental impact with efficient and low emission
                systems.
              </p>
            </div>
          )}
          {i === 5 && (
            <div className="flex flex-col items-center justify-center p-5 z-10">
              <h1 className="font-bold text-3xl text-white">
                Advanced{" "}
                <motion.span
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: [0.5, 1], scale: [1, 1.05] }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                >
                  Controls
                </motion.span>{" "}
                for Efficiency
              </h1>
              <p className="font-bold text-lg text-white/50">
                Enhance control with advanced systems for optimal performance.
              </p>
            </div>
          )}
          {i === 6 && (
            <div className="absolute bottom-5 flex flex-col items-center justify-center p-5 z-10">
              <h1 className="font-bold text-3xl text-white">
                State-of-the-Art{" "}
                <motion.span
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: [0.5, 1], scale: [1, 1.05] }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                >
                  Heating
                </motion.span>{" "}
                Technologies
              </h1>
              <p className="font-bold text-lg text-white/50">
                Discover cutting-edge heating technologies for enhanced efficiency.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
