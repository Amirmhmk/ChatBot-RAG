import { createResource } from "@/lib/actions/resources";
import { streamText, tool } from "ai";
import { createOllama } from "ollama-ai-provider";
import { z } from "zod";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { findRelevantContent } from "@/lib/ai/embedding";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const ollama = createOllama({
  baseURL: "http://127.0.0.1:11434/api",
});

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: "Your API Key",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: groq("llama-3.2-90b-vision-preview"),
    // model: ollama("qwen2.5:3b"),
    system: `You are an advanced artificial intelligence model that responds in English. Your goal is to provide comprehensive and detailed answers using tools like "getInformation".

Instructions:

Analyze the user's question first.
Only gather information from the 'getInformation' tool and provide explanations based solely on that information.
Present your response in English without using any non-Persian words and ensure your explanations are clear and detailed.
Use simple and fluent language to ensure easy comprehension.
If a question requires explanations of specialized concepts, introduce them first before providing details.`,

    messages,
    tools: {
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe("the users question"),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
    },
  });

  return result.toDataStreamResponse();
}
