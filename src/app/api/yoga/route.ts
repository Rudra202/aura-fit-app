import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { currentPose, adjustmentRequest } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash"
    });

    const prompt = `
      You are an expert biomechanics and yoga instructor. 
      The user is performing the following pose: "${currentPose}".
      They have the following specific request/limitation: "${adjustmentRequest}".
      
      Generate a customized, alternative yoga posture choice that honors their condition.
      Return EXACTLY a JSON object matching this structure:
      {
        "name": "Name of alternative pose",
        "utility": "Clear explanation of how it accommodates their request.",
        "metrics": "3 sets x 30 second holds"
      }
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    // 🔥 Strip any markdown code blocks
    if (responseText.startsWith("```")) {
      responseText = responseText.replace(/^
```json\s*/i, "").replace(/```$/, "").trim();
    }

    return NextResponse.json(JSON.parse(responseText));
  } catch (error: any) {
    console.error("Yoga API Parsing Error:", error);
    return NextResponse.json({ error: "Failed to read yoga structure signature." }, { status: 500 });
  }
}