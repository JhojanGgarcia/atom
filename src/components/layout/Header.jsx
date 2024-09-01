"use client";
import Image from "next/image";
import CardHelp from "../ui/CardHelp";
import Link from "next/link";
import { useState } from "react";
export default function Header() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleHelpOpen = () => {
    setIsHelpOpen(!isHelpOpen);
  };
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
        <div className="absolute right-5">
          <button
            type="button"
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            className="cursor-pointer z-10 flex items-center justify-center bottom-5 right-5 backdrop-blur-sm  rounded-md "
          >
            <svg
              opacity={0.3}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#fff"
              fill="none"
            >
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M11.992 17H12.001"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>
      {isHelpOpen && <CardHelp onClick={handleHelpOpen} />}
    </>
  );
}
