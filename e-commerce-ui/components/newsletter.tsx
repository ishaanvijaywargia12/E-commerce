"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Subscribing email:", email)
    toast({
      title: "Subscribed!",
      description: "You've successfully subscribed to our newsletter.",
    })
    setEmail("")
  }

  return (
    <section className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6">Stay updated with our latest offers and products</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-primary-foreground text-primary"
          />
          <Button type="submit" variant="secondary">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}

