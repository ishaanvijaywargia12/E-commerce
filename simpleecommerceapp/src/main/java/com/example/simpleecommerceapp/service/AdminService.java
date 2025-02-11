package com.example.simpleecommerceapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.simpleecommerceapp.enitity.Admin;
import com.example.simpleecommerceapp.repo.AdminRepo;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    // Fetch all admins
    public List<Admin> getAllAdmin() {
        return adminRepo.findAll();
    }

    // Fetch admin by ID
    public Admin getAdminById(Long id) {
        return adminRepo.findById(id).orElseThrow(() -> 
            new RuntimeException("Admin with ID " + id + " not found"));
    }

    public Admin createAdmin(Admin admin) {
        return adminRepo.save(admin);
    }

    public Admin updateAdmin(Admin admin) {
        adminRepo.findById(admin.getId()).orElseThrow(() -> 
            new RuntimeException("Admin with ID " + admin.getId() + " not found"));
        return adminRepo.save(admin);
    }

    // Delete admin by ID
    public void deleteAdmin(Long id) {
        adminRepo.findById(id).orElseThrow(() -> 
            new RuntimeException("Admin with ID " + id + " not found"));
        adminRepo.deleteById(id);
    }

    // Verify admin credentials
    public boolean verifyCredentials(String email, String password) {
        Admin admin = adminRepo.findByEmail(email);
        if (admin != null && admin.getPassword().equals(password)) {
            return true;
        }
        return false;
    }
}