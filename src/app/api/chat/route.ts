import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: "API Key missing from environment setup." }, { status: 500 });
  }

  try {
    const { message, contextType, currentExercise } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let prompt = "";

    if (contextType === "exercise-swap") {
      prompt = 'You are an elite bodybuilding coach. Provide a single alternative option for: "' + currentExercise + '" based on: "' + message + '". Return EXACTLY a raw JSON object string matching this exact shape: { "name": "Exercise Name", "utility": "Brief benefit summary.", "sets": "4 Sets x 12 Reps" }';
    } else if (contextType === "atlas-load") {
      prompt = 'You are an elite kinesiologist. Generate exactly 7 exercises for this body part: "' + message + '". Return EXACTLY a raw JSON array string matching this exact shape: [ { "id": "ex1", "name": "Exercise Name", "utility": "Targeted muscle benefit description.", "sets": "4 Sets x 10 Reps" } ]';
    } else {
      prompt = 'You are AuraFit AI, an elite health coach. Respond concisely to the user input: "' + message + '"';
    }

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    let responseText = result.response.text().trim();

    // Safe cleaning loop that strips out code block notation markers cleanly
    if (responseText.includes("json")) {
      const splitLines = responseText.split("\n");
      // Remove open marker line if it exists
      if (splitLines[0].includes("json") || splitLines[0].includes("`")) {
        splitLines.shift();
      }
      // Remove close marker line if it exists
      if (splitLines.length > 0 && splitLines[splitLines.length - 1].includes("`")) {
        splitLines.pop();
      }
      responseText = splitLines.join("\n").trim();
    } else if (responseText.startsWith("`")) {
      responseText = responseText.replace(/`/g, "").trim();
    }

    const finalPayload = (contextType === "exercise-swap" || contextType === "atlas-load") 
      ? JSON.parse(responseText) 
      : responseText;

    return NextResponse.json({ reply: finalPayload });
  } catch (error: any) {
    console.error("Internal API Error:", error);
    return NextResponse.json({ error: "Failed to process AI model request." }, { status: 500 });
  }
}