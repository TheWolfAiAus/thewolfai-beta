import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server configuration error: OpenAI API key not found." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0]?.message?.content;

    if (reply) {
      return NextResponse.json({ reply });
    } else {
      return NextResponse.json(
        { error: "Failed to get a response from the model." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in OpenAI API route:", error);
    // Check if the error is an APIError and provide more specific feedback
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.message}` },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
