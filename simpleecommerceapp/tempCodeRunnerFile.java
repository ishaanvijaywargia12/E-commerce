import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcryptTest {
    public static void main(String[] args) {
        String rawPassword = "hello123";  // Enter the password you used during signup
        String hashedPassword = "$2a$10$TvecgmmFmq8vVvA05OVxhe4niD7q9/9s.rz29v3Gn8c6fCluTH7oa"; // Your bcrypt hash
        
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean isMatch = passwordEncoder.matches(rawPassword, hashedPassword);

        System.out.println("Password Match: " + isMatch);
    }
}