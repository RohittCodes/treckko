import {
    CopilotRuntime,
    GroqAdapter,
    copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }) as any;

const copilotKit = new CopilotRuntime();

const serviceAdapter = new GroqAdapter({ groq, model: "llama3-groq-8b-8192-tool-use-preview" });

export const POST = async (req: NextRequest) => {
    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
        runtime: copilotKit,
        serviceAdapter,
        endpoint: "/api/copilot",
    });

    return handleRequest(req);
};