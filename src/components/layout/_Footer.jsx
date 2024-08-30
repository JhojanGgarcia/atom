import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="w-screen relative">
    <span className="absolute mx-auto top-0 inset-x-1 h-[1.5px] dark:bg-gradient-to-r w-full dark:from-fuchsia-400/0 dark:via-white/50 "/>
    <div className="mx-auto flex flex-col max-w-7xl justify-center py-12 text-gray-600 dark:text-gray-400 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)] md:flex-row md:justify-between">
      <div className="flex w-full flex-col items-center sm:items-start md:items-start">
        <div className="flex items-center gap-2">
          <Image src={"/Atom.svg"} alt="logo" width={40} height={40} />
          <span className="mr-1 text-white">Hecho por Rous (JhojanGgarcia)</span>
        </div>
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          © 2024 Rous. Licencia
          <a
            href="https://www.apache.org/licenses/LICENSE-2.0"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 dark:hover:text-gray-300 ml-1"
          >
            Apache License 2.0
          </a>
          .
        </p>
      </div>
      <div className="flex flex-col items-center mt-4 md:mt-0 md:items-start">
        <Link className="flex text-nowrap gap-2" href={"https://github.com/JhojanGgarcia/atom"}>
          <Image src="/github.svg" alt="GitHub" width={30} height={30} />
          Stars On GitHub
        </Link>
      </div>
    </div>
  </footer>
  
  );
}
