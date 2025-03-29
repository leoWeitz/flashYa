
// src/actions/openaiActions.ts
"use server";

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateFlashcardsAction(
  userContent: string
): Promise<string> {
  // Make sure your environment variable OPENAI_API_KEY is set in .env.local
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
    return "Open AI request failed";
  }
}


export async function evaluateAnswer(
  correctDefinition: string,
  userAnswer: string
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a strict but fair evaluator of definitions. Given a correct definition and a user’s answer, return a structured evaluation in the following format: "digit;word;opinion".

Rules:
- If the answer is completely correct, for example, return: "0;Correct(or sinonims);*Positive feedback and brief congratulations*"
- If the answer is completely wrong, for example, return: "1;Incorrect(or sinonims);*Brief explanation of why it's wrong and why*"
- If the answer is close but not quite right, for example return: "2;Almost(or sinonims);*Explain what was close and what needs improvement*"


Only return the formatted response with no extra text.`,
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
