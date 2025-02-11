package com.example.simpleecommerceapp.Controller;

import com.example.simpleecommerceapp.dto.InvoiceDTO;
import com.example.simpleecommerceapp.dto.InvoiceItemDTO;
import com.example.simpleecommerceapp.enitity.CartItem;
import com.example.simpleecommerceapp.enitity.Order;
import com.example.simpleecommerceapp.enitity.User;
import com.example.simpleecommerceapp.service.CartService;
import com.example.simpleecommerceapp.service.OrderService;
import com.example.simpleecommerceapp.service.UserService;
import com.example.simpleecommerceapp.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService; // Added to retrieve cart items

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Place an order for the currently logged-in user.
     */
    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody Order order, HttpServletRequest request) {
        // 1) Extract token from Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No token provided");
        }
        String token = authHeader.substring(7);

        // 2) Parse the email from the token
        String email;
        try {
            email = jwtUtil.extractEmail(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        // 3) Find user by that email
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found for email: " + email);
        }

        // 4) Link order to that user
        order.setUser(user);

        // 5) Calculate total, set date, then create order
        double totalAmount = order.getPrice() * order.getQuantity();
        order.setAmount(totalAmount);
        order.setDate(new Date());

        Order savedOrder = orderService.createOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

    /**
     * Return all orders belonging to the currently logged-in user.
     */
    @GetMapping("/myOrders")
    public ResponseEntity<?> getMyOrders(HttpServletRequest request) {
        // 1) Extract token
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No token provided");
        }
        String token = authHeader.substring(7);

        // 2) Parse email from token
        String email;
        try {
            email = jwtUtil.extractEmail(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        // 3) Find the user
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found for email: " + email);
        }

        // 4) Grab only that user's orders
        List<Order> userOrders = orderService.findOrdersByUser(user);
        return ResponseEntity.ok(userOrders);
    }

    /**
     * Checkout endpoint that generates an invoice from the user's current cart.
     */
    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(HttpServletRequest request) {
        // 1) Extract token
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No token provided");
        }
        String token = authHeader.substring(7);

        // 2) Parse email from token
        String email;
        try {
            email = jwtUtil.extractEmail(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        // 3) Find user by email
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found for email: " + email);
        }

        // 4) Retrieve cart items for the user
        List<CartItem> cartItems = cartService.getCartItems(user);
        if (cartItems.isEmpty()) {
            return ResponseEntity.badRequest().body("Cart is empty");
        }

        // 5) Build the invoice items list
        List<InvoiceItemDTO> invoiceItems = cartItems.stream().map(cartItem -> {
            InvoiceItemDTO item = new InvoiceItemDTO();
            item.setProductName(cartItem.getProduct().getName());
            item.setQuantity(cartItem.getQuantity());
            item.setUnitPrice(cartItem.getProduct().getPrice());
            item.setLineTotal(cartItem.getQuantity() * cartItem.getProduct().getPrice());
            return item;
        }).collect(Collectors.toList());

        // 6) Calculate total amount
        double totalAmount = invoiceItems.stream().mapToDouble(InvoiceItemDTO::getLineTotal).sum();

        // 7) Create the invoice DTO
        InvoiceDTO invoice = new InvoiceDTO();
        invoice.setItems(invoiceItems);
        invoice.setTotalAmount(totalAmount);

        return ResponseEntity.ok(invoice);
    }
}