import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import sgMail from "@sendgrid/mail"

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

    // Set SendGrid API key
    const apiKey = process.env.SENDGRID_API_KEY
    if (!apiKey) {
      throw new Error("SendGrid API key is not configured")
    }

    sgMail.setApiKey(apiKey)

    // Email content
    const msg = {
      to: "tapabel2021@gmail.com",
      from: process.env.SENDGRID_FROM_EMAIL || "noreply@yourdomain.com", // Verified sender email
      subject: `Portfolio Contact: ${validatedData.name}`,
      text: `
        Name: ${validatedData.name}
        Email: ${validatedData.email}
        
        Message:
        ${validatedData.message}
      `,
      html: `
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
    }

    // Send email
    await sgMail.send(msg)

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

    // Check if it's a SendGrid error
    if (error.response && error.response.body) {
      console.error("SendGrid error details:", error.response.body)
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
