package com.example.simpleecommerceapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.simpleecommerceapp.enitity.CartItem;
import com.example.simpleecommerceapp.enitity.Product;
import com.example.simpleecommerceapp.enitity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem, Long> {
    
    Optional<CartItem> findByUserAndProduct(User user, Product product);
    
    List<CartItem> findByUser(User user);
}