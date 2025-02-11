"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useCart } from "@/components/cart-provider"

const featuredProducts = [
  { name: "Wireless Earbuds", price: 79.99, rating: 4.5, image: "/placeholder.svg?height=200&width=200&text=Earbuds" },
  { name: "Smart Watch", price: 199.99, rating: 4.7, image: "/placeholder.svg?height=200&width=200&text=Smart+Watch" },
  { name: "4K TV", price: 599.99, rating: 4.8, image: "/placeholder.svg?height=200&width=200&text=4K+TV" },
  { name: "Laptop", price: 999.99, rating: 4.6, image: "/placeholder.svg?height=200&width=200&text=Laptop" },
]

export default function FeaturedProducts() {
  const { addToCart } = useCart()
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-6">Featured Products</h2>
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {featuredProducts.map((product, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card className="m-1">
                  <CardContent className="flex flex-col items-center p-6">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="mb-4 rounded-md"
                    />
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>${product.price.toFixed(2)}</CardDescription>
                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">({product.rating})</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => addToCart(product)}>
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

