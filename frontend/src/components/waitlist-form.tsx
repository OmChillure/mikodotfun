"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const joinWaitlist = async (data : any) => {
  const response = await fetch("/api/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name.trim(),
      email: data.email.trim(),
      twitter: data.twitter.trim()
    }),
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.message || "Something went wrong")
  }

  return responseData
}

const validateForm = (form : any) => {
  if (!form.name.trim()) {
    return "Name is required"
  }
  
  if (!form.email.trim()) {
    return "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return "Please enter a valid email"
  }
  
  if (form.twitter && !form.twitter.startsWith('@')) {
    return "Twitter handle should start with @"
  }
  
  return null
}

export function WaitlistForm({ onSuccess } : any) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    twitter: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e : any) => {
    e.preventDefault()

    const validationError = validateForm(form)
    if (validationError) {
      toast.error(validationError)
      return
    }

    setIsLoading(true)
    try {
      const data = await joinWaitlist(form)
      
      toast.success(data.message || "Successfully joined the waitlist!")

      if (data.count && onSuccess) {
        onSuccess(data.count)
      }

      setForm({ name: "", email: "", twitter: "" })
      setIsModalOpen(false)
    } catch (error) {
      console.error("Waitlist error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to join waitlist")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-black hover:bg-gray-200 font-semibold px-5 py-3 rounded-xl transition-colors"
      >
        Join Waitlist
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative bg-black border border-white/10 rounded-lg p-6 w-full max-w-md mx-4 text-white">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white mb-2">Join the waitlist</h2>
              <p className="text-gray-400 text-sm">
                Enter your details below to join our waitlist.
              </p>
            </div>



            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ada Lovelace"
                  disabled={isLoading}
                  className="w-full px-3 py-2 bg-neutral-900 text-white placeholder:text-neutral-400 border border-neutral-800 rounded-md focus:ring-2 focus:ring-white/20 focus:border-transparent disabled:opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="ada@example.com"
                  disabled={isLoading}
                  className="w-full px-3 py-2 bg-neutral-900 text-white placeholder:text-neutral-400 border border-neutral-800 rounded-md focus:ring-2 focus:ring-white/20 focus:border-transparent disabled:opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="twitter" className="block text-sm font-medium mb-2">
                  Twitter handle (optional)
                </label>
                <input
                  id="twitter"
                  type="text"
                  value={form.twitter}
                  onChange={(e) => handleInputChange("twitter", e.target.value)}
                  placeholder="@ada"
                  disabled={isLoading}
                  className="w-full px-3 py-2 bg-neutral-900 text-white placeholder:text-neutral-400 border border-neutral-800 rounded-md focus:ring-2 focus:ring-white/20 focus:border-transparent disabled:opacity-50"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 text-white hover:bg-white/5 border border-neutral-700 rounded-md transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-white text-black hover:bg-gray-200 font-semibold rounded-md transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Join Waitlist"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}