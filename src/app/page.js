import Image from "next/image";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/_Hero";
import Features from "@/components/layout/_Features";
import Footer from "@/components/layout/_Footer";
export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#121212]">
      <div class="absolute h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-5"></div>

      <div className="flex min-h-screen flex-col overflow-x-hidden items-center justify-center p-24">
        <Hero />
      </div>
      <div className=" w-screen min-h-screen overflow-x-hidden mb-52">
        <div className="max-w-7xl mx-auto">
          <Features />
        </div>
      </div>
      <Footer />
    </main>
  );
}
