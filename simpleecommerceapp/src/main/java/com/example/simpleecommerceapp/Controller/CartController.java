// In com.example.simpleecommerceapp.Controller.CartController.java
package com.example.simpleecommerceapp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.simpleecommerceapp.enitity.CartItem;
import com.example.simpleecommerceapp.enitity.Product;
import com.example.simpleecommerceapp.enitity.User;
import com.example.simpleecommerceapp.service.CartService;
import com.example.simpleecommerceapp.service.ProductService;
import com.example.simpleecommerceapp.service.UserService;
import com.example.simpleecommerceapp.dto.CartRequest;
import com.example.simpleecommerceapp.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartRequest cartRequest, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("No or invalid token");
        }
        String token = authHeader.substring(7);
        String email;
        try {
            email = jwtUtil.extractEmail(token);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid token");
        }
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        Product product = productService.findById(cartRequest.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        CartItem cartItem = cartService.addToCart(user, product, cartRequest.getQuantity());
        return ResponseEntity.ok(cartItem);
    }

    @GetMapping
    public ResponseEntity<?> getCartItems(HttpServletRequest request) {
        String token = parseToken(request);
        if (token == null) {
            return ResponseEntity.status(401).body("No or invalid token");
        }
        String email = parseEmail(token);
        if (email == null) {
            return ResponseEntity.status(401).body("Invalid token");
        }
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        List<CartItem> items = cartService.getCartItems(user);
        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeCartItem(@PathVariable Long id, HttpServletRequest request) {
        String token = parseToken(request);
        if (token == null) {
            return ResponseEntity.status(401).body("No or invalid token");
        }
        String email = parseEmail(token);
        if (email == null) {
            return ResponseEntity.status(401).body("Invalid token");
        }
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        cartService.removeCartItem(user, id);
        return ResponseEntity.ok("Cart item updated successfully");
    }

    // New endpoint to completely remove an item
    @DeleteMapping("/{id}/clear")
    public ResponseEntity<?> clearCartItem(@PathVariable Long id, HttpServletRequest request) {
        String token = parseToken(request);
        if (token == null) {
            return ResponseEntity.status(401).body("No or invalid token");
        }
        String email = parseEmail(token);
        if (email == null) {
            return ResponseEntity.status(401).body("Invalid token");
        }
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        cartService.clearCartItem(user, id);
        return ResponseEntity.ok("Cart item removed completely");
    }

    // Helper methods
    private String parseToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
    private String parseEmail(String token) {
        try {
            return jwtUtil.extractEmail(token);
        } catch (Exception e) {
            return null;
        }
    }
}