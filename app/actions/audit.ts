"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface AuditResult {
    score: number;
    status: "LOCKED" | "RELEASED";
    summary: string;
    details: string[];
}

export async function scanRepository(url: string): Promise<AuditResult> {
    // 1. Mock the file fetching (In a real app, we'd clone the repo)
    // We'll simulate reading a few critical files.
    console.log(`Scanning repository: ${url}`);

    // Simulated file content for the "Mock"
    const mockFileContext = `
    File: app.py
    Content:
    import flask
    from flask import request
    
    app = Flask(__name__)
    
    @app.route('/login', methods=['POST'])
    def login():
        username = request.form['username']
        password = request.form['password']
        # TODO: Fix this later
        if username == 'admin' and password == '123456': 
            return "Welcome"
        return "Error"

    File: .env
    Content:
    AWS_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
    AWS_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
  `;

    try {
        // 2. Analyze with Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
      You are a Cynical CTO and Security Auditor. 
      I am a non-technical founder who paid an agency to write this code.
      Analyze the following code snippets from the repository '${url}'.
      
      Code Snippets:
      ${mockFileContext}
      
      Your Task:
      1. Give a Trust Score between 0 and 100. (0 = Garbage, 100 = Perfect).
      2. If score < 50, status is "LOCKED". If score >= 80, "RELEASED". Else "REVIEW".
      3. Write a harsh, plain-English summary of why it sucks (or is good).
      4. List 3 specific bullet points of what you found.

      Return ONLY valid JSON in this format:
      {
        "score": number,
        "status": "LOCKED" | "RELEASED" | "REVIEW",
        "summary": "string",
        "details": ["string", "string", "string"]
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if Gemini returns them
        const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Audit failed:", error);
        // Fallback if AI fails
        return {
            score: 15,
            status: "LOCKED",
            summary: "Audit Initialized. CRITICAL ERROR: AI Auditor failed to connect. However, based on the file structure alone, this looks suspicious.",
            details: ["AI Service Unavailable", "Code pattern unrecognized", "Manual review recommended"]
        };
    }
}
