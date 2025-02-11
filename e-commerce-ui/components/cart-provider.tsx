"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
  };
};

type CartContextType = {
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCartItem: (cartItemId: number) => Promise<void>;
  getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  function getToken() {
    return localStorage.getItem("token");
  }

  const fetchCart = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.warn("No token found. User might not be logged in.");
        return;
      }
      const res = await fetch("http://localhost:8080/api/cart", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) {
        console.error("Failed to fetch cart:", res.status);
        return;
      }
      const data: CartItem[] = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please log in first to add items to cart");
        return;
      }
      const payload = { product: { id: productId }, quantity };
      const res = await fetch("http://localhost:8080/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("Failed to add cart item:", res.status);
        return;
      }
      await fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please log in first");
        return;
      }
      const res = await fetch(`http://localhost:8080/api/cart/${cartItemId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) {
        console.error("Failed to remove cart item:", res.status);
        return;
      }
      await fetchCart();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const clearCartItem = async (cartItemId: number) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please log in first");
        return;
      }
      const res = await fetch(`http://localhost:8080/api/cart/${cartItemId}/clear`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) {
        console.error("Failed to clear cart item:", res.status);
        return;
      }
      await fetchCart();
    } catch (error) {
      console.error("Error clearing cart item:", error);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, clearCartItem, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};