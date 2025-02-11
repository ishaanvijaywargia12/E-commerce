package com.example.simpleecommerceapp.service;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.simpleecommerceapp.enitity.User;
import com.example.simpleecommerceapp.repo.UserRepo;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Returns all users in the database.
     */
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    /**
     * Returns a single user by ID, or throws if not found.
     */
    public User getUserById(Long id) {
        return userRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found"));
    }

    /**
     * Creates a new user, hashing their password before saving.
     */
    public User createUser(User user) {
        // Hash the password exactly once here
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    /**
     * Updates the user's record. If the password is changed, it should be re-hashed.
     */
    public User updateUser(User user) {
        if (!userRepo.existsById(user.getId())) {
            throw new RuntimeException("User with ID " + user.getId() + " not found");
        }
        // If the password changed, re-hash it:
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    /**
     * Deletes the user by ID.
     */
    public void deleteUser(Long id) {
        if (!userRepo.existsById(id)) {
            throw new RuntimeException("User with ID " + id + " not found");
        }
        userRepo.deleteById(id);
    }

    /**
     * Finds a user by email, or returns null if no user is found.
     */
    public User findByEmail(String email) {
        Optional<User> optionalUser = userRepo.findByEmail(email);
        return optionalUser.orElse(null);
    }

    /**
     * Verifies whether the given plain password matches the stored hash for this email.
     */
    public boolean verifyCredentials(String email, String plainPassword) {
        User user = findByEmail(email);
        if (user == null) {
            return false;
        }
        return passwordEncoder.matches(plainPassword, user.getPassword());
    }
    
    /**
     * Loads a user by email for Spring Security.
     * This method is required so that the JwtAuthenticationFilter can retrieve a valid UserDetails instance.
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User appUser = findByEmail(email);
        if (appUser == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        // Create and return a Spring Security User (note the fully qualified class name)
        return new org.springframework.security.core.userdetails.User(
            appUser.getEmail(), 
            appUser.getPassword(), 
            new ArrayList<>() // No authorities are set; add roles/authorities here if needed
        );
    }
}