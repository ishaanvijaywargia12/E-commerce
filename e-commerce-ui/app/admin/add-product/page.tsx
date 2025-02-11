"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

const categories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Beauty",
  "Books",
];

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:8080/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
        }),
      });
      if (!res.ok) {
        setError("Failed to add product");
        return;
      }
      setSuccess("Product added successfully!");
      router.push("/shop");
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Error adding product");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-2">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Product Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-1 font-medium">Description</label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block mb-1 font-medium">Price</label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">Add Product</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}