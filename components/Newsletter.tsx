"use client"

import { useState } from "react"
import { toast } from "react-toastify"

const NewsletterSignup = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
        toast.warn("Please enter your email address")
      return
    }

    if (!isValidEmail(email)) {
        toast.warn("Please enter a valid email address")
      return
    }

    setStatus("loading")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Thank you for subscribing! Check your email for confirmation.")
      setEmail("")
    } catch (error) {
        toast.error("Something went wrong. Please try again.")
    }
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <div className="p-8 bg-gray-200 dark:bg-black font-outfit">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Stay Updated</h2>
        <p className="text-muted-foreground">
          Subscribe to our newsletter for the latest property updates and market insights from Wephco.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="col-span-1 md:col-span-2">
                <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            disabled={status === "loading"}
          /> 
            </div>
            <div className="col-span-1 flex flex-col items-center md:flex-row md:justify-center">
                <button
          type="submit"
          disabled={status === "loading"}
          className=" bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === "loading" ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
              Subscribing...
            </div>
          ) : (
            "Subscribe"
          )}
        </button>
            </div>
        </div>
      </form>

      <p className="text-xs text-muted-foreground text-center mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  )
}

export { NewsletterSignup }