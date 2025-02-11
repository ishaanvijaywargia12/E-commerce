package com.example.simpleecommerceapp.Controller;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// import com.example.simpleecommerceapp.service.ProductService;

@RestController
@RequestMapping("/api")
public class HomeController {

    // @Autowired
    // private ProductService productService;

    @GetMapping("/home")
    public String homePage() {
        return "Welcome to the Home Page";
    }

    @GetMapping("/contact")
    public String contactPage() {
        return "Contact us at support@example.com";
    }

    @GetMapping("/aboutUs")
    public String aboutUs() {
        return "About us page";
    }
}