package com.example.simpleecommerceapp.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.simpleecommerceapp.enitity.Admin;
import com.example.simpleecommerceapp.service.AdminService;
import com.example.simpleecommerceapp.service.OrderService;
import com.example.simpleecommerceapp.service.ProductService;
import com.example.simpleecommerceapp.service.UserService;
import com.example.simpleecommerceapp.util.JwtUtil;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/verifyCredentials")
    public Map<String, String> verifyCredentials(@RequestBody Admin admin) {
        Map<String, String> response = new HashMap<>();
        if (adminService.verifyCredentials(admin.getEmail(), admin.getPassword())) {
            String token = jwtUtil.generateToken(admin.getEmail());
            response.put("message", "Login successful");
            response.put("token", token);
        } else {
            response.put("error", "Invalid E-mail or password");
        }
        return response;
    }

    @GetMapping("/home")
    public Map<String, Object> adminHomePage() {
        Map<String, Object> response = new HashMap<>();
        response.put("adminList", adminService.getAllAdmin());
        response.put("userList", userService.getAllUsers());
        response.put("orderList", orderService.getAllOrder());
        response.put("productList", productService.getAllProducts());
        return response;
    }

    @PostMapping("/add")
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.createAdmin(admin);
    }

    @PutMapping("/update/{id}")
    public Admin updateAdmin(@PathVariable Long id, @RequestBody Admin admin) {
        admin.setId(id);
        return adminService.updateAdmin(admin);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return "Admin deleted successfully";
    }
}