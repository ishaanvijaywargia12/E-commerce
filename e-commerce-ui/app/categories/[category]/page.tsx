"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
}

export default function CategoryPage() {
  // Get the dynamic parameter 'category' from the URL.
  const { category } = useParams() as { category: string };

  // Decode the category to display it correctly.
  const decodedCategory = decodeURIComponent(category);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductsByCategory() {
      try {
        // Use the decodedCategory in the fetch URL.
        const res = await fetch(`http://localhost:8080/api/products/category/${decodedCategory}`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductsByCategory();
  }, [decodedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{decodedCategory} Products</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>{product.name}</CardTitle>
                <p>${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <div className="mt-8">
        <Link href="/categories">
          <Button variant="outline">Back to Categories</Button>
        </Link>
      </div>
    </div>
  );
}