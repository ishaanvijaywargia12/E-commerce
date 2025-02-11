package com.example.simpleecommerceapp.dto;

public class InvoiceItemDTO {
    private String productName;
    private int quantity;
    private double unitPrice;
    private double lineTotal;

    // Getters and setters
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public double getUnitPrice() {
        return unitPrice;
    }
    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }
    public double getLineTotal() {
        return lineTotal;
    }
    public void setLineTotal(double lineTotal) {
        this.lineTotal = lineTotal;
    }
}