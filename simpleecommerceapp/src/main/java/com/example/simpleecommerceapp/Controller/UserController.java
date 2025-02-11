package com.example.simpleecommerceapp.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.simpleecommerceapp.enitity.User;
import com.example.simpleecommerceapp.service.UserService;
import com.example.simpleecommerceapp.util.JwtUtil;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // CREATE / SIGN-UP
    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        // Do NOT hash here; the service does it already
        User savedUser = userService.createUser(user);

        // Optionally auto-generate a token if you want:
        // String token = jwtUtil.generateToken(savedUser.getEmail());
        // return ResponseEntity.ok(Map.of(
        //     "message", "User registered successfully",
        //     "user", savedUser,
        //     "token", token
        // ));

        // Or if you prefer a manual login step, just return user:
        return ResponseEntity.ok(Map.of(
            "message", "User registered successfully",
            "user", savedUser
        ));
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        // Look up user by email
        User user = userService.findByEmail(email);
        if (user == null) {
            System.out.println("❌ No user found for email: " + email);
            return ResponseEntity.status(404).body(Map.of("error", "Account does not exist"));
        }

        System.out.println("✅ User Found: " + user.getEmail());
        System.out.println("🔐 Stored Hash: " + user.getPassword());
        System.out.println("🔑 Entered Password: " + password);

        // Check password
        boolean isMatch = userService.verifyCredentials(email, password);
        if (!isMatch) {
            System.out.println("❌ Password Mismatch!");
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }

        // Generate token if password matches
        String token = jwtUtil.generateToken(user.getEmail());
        System.out.println("✅ Login Successful! Token generated.");

        return ResponseEntity.ok(Map.of(
            "message", "Login successful",
            "token", token,
            "user", user
        ));
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        User updatedUser = userService.updateUser(user);
        return ResponseEntity.ok(Map.of("message", "User updated successfully", "user", updatedUser));
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }
}