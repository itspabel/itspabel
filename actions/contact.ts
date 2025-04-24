"use server"

import { z } from "zod"
import nodemailer from "nodemailer"

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type ContactFormData = z.infer<typeof contactSchema>

export async function sendContactEmail(formData: FormData) {
  try {
    // Extract and validate form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    const validatedData = contactSchema.parse({
      name,
      email,
      message,
    })

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        pass: process.env.EMAIL_PASS || "your-app-password",
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: "tapabel2021@gmail.com",
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
    await transporter.sendMail(mailOptions)

    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation error. Please check your inputs.",
        errors: error.errors.map((e) => ({ field: e.path[0], message: e.message })),
      }
    }

    return { success: false, message: "Failed to send message. Please try again later." }
  }
}
