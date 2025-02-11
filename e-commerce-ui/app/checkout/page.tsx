"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InvoiceItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface Invoice {
  items: InvoiceItem[];
  totalAmount: number;
}

export default function CheckoutPage() {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInvoice() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to proceed with checkout.");
          setLoading(false);
          return;
        }
        const response = await fetch("http://localhost:8080/api/orders/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (response.ok) {
          const data: Invoice = await response.json();
          setInvoice(data);
        } else {
          setError("Failed to generate invoice.");
        }
      } catch (err) {
        console.error("Error generating invoice:", err);
        setError("Error generating invoice.");
      } finally {
        setLoading(false);
      }
    }
    fetchInvoice();
  }, []);

  if (loading) return <div>Loading invoice...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!invoice) return <div>No invoice data</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Invoice</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          {invoice.items.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <div>{item.productName} (x{item.quantity})</div>
              <div>${item.lineTotal.toFixed(2)}</div>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-4">
            <div>Total</div>
            <div>${invoice.totalAmount.toFixed(2)}</div>
          </div>
        </CardContent>
      </Card>
      <Button>Confirm Order</Button>
    </div>
  );
}