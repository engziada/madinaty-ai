import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { LocaleCode } from "@/types/site";
import { buildSystemInstruction } from "@/data/madinaty-knowledge";

const MODEL_NAME = "gemini-1.5-flash";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { message, history = [], locale = "en" } = body as {
    message?: string;
    history?: { role: string; content: string }[];
    locale?: LocaleCode;
  };

  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
  }

  const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const systemInstruction = buildSystemInstruction(locale);
  const generativeModel = ai.getGenerativeModel({ model: MODEL_NAME, systemInstruction });

  const safeHistory = history
    .filter((entry) => entry.content)
    .slice(-6)
    .map((entry) => ({
      role: entry.role === "ai" ? "assistant" : "user",
      parts: [{ text: entry.content }]
    }));

  try {
    const response = await generativeModel.generateContent({
      contents: [...safeHistory, { role: "user", parts: [{ text: message }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 512, candidateCount: 1 }
    });

    const reply = response.response?.text?.().trim() ?? "";
    const trimmedReply = reply || "I am focused on Madinaty. Try asking about the city.";
    return NextResponse.json({ reply: trimmedReply });
  } catch (error: any) {
    console.error("Gemini chat error:", error?.message || error);
    return NextResponse.json({ reply: "Madinaty Assistant is currently offline." }, { status: 502 });
  }
}
