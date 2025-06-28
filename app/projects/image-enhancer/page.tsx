"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Upload, Download, Zap, Eye, EyeOff, Loader2, ImageIcon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface EnhancementOptions {
  upscale: "2x" | "4x"
  deblur: boolean
  noiseReduction: boolean
}

export default function ImageEnhancer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [options, setOptions] = useState<EnhancementOptions>({
    upscale: "2x",
    deblur: true,
    noiseReduction: false,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string)
        setEnhancedImage(null)
        setShowComparison(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const enhanceImage = async () => {
    if (!originalImage) return

    setIsProcessing(true)
    setProgress(0)

    // Simulate AI processing with progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 200)

    try {
      // Simulate API call to AI enhancement service
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // For demo purposes, we'll use the original image as enhanced
      // In a real app, you'd call your AI API here
      setEnhancedImage(originalImage)
      setProgress(100)
      setShowComparison(true)

      setTimeout(() => {
        setIsProcessing(false)
        clearInterval(progressInterval)
      }, 500)
    } catch (error) {
      console.error("Enhancement failed:", error)
      setIsProcessing(false)
      clearInterval(progressInterval)
    }
  }

  const downloadImage = () => {
    if (!enhancedImage) return

    const link = document.createElement("a")
    link.href = enhancedImage
    link.download = "enhanced-image.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!comparisonRef.current) return

    const rect = comparisonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Image Enhancer
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform your images with AI-powered enhancement. Upscale, deblur, and reduce noise with cutting-edge
            technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                Enhancement Options
              </h3>

              {/* Upload Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Upload Image</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                    isDragging ? "border-purple-400 bg-purple-400/10" : "border-gray-600 hover:border-gray-500"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-400">Drag & drop or click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </div>

              {/* Enhancement Options */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Upscaling</label>
                  <div className="flex gap-2">
                    {(["2x", "4x"] as const).map((scale) => (
                      <Button
                        key={scale}
                        variant={options.upscale === scale ? "default" : "outline"}
                        size="sm"
                        onClick={() => setOptions((prev) => ({ ...prev, upscale: scale }))}
                        className={options.upscale === scale ? "bg-purple-600 hover:bg-purple-700" : ""}
                      >
                        {scale}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Deblur/Sharpen</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOptions((prev) => ({ ...prev, deblur: !prev.deblur }))}
                    className={options.deblur ? "bg-purple-600/20 border-purple-500" : ""}
                  >
                    {options.deblur ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Noise Reduction</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOptions((prev) => ({ ...prev, noiseReduction: !prev.noiseReduction }))}
                    className={options.noiseReduction ? "bg-purple-600/20 border-purple-500" : ""}
                  >
                    {options.noiseReduction ? "ON" : "OFF"}
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={enhanceImage}
                  disabled={!originalImage || isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enhancing... {Math.round(progress)}%
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Enhance Image
                    </>
                  )}
                </Button>

                {enhancedImage && (
                  <Button
                    onClick={downloadImage}
                    variant="outline"
                    className="w-full border-green-500 text-green-400 hover:bg-green-500/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Enhanced
                  </Button>
                )}
              </div>

              {/* Progress Bar */}
              {isProcessing && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Processing...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Image Display */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm p-6 h-fit">
              {!originalImage ? (
                <div className="aspect-video bg-gray-700/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-400">Upload an image to get started</p>
                  </div>
                </div>
              ) : showComparison && enhancedImage ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Before vs After</h3>
                    <Button variant="outline" size="sm" onClick={() => setShowComparison(!showComparison)}>
                      {showComparison ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>

                  {/* Slider Comparison */}
                  <div
                    ref={comparisonRef}
                    className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-col-resize"
                    onClick={handleSliderMove}
                  >
                    {/* Original Image */}
                    <img
                      src={originalImage || "/placeholder.svg"}
                      alt="Original"
                      className="absolute inset-0 w-full h-full object-contain"
                    />

                    {/* Enhanced Image with Clip */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                      <img
                        src={enhancedImage || "/placeholder.svg"}
                        alt="Enhanced"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Slider Line */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                      </div>
                    </div>

                    {/* Labels */}
                    <div className="absolute top-4 left-4 bg-black/50 px-2 py-1 rounded text-sm">Original</div>
                    <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-sm">Enhanced</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Original Image</h3>
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={originalImage || "/placeholder.svg"}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
