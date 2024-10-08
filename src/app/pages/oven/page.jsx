"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/_Footer";
import { Toaster, toast } from "sonner";
import { userInputs } from "@/lib/userInput";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Button from "@/components/ui/Button";
import CardHelp from "@/components/ui/CardHelp";
import "@/styles/mask.css";

// Constantes para la API
const API_KEY = process.env.NEXT_PUBLIC_API_IA;
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
  const [isOpen, setIsOpen] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);


  const paragraphStyles = {
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    display: "-webkit-box",
  };




  const initialInputValues = userInputs.reduce((acc, item) => {
    acc[item.label] = "";
    return acc;
  }, {});

  const handleDataClear = () => {
    setInputValues(initialInputValues);
    setResultText("");
    setDisplayResponse("");
    setCompletedTyping(false);
    setIsOpen(false);
    setIsAIOpen(false);
    setIsProcessing(false);
    setButtonClicked(false);
  };

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
    if (isProcessing || buttonClicked) {
      return;
    }
    setButtonClicked(true);
    setIsAIOpen(true);
    setIsProcessing(true);

    toast.success("Horno iniciado.");

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(
        `Usa los siguientes datos para realizar cálculos matemáticos. Proporciona las fórmulas:
        ${JSON.stringify(inputValues)}
        Asegúrate de entregarme un resultado de la fundicion del material dado.`
      );

      const rawText = await result.response.text();
      const cleanedText = rawText
        .replace(/[*#]/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();
      setResultText(cleanedText);
    } catch (error) {
      console.error("Error usando el horno:", error);
      toast.error("Hubo un problema al usar el horno.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);
  const ref = useRef(null);

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
          setButtonClicked(false);
        }
      }, 10);

      return () => clearInterval(intervalId);
    }
  }, [resultText]);

  useEffect(() => {
    if (ref.current) {
      setShowReadMoreButton(
        ref.current.scrollHeight !== ref.current.clientHeight
      );
    }
  }, [ref.current?.scrollHeight, ref.current?.clientHeight]);

  return (
    <main className="overflow-x-hidden flex flex-col  gap-20 bg-[#121212]">
      
      <Header />
      <div className="absolute h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-5"></div>

      <div className="flex flex-col md:flex-row min-h-screen  items-center gap-32 p-1 justify-center">
        <Toaster />
        <div className="inset-0 bg-opacity-50 gap-16 flex-col items-center p-1 justify-between">
          <div className="relative border-2  border-white/5 overflow-hidden flex items-center justify-center flex-col top-16 p-4 rounded-xl shadow-lg backdrop-blur-sm">
            <span className="absolute bottom-0 mx-auto inset-x-1 h-[1.5px] dark:bg-gradient-to-r w-44 dark:from-fuchsia-400/0 dark:via-white/50" />
            <div className="absolute w-14 h-14 top-0 left-0 bg-white blur-3xl opacity-80" />
            <div className="absolute w-14 h-14 bottom-0 right-0 bg-white blur-3xl opacity-80" />
            <h2 className="text-2xl text-white mb-4 text-center">
              Horno de inducción.
            </h2>
            <p className="mb-4 max-w-lg text-white/50 text-center">
              Proporcione los detalles a continuación para iniciar el
              procesamiento del horno.
            </p>
            <div className="flex flex-col gap-2 items-center w-full">
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
                        className="bg-[#121212] text-white/50 outline-none border border-white/5 w-full rounded-xl p-3.5 transition-opacity duration-500"
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
                        type={item.type}
                        value={inputValues[item.label]}
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
                      className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full cursor-default rounded-xl bg-transparent opacity-0 transition-opacity duration-500"
                    />
                  </motion.div>
                ))}
                <div className="flex items-center justify-between">
                  <Button
                    onClick={handleSubmit}
                    disabled={isProcessing || buttonClicked}
                    padding={"px-2 py-2"}
                    type="button"
                    className="bg-primary"
                  >
                    Empezar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDataClear}
                    padding={"px-2 py-2"}
                    className="bg-primary"
                  >
                    Limpiar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {isAIOpen && (
          <motion.div
            inicial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex min-h-10 p-1 md:h-0 items-center justify-center"
          >
            <motion.div
              className="w-full max-h-[60vh] p-6 h-auto overflow-auto max-w-xl bg-[#1a1a1a] rounded-lg border mask border-[#ffffff10] shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div
                style={isOpen ? null : paragraphStyles}
                ref={ref}
                className="text-white mb-4"
              >
                {displayResponse}
              </div>
              {showReadMoreButton && (
                <>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white/50 font-medium hover:underline"
                  >
                    {isOpen ? "Leer menos" : "Leer más"}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default OvenAI;
