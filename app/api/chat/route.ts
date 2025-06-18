import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // Validate API key
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error("OpenRouter API key not configured")
      return NextResponse.json({ error: "AI service not configured" }, { status: 500 })
    }

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    // Rate limiting could be added here
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tasfiqulalampabel.vercel.app"

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": siteUrl,
        "X-Title": "Tasfiqul Alam Pabel Portfolio - AI Chatbot",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528",
        messages: messages.slice(-10), // Limit context to last 10 messages
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("OpenRouter API error:", response.status, errorData)

      // Don't expose internal errors to client
      if (response.status === 401) {
        return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
      } else if (response.status === 429) {
        return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
      } else {
        return NextResponse.json({ error: "AI service temporarily unavailable" }, { status: 500 })
      }
    }

    const data = await response.json()

    // Validate response structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Invalid response structure from OpenRouter:", data)
      return NextResponse.json({ error: "Invalid response from AI service" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
