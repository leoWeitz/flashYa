// src/actions/openaiActions.ts
"use server";

import OpenAI from "openai";

export async function generateFlashcardsAction(
  userContent: string
): Promise<string> {
  // Make sure your environment variable OPENAI_API_KEY is set in .env.local
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            'Extract key concepts and definitions from the following content and return them as a JSON array in the format [{"concept":"...","definition":"..."},{...}].',
        },
        { role: "user", content: userContent },
      ],
    });
    return response.choices[0].message.content || "";
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return "Error: " + (error.message || "OpenAI request failed");
  }
}
