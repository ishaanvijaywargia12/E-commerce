"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

export default function CartPage() {
  const { cart, fetchCart, addToCart, removeFromCart, getCartTotal } = useCart();

  // Re-fetch the cart items when the component mounts
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardHeader className="flex items-center gap-4">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div>
                    <CardTitle>{item.product.name}</CardTitle>
                    <p className="text-sm">Price: ${item.product.price.toFixed(2)}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      title="Decrease Quantity"
                    >
                      –
                    </Button>
                    <span className="text-lg">{item.quantity}</span>
                    <Button
                      size="sm"
                      onClick={() => addToCart(item.product.id, 1)}
                      title="Increase Quantity"
                    >
                      +
                    </Button>
                  </div>
                  <p className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Order Summary Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/checkout">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}