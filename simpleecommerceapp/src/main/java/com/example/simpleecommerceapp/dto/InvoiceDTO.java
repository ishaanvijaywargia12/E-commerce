package com.example.simpleecommerceapp.dto;

import java.util.List;

public class InvoiceDTO {
    private List<InvoiceItemDTO> items;
    private double totalAmount;

    // Getters and setters
    public List<InvoiceItemDTO> getItems() {
        return items;
    }
    public void setItems(List<InvoiceItemDTO> items) {
        this.items = items;
    }
    public double getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}