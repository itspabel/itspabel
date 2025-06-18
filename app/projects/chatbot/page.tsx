"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Loader2, Trash2, Copy, Check, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm an AI assistant powered by DeepSeek. I'm here to help answer your questions, have conversations, or assist with various tasks. What would you like to talk about today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.choices[0].message.content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm an AI assistant powered by DeepSeek. I'm here to help answer your questions, have conversations, or assist with various tasks. What would you like to talk about today?",
        timestamp: new Date(),
      },
    ])
  }

  const copyMessage = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error("Failed to copy message:", error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI Powered
            </Badge>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              AI Chatbot
            </h1>
            <p className="text-muted-foreground">Powered by DeepSeek R1 - Experience intelligent conversations</p>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-[600px] flex flex-col shadow-xl border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <Bot className="h-6 w-6 text-secondary" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
                AI Assistant
              </CardTitle>
              <Button variant="outline" size="sm" onClick={clearChat} className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
            </CardHeader>

            <Separator />

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8 border-2 border-secondary/20">
                            <AvatarFallback className="bg-secondary/10">
                              <Bot className="h-4 w-4 text-secondary" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={cn(
                            "group relative max-w-[80%] rounded-lg px-4 py-3 text-sm",
                            message.role === "user" ? "bg-secondary text-secondary-foreground ml-12" : "bg-muted",
                          )}
                        >
                          <div className="whitespace-pre-wrap break-words">{message.content}</div>

                          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                              onClick={() => copyMessage(message.content, message.id)}
                            >
                              {copiedId === message.id ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {message.role === "user" && (
                          <Avatar className="h-8 w-8 border-2 border-primary/20">
                            <AvatarImage src="https://cdn.jsdelivr.net/gh/itspabel/Images/Pabel.jpg" />
                            <AvatarFallback className="bg-primary/10">
                              <User className="h-4 w-4 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isLoading && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                      <Avatar className="h-8 w-8 border-2 border-secondary/20">
                        <AvatarFallback className="bg-secondary/10">
                          <Bot className="h-4 w-4 text-secondary" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg px-4 py-3">
                        <div className="flex items-center gap-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              <Separator />

              {/* Input */}
              <div className="p-4">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!input.trim() || isLoading} size="icon" className="shrink-0">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-0">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-secondary" />
              <h3 className="font-medium">Intelligent Responses</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by DeepSeek R1 for thoughtful and contextual conversations
            </p>
          </Card>

          <Card className="p-4 bg-card/50 backdrop-blur-sm border-0">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-4 w-4 text-secondary" />
              <h3 className="font-medium">Real-time Chat</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Instant responses with typing indicators and smooth animations
            </p>
          </Card>

          <Card className="p-4 bg-card/50 backdrop-blur-sm border-0">
            <div className="flex items-center gap-2 mb-2">
              <Copy className="h-4 w-4 text-secondary" />
              <h3 className="font-medium">Easy to Use</h3>
            </div>
            <p className="text-sm text-muted-foreground">Copy messages, clear chat, and intuitive keyboard shortcuts</p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
