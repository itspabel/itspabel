import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate data
    const validatedData = contactSchema.parse(body)

    // Mailgun API configuration
    const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY
    const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN

    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
      throw new Error("Mailgun configuration is missing")
    }

    const mailgunUrl = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`

    // Prepare form data for Mailgun API
    const formData = new FormData()
    formData.append("from", `Contact Form <mailgun@${MAILGUN_DOMAIN}>`)
    formData.append("to", "tapabel2021@gmail.com")
    formData.append("subject", `Portfolio Contact: ${validatedData.name}`)
    formData.append(
      "text",
      `
      Name: ${validatedData.name}
      Email: ${validatedData.email}
      
      Message:
      ${validatedData.message}
    `,
    )
    formData.append(
      "html",
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${validatedData.message}</p>
        </div>
      </div>
    `,
    )

    // Send email via Mailgun API
    const response = await fetch(mailgunUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64")}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Mailgun API error:", errorData)
      throw new Error("Failed to send email via Mailgun")
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" })
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error. Please check your inputs.",
          errors: error.errors.map((e) => ({ field: e.path[0], message: e.message })),
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 },
    )
  }
}
