"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { Toaster, toast } from "sonner";
import { userInputs } from "@/lib/userInput";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Constantes para la API
const API_KEY = "AIzaSyB_lem2ycMZDFu6XadJ9AJlkpqpXF380Ik";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const CursorSVG = () => (
  <svg viewBox="8 4 8 16" xmlns="http://www.w3.org/2000/svg" className="cursor">
    <rect x="10" y="6" width="4" height="12" fill="#fff" />
  </svg>
);

const OvenAI = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [positions, setPositions] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [resultText, setResultText] = useState("");
  const [displayResponse, setDisplayResponse] = useState("");
  const [completedTyping, setCompletedTyping] = useState(false);

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

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setInputValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Metal processing initiated");

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(
        `Toma estos datos y haz una simulacion de un horno, proporcionando formulas usadas para el proceso: ${JSON.stringify(
          inputValues
        )}`
      );

      const rawText = result.response.text();
      const cleanedText = rawText
        .replace(/[*#]/g, "") // Elimina '*' y '#'
        .replace(/\s{2,}/g, " ") // Reemplaza múltiples espacios con un solo espacio
        .trim(); // Elimina espacios en blanco al inicio y al final

      console.log(cleanedText); // Añade este log para depurar
      setResultText(cleanedText);
    } catch (error) {
      console.error("Error usando el horno.:", error);
      toast.error("Hubo un problema al usar el horno.");
    }
  };

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  useEffect(() => {
    if (resultText) {
      setCompletedTyping(false);
      let i = 0;
      const stringResponse = resultText;

      const intervalId = setInterval(() => {
        setDisplayResponse(stringResponse.slice(0, i));
        i++;

        if (i > stringResponse.length) {
          clearInterval(intervalId);
          setCompletedTyping(true);
        }
      }, 20);

      return () => clearInterval(intervalId);
    }
  }, [resultText]);

  return (
    <main className="overflow-x-hidden bg-[#121212]">
      <Header />
      <div className="absolute h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-5"></div>

      <div className="flex min-h-screen flex-col overflow-x-hidden items-center justify-center p-24">
        <>
          <Toaster />
          <div className="inset-0 bg-opacity-50 gap-16 flex items-center p-2 justify-center">
            <div className="absolute border-2 border-white/5 overflow-hidden flex items-center justify-center flex-col w-[700px] h-auto p-6 rounded-xl  shadow-lg backgrop-blur-sm"> 
              <span className="absolute bottom-0 mx-auto inset-x-1 h-[1.5px] dark:bg-gradient-to-r w-44 dark:from-fuchsia-400/0 dark:via-white/50" />
              <div className="absolute w-14 h-14 top-0 left-0 bg-white blur-3xl opacity-80" />
              <div className="absolute w-14 h-14 bottom-0 right-0 bg-white blur-3xl opacity-80" />
              <h2 className="text-2xl text-white mb-4">
                Metal Processing Form
              </h2>
              <p className="mb-4 text-white/50">
                Provide the details below to initiate the metal processing.
              </p>
              <form onSubmit={handleSubmit} className="w-full">
                {userInputs.map((item, i) => (
                  <motion.div
                    key={i}
                    onMouseMove={(e) => handleMouseMove(e, i)}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    className="relative w-full my-5"
                  >
                    {item.options ? (
                      <motion.select
                        onChange={(e) => handleInputChange(e, item.label)}
                        className="bg-[#121212] text-white/50  outline-none border border-white/5 w-full rounded-xl p-3.5 transition-opacity duration-500"
                      >
                        {item.options.map((option, index) => (
                          <option
                            key={index}
                            value={option}
                            className="bg-transparent text-white/50"
                          >
                            {option}
                          </option>
                        ))}
                      </motion.select>
                    ) : (
                      <motion.input
                        placeholder={item.placeholder}
                        onChange={(e) => handleInputChange(e, item.label)}
                        className="bg-transparent text-white outline-none placeholder:text-white/40 relative flex items-center border border-white/5 z-10 w-full rounded-xl p-3.5 transition-opacity duration-500"
                      />
                    )}
                    <motion.input
                      style={{
                        border:
                          hoveredIndex === i
                            ? "1px solid rgba(255, 255, 255,0.5)"
                            : "none",
                        opacity: 1,
                        WebkitMaskImage:
                          hoveredIndex === i
                            ? `radial-gradient(10% 100px at ${
                                positions[i]?.x || 0
                              }px ${
                                positions[i]?.y || 0
                              }px, black 45%, transparent)`
                            : "none",
                      }}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full cursor-default rounded-xl border bg-[transparent] p-1 opacity-0 transition-opacity duration-500 placeholder:select-none"
                    />
                  </motion.div>
                ))}
                <div className="flex gap-2 justify-center w-full">
                  <Button
                    padding={"px-2 py-2"}
                    type="submit"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="#ffffff"
                          stroke-linecap="round"
                          stroke-width="1.5"
                        >
                          <path
                            stroke-linejoin="round"
                            d="m9 9l4.5 3L18 9M3 13.5h2m-4-3h4"
                          />
                          <path d="M5 7.5V7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-.5" />
                        </g>
                      </svg>
                    }
                    className="bg-primary"
                  >
                    Start Oven AI
                  </Button>
                </div>
              </form>
            </div>
            <motion.div
  className="fixed bottom-4 right-4 w-full max-w-lg bg-[#1a1a1a] rounded-lg border border-[#ffffff10] shadow-lg p-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <div className="text-white mb-4">{displayResponse}</div>
  {completedTyping && (
    <div className="absolute right-4 bottom-2 flex items-center">
      <CursorSVG />
    </div>
  )}
</motion.div>
          </div>
        </>
      </div>
    </main>
  );
};

export default OvenAI;
