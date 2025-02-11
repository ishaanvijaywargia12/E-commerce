package com.example.simpleecommerceapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.simpleecommerceapp.enitity.Order;
import com.example.simpleecommerceapp.enitity.User;
import com.example.simpleecommerceapp.repo.OrderRepo;

@Service
public class OrderService {
    @Autowired
    private OrderRepo orderRepo;

    public List<Order> getAllOrder(){
        return orderRepo.findAll();
    }

    public Order getOrderById(Long id){
        return orderRepo.findById(id).orElseThrow(()-> new RuntimeException("Order with ID " + id + " not found"));
    }

    public Order createOrder(Order order){
        return orderRepo.save(order);
    }

    public void updateOrder(Order order){
        orderRepo.findById(order.getId()).orElseThrow(()-> new RuntimeException("Order with ID " + order.getId() + " not found"));
        orderRepo.save(order);
    }

    public void deleteOrder(Long id){
        orderRepo.findById(id).orElseThrow(()-> new RuntimeException("Order with ID " + id + " not found"));
        orderRepo.deleteById(id);
    }

    public List<Order> findOrdersByUser(User user){
        return orderRepo.findByUser(user);
    }
}
