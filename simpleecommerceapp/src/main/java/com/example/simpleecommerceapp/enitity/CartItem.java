package com.example.simpleecommerceapp.enitity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link to product
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    // Link to user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private int quantity;

    // Getters & setters
    public Long getId() {
        return id;
    }
    // ...
    public Product getProduct() {
        return product;
    }
    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() { 
        return user; 
    }
    public void setUser(User user) { 
        this.user = user; 
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}