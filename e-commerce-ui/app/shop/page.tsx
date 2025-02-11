"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearch } from "@/components/search-provider";
import { useCart } from "@/components/cart-provider";
import { useToast } from "@/components/ui/use-toast";

// 1) A simple Product type for what's returned by your backend
type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string; // optional
};

// 2) CartItem is the same shape as in the cart-provider (optional step):
//    We could import the type from "cart-provider.tsx",
//    but duplicating it here for clarity.
type CartItem = {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

export default function ShopPage() {
  const { searchTerm } = useSearch();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Spring Boot backend
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Filter products based on search term
  // Filter products based on search term
const filteredProducts = products.filter((product) => {
  const productName = product.name ?? "";
  const sTerm = searchTerm ?? "";
  return productName.toLowerCase().includes(sTerm.toLowerCase());
});

  // Handle "Add to Cart"
  const handleAddToCart = (product: Product) => {
    // Build a CartItem from the product + quantity
    const cartItem: CartItem = { ...product, quantity: 1 };
    addToCart(product.id, 1);  // <--- No type error now
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        Loading products...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
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
              <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}