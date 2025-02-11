package com.example.simpleecommerceapp.dto;

import com.example.simpleecommerceapp.enitity.Product;

public class CartRequest {
    private Product product;
    private int quantity;

    // Getters and Setters
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}