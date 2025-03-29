"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { useState } from "react"
import { PlusCircle, Search, MessageSquare, ImageIcon, FileText, MoreHorizontal, ArrowUp } from "lucide-react"

export default function Home() {
  const [content, setContent] = useState("")

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50">
      <NavBar />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-slate-800">¿Con qué quieres practicar hoy?</h1>
          <p className="text-slate-500">Crea flashcards fácilmente de cualquier tema para estudiar mejor</p>
        </div>

        <div className="w-full max-w-2xl mb-6">
          <div className="relative">
            <Textarea
              placeholder="Pega tu texto, apuntes o contenido que quieres convertir en flashcards..."
              className="min-h-[120px] resize-none rounded-xl border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 shadow-sm pr-10 pl-4 py-4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="absolute right-3 bottom-3">
              {/* <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-8 w-8 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <ArrowUp className="h-4 w-4" />
              </Button> */}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 px-1">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-8 w-8 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 w-full max-w-2xl">
          <Link href="/ready" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto rounded-full bg-blue-500 hover:bg-blue-600 px-6 py-2 font-medium text-white">
              Generar Flashcards
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

