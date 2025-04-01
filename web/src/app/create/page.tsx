"use client";

import type React from "react";
import { generateFlashcardsAction } from "@/actions/openaiActions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NavBar } from "@/components/nav-bar";
import { useState, useRef } from "react";
import {
  Loader2,
  Paperclip,
  X,
  FileImageIcon as PdfIcon,
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { setRigorousness, type Flashcard, initializeTest } from "@/utils/localstorageUtils";
import * as pdfjsLib from "pdfjs-dist";

enum rigss {
  MODERATE = "Acepta como correcto si la respuesta capta la idea general, aunque no sea exacta.",
  PRECISE = "Acepta como correcto si la respuesta incluye los conceptos clave de la definición.",
  STRICT = "Acepta como correcto solo si la respuesta expresa todos los aspectos con la definición dada.",
}

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function CreatePage() {
  const [result, setResult] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [parsedContent, setParsedContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [textContent, setTextContent] = useState<string>("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );
  const [isGenerateSelected, setIsGenerateSelected] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  // Handle Enter key press in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        const formData = new FormData(form);
        handleSubmit(formData);
      }
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      setPdfFile(files[0]);
      const url = URL.createObjectURL(files[0]);
      setPdfUrl(url);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, suelta un archivo PDF.",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0].type === "application/pdf") {
      setPdfFile(files[0]);
      const url = URL.createObjectURL(files[0]);
      setPdfUrl(url);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, selecciona un archivo PDF.",
      });
    }
  };

  const handleRemovePdf = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setPdfFile(null);
    setPdfUrl(null);
    setParsedContent("");
  };

  const parsePdfContent = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      // Extract text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ");
        fullText += pageText + "\n";
      }

      if (!fullText.trim()) {
        throw new Error("No text content found in PDF");
      }

      return fullText.trim();
    } catch (error) {
      console.error("Error parsing PDF:", error);
      throw new Error("Failed to parse PDF content");
    }
  };

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      let finalContent = "";

      if (pdfFile) {
        // If we have a PDF, parse its content
        finalContent = await parsePdfContent(pdfFile);
        setParsedContent(finalContent);
      } else {
        // If we have text, use it directly
        finalContent = formData.get("userContent") as string;
      }

      if (!finalContent.trim()) {
        throw new Error("No content to generate flashcards from");
      }

      setRigorousness(
        difficulty == "easy"
          ? rigss.MODERATE
          : difficulty == "medium"
          ? rigss.PRECISE
          : rigss.STRICT
      );

      const res = await generateFlashcardsAction(
        finalContent,
        isGenerateSelected ? "can" : "cannot"
      );
      if (res.includes("failed")) {
        toast({
          variant: "destructive",
          title: "Error",
          description: res,
        });
      } else {
        setResult(res);
        const flashcards: Flashcard[] = JSON.parse(res);
        initializeTest(flashcards);
        router.push("/ready");
      }
    } catch (error) {
      console.error("Error generating flashcards:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to generate flashcards",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const toggleButton = () => {
    setIsGenerateSelected(!isGenerateSelected);
  };

  // Handle button click submission
  const handleButtonSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      handleSubmit(formData);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50">
      <NavBar />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-slate-800">
            ¿Que tema quieres practicar hoy?
          </h1>
          <p className="text-slate-500">
            Crea flashcards fácilmente de cualquier leccion que desees.
          </p>
        </div>
        <form ref={formRef} className="w-full max-w-2xl">
          <div className="w-full mb-2">
            <div
              className={`relative rounded-xl border-2 border-dashed transition-colors ${
                isDragging
                  ? "border-blue-400 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {pdfFile ? (
                <div className="min-h-[120px] p-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-red-50">
                      <PdfIcon className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {pdfFile.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full hover:bg-slate-200"
                      onClick={handleRemovePdf}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Textarea
                    name="userContent"
                    placeholder="Pega un texto/apunte aquí o arrastra un archivo PDF"
                    className="w-full min-h-[120px] resize-none rounded-xl border-none bg-transparent text-slate-800 placeholder:text-slate-400 focus:ring-0 shadow-sm pr-10 pl-4 py-4"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="absolute right-3 bottom-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileSelect}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full hover:bg-slate-100"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="h-5 w-5 text-slate-400" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Buttons and difficulty slider row */}
          <div className="flex items-center justify-between mt-2 mb-4 px-1">
            {/* Left side button */}
            <div className="flex items-center">
              <Button
                type="button"
                variant="ghost"
                onClick={toggleButton}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isGenerateSelected
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-700"
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Ampliar Contenido</span>
              </Button>
            </div>

            {/* Right side difficulty selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">
                Dificultad:
              </span>
              <div className="flex items-center bg-white rounded-full p-1 shadow-sm border border-slate-200">
                <button
                  type="button"
                  onClick={() => setDifficulty("easy")}
                  className={`relative px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    difficulty === "easy"
                      ? "bg-green-100 text-green-700"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Fácil
                  {difficulty === "easy" && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setDifficulty("medium")}
                  className={`relative px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    difficulty === "medium"
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Media
                  {difficulty === "medium" && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setDifficulty("hard")}
                  className={`relative px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    difficulty === "hard"
                      ? "bg-red-100 text-red-700"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Difícil
                  {difficulty === "hard" && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 w-full">
            <Button
              type="button"
              onClick={handleButtonSubmit}
              className="w-full sm:w-auto rounded-full bg-blue-500 hover:bg-blue-600 px-6 py-2 font-medium text-white"
              disabled={(!pdfFile && !textContent.trim()) || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Generando...
                </div>
              ) : (
                "Generar Flashcards"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 