"use client";


// app/page.tsx
import { generateFlashcardsAction } from "@/actions/openaiActions";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { useState } from "react"
import { PlusCircle, Search, MessageSquare, ImageIcon, FileText, MoreHorizontal, ArrowUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"


function FlashcardForm() {
  const [result, setResult] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();


  async function handleSubmit(formData: FormData) {
    const userContent = formData.get("userContent") as string;
    const res = await generateFlashcardsAction(userContent);
    if (res.includes("failed")) {
      toast({
        variant: "destructive",
        title: "Error",
        description: res,
      });
    } else {
      setResult(res);
      router.push("/ready");
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50">
      <NavBar />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-slate-800">¿Con qué quieres practicar hoy?</h1>
          <p className="text-slate-500">Crea flashcards fácilmente de cualquier tema para estudiar mejor</p>
        </div>
        <form action={handleSubmit} className="w-full max-w-2xl">
          <div className="w-full mb-6">
            <div className="relative w-full">
              <Textarea
                name="userContent"
                placeholder="Pega tu texto o apuntes aquí..."
                className="w-full min-h-[120px] resize-none rounded-xl border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 shadow-sm pr-10 pl-4 py-4" />
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
          <div className="flex flex-wrap justify-center gap-3 w-full">
            <Button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-blue-500 hover:bg-blue-600 px-6 py-2 font-medium text-white"
            >
              Generar Flashcards
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default function Home() {
  return <FlashcardForm />;
}
