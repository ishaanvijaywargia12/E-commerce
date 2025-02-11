"use client"

import { motion } from "framer-motion"
import { Laptop, Shirt, Home, ClubIcon as Football, Palette, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: "Electronics", icon: Laptop },
  { name: "Clothing", icon: Shirt },
  { name: "Home & Garden", icon: Home },
  { name: "Sports", icon: Football },
  { name: "Beauty", icon: Palette },
  { name: "Books", icon: BookOpen },
]

export default function FeaturedCategories() {
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <motion.div key={category.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <category.icon className="w-12 h-12 mb-2 text-primary" />
                <h3 className="font-medium text-center">{category.name}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

