"use client";
import Image from "next/image";
import CardHelp from "../ui/CardHelp";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { motion } from "framer-motion";
export default function Header() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleHelpOpen = (e) => {
    e.stopPropagation();
    setIsHelpOpen(!isHelpOpen);
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      if (isHelpOpen) {
        setIsHelpOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isHelpOpen]);
  return (
    <>
      <header className="fixed backdrop-blur-3xl top-0 overflow-hidden z-50 w-full border-b border-white/5 h-16 flex items-center justify-center">
        <span class="absolute left-12 w-[100%] mx-auto inset-x-1 bottom-0 h-px dark:bg-gradient-to-r dark:from-fuchsia-400/0 dark:via-white/30 dark:to-fuchsia-400/0"></span>
        <div className="max-w-7xl flex items-center p- gap-1 w-full h-full relative">
          <Link href="/" className="flex items-center gap-1">
            <motion.svg
              className="relative"
              width="40"
              height="40"
              viewBox="0 0 512 512"
            >
              <g>
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 1,
                  }}
                  d="M99 406H171.916C171.916 406 195.207 365.216 254.163 365.216C313.119 365.216 329.549 406 329.549 406L412 406L304.908 106L206.092 106L99 406ZM187.835 334.291L254.77 159.125L319.711 334.291C319.711 334.291 298.259 315.928 254.163 315.928C210.066 315.928 187.835 334.291 187.835 334.291Z"
                  fill="#1212"
                  stroke="white"
                  strokeWidth="8"
                />
              </g>
            </motion.svg>
            <h1 className=" font-bold  text-white ">atom</h1>
          </Link>
          <div className="items-center flex-row justify-center text-black dark:text-white font-sans font-medium text-xs mx-2 px-2 py-1 border border-white/5 shadow-[0_0_3px_0_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-700 rounded-xl bg-transparent backdrop-blur-md ">
            v0.0.1
          </div>
          <div className="absolute right-0 p-4 gap-2 flex"></div>
        </div>
        <div className="absolute right-10">
          <Button
            padding={"px-2 py-1"}
            type="button"
            onClick={handleHelpOpen}
            className="cursor-pointer z-10 flex items-center justify-center bottom-5 right-5 backdrop-blur-sm  rounded-md "
          >
            Help
          </Button>
        </div>
      </header>
      {isHelpOpen && <CardHelp onClick={handleHelpOpen} />}
    </>
  );
}
