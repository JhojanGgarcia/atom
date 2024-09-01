"use client";

import Image from "next/image";
import Header from "./Header";
import Button from "@/components/ui/Button";
import Link from "next/link";
export default function Hero() {

  
  return (
    <main className="flex flex-col   items-center justify-center ">
      <Header />
      <div className="relative flex flex-col items-center justify-center ">
        <div className="absolute flex flex-col justify-center items-center p-10 top-30 mt-20">
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 bg-white/70 blur-xl absolute "></div>
            <Image
              src={"/Atom.svg"}
              alt="logo"
              quality={100}
              className="backdrop-blur-2xl bg-whtie border-2 border-white/50  rounded-3xl"
              width={100}
              height={100}
            ></Image>
          </div>
          <h1 class="mt-4 text-center text-nowrap  text-3xl font-extrabold text-black dark:text-white md:text-5xl">
            Energía de Faraday
          </h1>
          <p class="mt-2 text-center md:text-nowrap text-lg flex md:flex text-white/50 font-medium">
            La potencia en cada inducción electromagnética.
          </p>
        </div>
      </div>

      <div className="mt-48">
        <Link href="/pages/oven">
          <Button padding={"px-4 py-3"}>Empieza Ahora</Button>
        </Link>
      </div>
    </main>
  );
}
