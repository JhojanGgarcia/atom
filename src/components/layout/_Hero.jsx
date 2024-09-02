"use client";

import Image from "next/image";
import Header from "./Header";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
export default function Hero() {
  return (
    <main className="flex flex-col   items-center justify-center ">
      <Header />                                                            

      <div className="relative flex flex-col items-center justify-center ">
        <div className="absolute flex flex-col justify-center items-center p-10 top-30 mt-20">
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 bg-white/70 blur-xl absolute "></div>
            <motion.svg
              className="backdrop-blur-xl  border-2 border-white/50  rounded-3xl"
              width="80"
              height="80"
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
          </div>
          <h1 class="mt-20 text-center text-nowrap  text-3xl font-extrabold text-black dark:text-white md:text-5xl">
            Energía de Faraday
          </h1>
          <p class="mt-2 text-center md:text-nowrap text-lg flex md:flex text-white/50 font-medium">
            La potencia en cada inducción electromagnética.
          </p>
        </div>
      </div>

      <div className="mt-32">
        <Link href="/pages/oven">
          <Button padding={"px-4 py-3"}>Empieza Ahora</Button>
        </Link>
      </div>
    </main>
  );
}
