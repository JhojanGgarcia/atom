"use client";
import Image from "next/image";
import CardHelp from "../ui/CardHelp";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
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
        <div className="max-w-7xl flex items-center p-2 gap-1 w-full h-full relative">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/Atom.svg" alt="logo" width={24} height={24} />
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
