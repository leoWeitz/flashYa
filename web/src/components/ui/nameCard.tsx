"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface nameCardProps {
  concept: string
  description?: string
}

export function ConceptCard({ concept, description }: nameCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card
        className="relative overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 p-12 min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <h3 className="text-5xl font-semibold text-slate-800 text-center mb-6">{concept}</h3>

        
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="text-slate-600 text-center text-xl max-w-2xl mt-4"
          >
            {description}
          </motion.p>
        

        <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full bg-gradient-to-br from-slate-100 to-slate-200 opacity-50" />
      </Card>
    </motion.div>
  )
}