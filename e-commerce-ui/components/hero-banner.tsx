"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function HeroBanner() {
  return (
    <div className="relative h-[500px] overflow-hidden rounded-lg">
      <Image
        src="/placeholder.svg?height=500&width=1200&text=Summer+Collection"
        alt="Summer Collection"
        layout="fill"
        objectFit="cover"
        className="transition-opacity duration-500"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-4"
          >
            Summer Collection 2023
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl mb-6"
          >
            Discover the latest trends in fashion
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Shop Now
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

