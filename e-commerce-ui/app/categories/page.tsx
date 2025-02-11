"use client";

import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the six categories (plus add "Uncategorized" if desired)
const categories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Beauty",
  "Books",
  "Uncategorized",
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          // Remove manual encoding – Next.js will encode the URL correctly.
          <Link key={cat} href={`/categories/${cat}`}>
            <Card className="cursor-pointer hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{cat}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Explore {cat} products</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}