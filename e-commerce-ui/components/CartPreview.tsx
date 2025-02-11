"use client";

import React from "react";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CartPreview() {
  const { cart, addToCart, removeFromCart, clearCartItem } = useCart();
  const pathname = usePathname();

  // Hide preview on cart page.
  if (pathname === "/cart") return null;
  if (!cart || cart.length === 0) return null;

  const sortedCart = [...cart].sort((a, b) => b.id - a.id);
  const recentItems = sortedCart.slice(0, 3);

  return (
    <div className="fixed bottom-4 right-4 bg-background dark:bg-background shadow-lg rounded-lg p-4 z-50 w-80 h-64 overflow-auto border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-bold mb-2 text-foreground">Recent Cart Items</h2>
      {recentItems.map((item) => (
        <div key={item.id} className="border-b border-gray-200 dark:border-gray-700 py-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-foreground">{item.product.name}</p>
              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              <p className="text-sm text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <Button size="sm" onClick={() => addToCart(item.product.id, 1)} title="Increase Quantity">
                +
              </Button>
              <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)} title="Decrease Quantity">
                –
              </Button>
              <Button size="sm" variant="destructive" onClick={() => clearCartItem(item.id)} title="Remove Item Completely">
                Remove
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-2">
        <Link href="/cart">
          <Button variant="outline" className="w-full">
            View Cart
          </Button>
        </Link>
      </div>
    </div>
  );
}