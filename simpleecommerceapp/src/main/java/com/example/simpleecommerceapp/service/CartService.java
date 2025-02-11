package com.example.simpleecommerceapp.service;

import com.example.simpleecommerceapp.enitity.CartItem;
import com.example.simpleecommerceapp.enitity.Product;
import com.example.simpleecommerceapp.enitity.User;
import com.example.simpleecommerceapp.repo.CartItemRepo;
import com.example.simpleecommerceapp.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartItemRepo cartItemRepo;

    @Autowired
    private ProductRepo productRepo;

    /**
     * Add (or increment) a product to the user's cart.
     */
    public CartItem addToCart(User user, Product product, int quantity) {
        if (product == null) {
            throw new RuntimeException("Product not found");
        }
        // If this user already has the product in their cart, increment quantity
        CartItem cartItem = cartItemRepo.findByUserAndProduct(user, product)
                .orElse(new CartItem());

        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(cartItem.getQuantity() + quantity);

        return cartItemRepo.save(cartItem);
    }

    /**
     * Get all cart items for this user.
     */
    public List<CartItem> getCartItems(User user) {
        return cartItemRepo.findByUser(user);
    }

    /**
     * Remove a cart item by decrementing its quantity by one.
     * If the quantity becomes zero, the item is removed.
     */
    public void removeCartItem(User user, Long cartItemId) {
        CartItem cartItem = cartItemRepo.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You do not own this cart item.");
        }

        if (cartItem.getQuantity() > 1) {
            cartItem.setQuantity(cartItem.getQuantity() - 1);
            cartItemRepo.save(cartItem);
        } else {
            cartItemRepo.delete(cartItem);
        }
    }

    /**
     * Completely remove a cart item, regardless of quantity.
     */
    public void clearCartItem(User user, Long cartItemId) {
        CartItem cartItem = cartItemRepo.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You do not own this cart item.");
        }

        cartItemRepo.delete(cartItem);
    }

    /**
     * Calculate total cost for this user's cart.
     */
    public double calculateCartTotal(User user) {
        List<CartItem> items = cartItemRepo.findByUser(user);
        return items.stream()
                .mapToDouble(item -> item.getQuantity() * item.getProduct().getPrice())
                .sum();
    }
}