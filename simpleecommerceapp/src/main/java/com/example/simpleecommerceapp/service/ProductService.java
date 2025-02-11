package com.example.simpleecommerceapp.service;

import com.example.simpleecommerceapp.enitity.Product;
import com.example.simpleecommerceapp.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product getProductById(Long id){
        return productRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Product with ID " + id + " not found"));
    }

    public Product createProduct(Product product){
        // Set a default category if none is provided.
        if(product.getCategory() == null || product.getCategory().trim().isEmpty()){
            product.setCategory("Uncategorized");
        }
        return productRepo.save(product);
    }

    public Product updateProduct(Product product){
        productRepo.findById(product.getId())
            .orElseThrow(() -> new RuntimeException("Product with ID " + product.getId() + " not found"));
        // Ensure category is set; if not, default to "Uncategorized"
        if(product.getCategory() == null || product.getCategory().trim().isEmpty()){
            product.setCategory("Uncategorized");
        }
        return productRepo.save(product);
    }

    public Optional<Product> findById(Long id) {
        return productRepo.findById(id);
    }
    
    public void deleteProduct(Long id){
        productRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Product with ID " + id + " not found"));
        productRepo.deleteById(id);
    }

    public Optional<Product> findProductByName(String name) {
        return productRepo.findByName(name);
    }

    // New method to filter products by category
    public List<Product> getProductsByCategory(String category) {
        return productRepo.findByCategory(category);
    }
}