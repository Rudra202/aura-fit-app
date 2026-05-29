import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: "API Key missing from environment setup." }, { status: 500 });
  }

  try {
    const { currentPose, adjustmentRequest } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = 'You are an expert yoga instructor. Provide a single modification for: "' + currentPose + '" based on: "' + adjustmentRequest + '". Return a raw JSON object matching this exact shape: { "name": "Pose Name", "utility": "Benefit summary.", "metrics": "Hold 30s" }';

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    let responseText = result.response.text().trim();

    if (responseText.includes("json")) {
      const splitLines = responseText.split("\n");
      if (splitLines[0].includes("json") || splitLines[0].includes("`")) {
        splitLines.shift();
      }
      if (splitLines.length > 0 && splitLines[splitLines.length - 1].includes("`")) {
        splitLines.pop();
      }
      responseText = splitLines.join("\n").trim();
    }

    return NextResponse.json(JSON.parse(responseText));
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to process yoga model request." }, { status: 500 });
  }
}