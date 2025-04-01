"use client";

import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/nav-bar";
import { Brain, BookOpen, Target, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <NavBar />

      {/* Hero Section */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="mb-6 text-5xl font-bold text-slate-800 tracking-tight">
            Aprende más rápido con{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FlashYa
            </span>
          </h1>
          <p className="mb-8 text-xl text-slate-600 max-w-2xl mx-auto">
            Crea flashcards inteligentes de cualquier tema y practica con nuestro sistema de aprendizaje adaptativo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/create">
              <Button className="gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg">
                Comenzar ahora
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" className="gap-2 px-8 py-6 text-lg">
                Conocer más
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-800">
            ¿Por qué elegir FlashYa?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl bg-white p-6 shadow-md border border-slate-100">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-800">
                Crea flashcards fácilmente
              </h3>
              <p className="text-slate-600">
                Genera flashcards automáticamente a partir de tus apuntes o documentos PDF.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md border border-slate-100">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Target className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-800">
                Aprendizaje adaptativo
              </h3>
              <p className="text-slate-600">
                Nuestro sistema se adapta a tu nivel y te ayuda a mejorar tus puntos débiles.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md border border-slate-100">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Zap className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-800">
                Practica de forma eficiente
              </h3>
              <p className="text-slate-600">
                Optimiza tu tiempo de estudio con un sistema de repaso inteligente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-slate-800">
            ¿Listo para mejorar tu aprendizaje?
          </h2>
          <p className="mb-8 text-xl text-slate-600">
            Comienza a crear tus flashcards ahora y descubre una forma más efectiva de estudiar.
          </p>
          <Link href="/create">
            <Button className="gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg">
              Comenzar gratis
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
} 