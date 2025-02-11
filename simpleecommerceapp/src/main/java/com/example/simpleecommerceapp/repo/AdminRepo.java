package com.example.simpleecommerceapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.simpleecommerceapp.enitity.Admin;

@Repository

public interface AdminRepo extends JpaRepository<Admin,Long>  {

    public Admin findByEmail(String email);
    
}

