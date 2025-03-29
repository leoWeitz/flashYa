"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { useState, useRef } from "react"
import { PlusCircle, Search, MessageSquare, ImageIcon, FileText, MoreHorizontal, ArrowUp, Paperclip, X, FileText as PdfIcon } from "lucide-react"

export default function Home() {
  const [content, setContent] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setPdfFile(files[0])
      const url = URL.createObjectURL(files[0])
      setPdfUrl(url)
      setContent(`PDF file: ${files[0].name}`)
    } else {
      setContent('Please drop a PDF file.')
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0 && files[0].type === 'application/pdf') {
      setPdfFile(files[0])
      const url = URL.createObjectURL(files[0])
      setPdfUrl(url)
      setContent(`PDF file: ${files[0].name}`)
    } else {
      setContent('Please select a PDF file.')
    }
  }

  const handleRemovePdf = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
    }
    setPdfFile(null)
    setPdfUrl(null)
    setContent("")
  }

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
            <div 
              className={`relative rounded-xl border-2 border-dashed transition-colors ${
                isDragging 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-slate-200 bg-white'
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
                    placeholder="Pega tu texto, apuntes o contenido que quieres convertir en flashcards... O arrastra un archivo PDF aquí"
                    className="min-h-[120px] resize-none rounded-xl border-none bg-transparent text-slate-800 placeholder:text-slate-400 focus:ring-0 shadow-sm pr-10 pl-4 py-4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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

