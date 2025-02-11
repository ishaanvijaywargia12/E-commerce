package com.example.simpleecommerceapp.repo;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.simpleecommerceapp.enitity.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long>  {
    Optional<Product> findByName(String name);
    List<Product> findByCategory(String category); // New method
}