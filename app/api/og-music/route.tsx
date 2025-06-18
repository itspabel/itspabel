import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") || "Unknown Song"
    const artist = searchParams.get("artist") || "Unknown Artist"
    const thumbnail = searchParams.get("thumbnail") || ""

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a2e",
          backgroundImage: "linear-gradient(45deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          position: "relative",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 75% 75%, #ec4899 0%, transparent 50%)",
            opacity: 0.3,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          {/* Music Icon */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "60px",
              background: "linear-gradient(45deg, #7c3aed, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
              boxShadow: "0 20px 40px rgba(124, 58, 237, 0.3)",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "white",
                borderRadius: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ♪
            </div>
          </div>

          {/* Now Playing Badge */}
          <div
            style={{
              background: "rgba(124, 58, 237, 0.2)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              borderRadius: "20px",
              padding: "8px 16px",
              color: "#a78bfa",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            Now Playing
          </div>

          {/* Song Title */}
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "white",
              margin: "0 0 16px 0",
              lineHeight: 1.2,
              maxWidth: "800px",
            }}
          >
            {title}
          </h1>

          {/* Artist Name */}
          <p
            style={{
              fontSize: "32px",
              color: "#d1d5db",
              margin: "0 0 40px 0",
            }}
          >
            {artist}
          </p>

          {/* Branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#9ca3af",
              fontSize: "20px",
            }}
          >
            <span>🎵</span>
            <span>Bangladeshi Music Player</span>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
