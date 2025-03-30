"use client";

import "regenerator-runtime/runtime";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NavBar } from "@/components/nav-bar";
import { CheckCircle, XCircle, ArrowRight, Mic } from "lucide-react";
import Link from "next/link";
import { NameCard } from "@/components/ui/nameCard";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { evaluateAnswer } from "@/actions/openaiActions";
import { useRouter } from "next/navigation";
import {
  Flashcard,
  removeFlashcard,
  getRandomFlashcard,
} from "@/utils/localstorageUtils";

export default function PracticePage() {
  const router = useRouter();
  const [currentCard, setCurrentCard] = useState<{
    card: Flashcard;
    index: number;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<null | {
    correct: boolean;
    status: string;
    message: string;
  }>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showingReview, setShowingReview] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [lastTranscriptTime, setLastTranscriptTime] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCard, setIsLoadingCard] = useState(true);
  const [needToRemoveCard, setNeedToRemoveCard] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

    const isFirstRender = useRef(true); // Controla si es el primer render

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // La primera vez se salta el efecto
      return;
    }

    removeFlashcard(currentCard!.index);

  }, [needToRemoveCard]); // Solo se ejecuta cuando `valor` cambia

  useEffect(() => {
    async function loadFlashcard() {
      setIsLoadingCard(true);
      const flashcard = await getRandomFlashcard();
      if (!flashcard) {
        setCompleted(true);
        return;
      }
      setCurrentCard(flashcard);
      setIsLoadingCard(false);
    }
    loadFlashcard();
  }, [router]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserAnswer(e.target.value);
  };

  // Actualiza el textarea cuando cambia la transcripción
  useEffect(() => {
    if (transcript) {
      setUserAnswer(transcript);
      setLastTranscriptTime(Date.now());
    }
  }, [transcript]);

  // Autostop si no se habla durante 5 segundos
  useEffect(() => {
    if (!listening || lastTranscriptTime === null) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastTranscriptTime > 5000) {
        SpeechRecognition.stopListening();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [listening, lastTranscriptTime]);

  // Ajustar la altura automáticamente del textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to content height
    }
  }, [userAnswer]);

  const handleMicClick = () => {
    if (!listening) {
      resetTranscript();
      setLastTranscriptTime(Date.now());
      SpeechRecognition.startListening({ continuous: true, language: "es-ES" });
    } else {
      SpeechRecognition.stopListening();
    }
  };

  const checkAnswer = async () => {
    if (!currentCard) return;

    setIsLoading(true);
    try {
      const evaluation = await evaluateAnswer(
        currentCard.card.definition,
        userAnswer
      );
      const [score, status, message] = evaluation.split(";");

      setFeedback({
        correct: score === "0",
        status: status,
        message: message,
      });
    } catch (error) {
      setFeedback({
        correct: false,
        status: "Error",
        message:
          "Hubo un error al evaluar tu respuesta. Por favor, intenta de nuevo.",
      });
    } finally {
      setIsLoading(false);
      setShowingReview(true);
    }
  };

  const nextCard = async () => {
    if (feedback?.correct) {
      setNeedToRemoveCard(true);
    }
    const newCard = await getRandomFlashcard();
    if (!newCard) {
      setCompleted(true);
      return;
    }
    setCurrentCard(newCard);
    setUserAnswer("");
    setFeedback(null);
    setShowingReview(false);
  };

  if (isLoadingCard) {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50">
        <NavBar compact />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
          <div className="text-slate-500">Cargando flashcard...</div>
        </div>
      </main>
    );
  }

  if (!currentCard) {
    return null;
  }

  if (completed) {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50">
        <NavBar compact />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16">
          <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-md border border-slate-100">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-slate-800">
                ¡Has completado la práctica!
              </h2>
              <p className="mb-8 text-slate-500">
                Has repasado todos los conceptos. ¿Quieres crear nuevas
                flashcards o practicar de nuevo?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/">
                  <Button className="rounded-full bg-blue-500 hover:bg-blue-600 px-6 py-3 font-medium text-white">
                    Crear nuevas flashcards
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setCurrentCard(null);
                    setUserAnswer("");
                    setFeedback(null);
                    setShowingReview(false);
                    setCompleted(false);
                  }}
                  className="rounded-full border-2 border-blue-500 bg-transparent px-6 py-3 font-medium text-blue-500 hover:bg-blue-50"
                >
                  Practicar de nuevo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (showingReview) {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50">
        <NavBar compact />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16">
          <div className="w-full max-w-xl">
            {/* User Answer */}
            <div className="mb-6 rounded-xl bg-white p-6 shadow-md border border-slate-100">
              <h2 className="mb-2 text-lg font-medium text-slate-500">
                Mi respuesta:
              </h2>
              <p className="rounded-lg bg-slate-50 p-4 text-slate-700">
                {userAnswer}
              </p>
            </div>

            {/* Feedback Icon */}
            <div className="mb-6 flex flex-col items-center justify-center py-8">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full ${
                  feedback?.correct ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {feedback?.correct ? (
                  <CheckCircle className="h-12 w-12 text-green-500" />
                ) : (
                  <XCircle className="h-12 w-12 text-red-500" />
                )}
              </div>
            </div>

            {/* Feedback Text */}
            <div className="mb-6 rounded-xl bg-white p-6 shadow-md border border-slate-100">
              <h2 className="mb-4 text-lg font-medium text-slate-700">
                {feedback?.status || "Evaluación"}
              </h2>
              <p className="text-slate-600 mb-4">{feedback?.message || ""}</p>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <h3 className="mb-2 text-sm font-medium text-slate-500">
                  Definición correcta:
                </h3>
                <p className="rounded-lg bg-blue-50 p-3 text-slate-700">
                  {currentCard!.card.definition}
                </p>
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <Button
                onClick={nextCard}
                className="rounded-full bg-blue-500 hover:bg-blue-600 px-6 py-2 font-medium text-white flex items-center gap-2"
              >
                Siguiente flashcard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50">
      <NavBar compact />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="mb-4 text-center">
          <p className="text-sm text-slate-500">Flashcard</p>
        </div>

        <div className="w-full max-w-xl">
          <div className="w-full h-48 flex justify-center items-center mb-6">
            <NameCard concept={currentCard!.card.concept} />
          </div>

          {/* Answer Section */}
          <div className="rounded-xl bg-white p-6 shadow-md border border-slate-100">
            <h2 className="mb-4 text-lg font-medium text-slate-500">
              Tu definición:
            </h2>

            <Textarea
              value={userAnswer}
              onChange={handleTextareaChange}
              placeholder="Escribe tu definición aquí..."
              className="mb-4 resize-none rounded-lg border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 min-h-[120px]"
            />
            <Button
              onClick={checkAnswer}
              disabled={!userAnswer.trim() || isLoading}
              className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 py-3 font-medium text-white"
            >
              {isLoading ? "Evaluando..." : "Verificar respuesta"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
