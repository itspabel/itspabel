import { Loader2 } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-secondary" />
        <p className="mt-4 text-lg font-medium">Loading...</p>
      </div>
    </div>
  )
}
