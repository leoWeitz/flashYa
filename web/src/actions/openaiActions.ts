// src/actions/openaiActions.ts
"use server";

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

enum rigss {
  MODERATE = "Acepta como correcto si la respuesta capta la idea general, aunque no sea exacta.",
  PRECISE = "Acepta como correcto si la respuesta incluye los conceptos clave de la definición.",
  STRICT = "Acepta como correcto solo si la respuesta expresa todos los aspectos con la definición dada.",
}

export async function generateFlashcardsAction(
  userContent: string,
  generateContent: string
): Promise<string> {
  // Make sure your environment variable OPENAI_API_KEY is set in .env.local
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You have a very specific and structured task. Extract key concepts and definitions from the following content and return them as a JSON array in the format [{"concept":"...","definition":"..."},{...}]
            
            Rules:
            - Only return the JSON array, no other text or formatting.
            - The JSON array should be valid JSON.
            - The JSON array should be in the format [{"concept":"...","definition":"..."},{...}]
            - You absolutely ${generateContent} add information to the flashcards that is not in the content provided.
              `,
        },
        { role: "user", content: userContent },
      ],
    });
    return response.choices[0].message.content || "";
  } catch (error: any) {
    return "Open AI request failed";
  }
}

export async function evaluateAnswer(
  correctDefinition: string,
  userAnswer: string,
  rigorousness: rigss
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a strict but fair evaluator of definitions. Given a correct definition and a user’s answer, return a structured evaluation in the following format: "digit;word;opinion".
          You have to check if the user answer is similar in concept to the correct definition, if the user's answer is only the word that the definition corresponds to, you should return an incorrect evaluation.
          For evaluating the answer, you should use the following criteria:
          - ${rigorousness}
          
Rules:
- If the answer is meets the criteria, for example, return: "0;Correcto(or synonyms);*Positive feedback and brief congratulations*"
- If the answer is doesnt meet the crieria at all, for example, return: "1;Incorrecto(or synonyms);*Brief explanation of why it's wrong and why*"
- If the answer is close to the criteria but not fully meeting it, for example return: "2;Casi(or synonyms);*Explain what was close and what needs improvement*"


Only return the formatted response with no extra text. The words and explanations of the response have to be in Spanish.`,
        },
        {
          role: "user",
          content: `Correct Definition: ${correctDefinition}\nUser Answer: ${userAnswer}`,
        },
      ],
    });

    return response.choices[0].message.content || "Error: No response from AI";
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return "Error: " + (error.message || "OpenAI request failed");
  }
}
