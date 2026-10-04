package com.auth.AuthService.Service;

import com.auth.AuthService.Dto.RegisterRequest;
import com.auth.AuthService.Entity.Role;
import com.auth.AuthService.Entity.UserEntity;
import com.auth.AuthService.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private AuthenticationManager authenticationManager;

    public void register(RegisterRequest request) {
        Role userRole = request.getRole() != null ? request.getRole() : Role.USER;

        // If user already exists in auth_db, update credentials/role smoothly; otherwise create new
        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseGet(() -> UserEntity.builder()
                        .userId(UUID.randomUUID().toString())
                        .email(request.getEmail())
                        .build());

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(userRole);
        userRepository.save(user);

        // Also automatically create or update user profile entity in UserService (user_db)
        try {
            String userName = request.getName() != null && !request.getName().trim().isEmpty()
                    ? request.getName().trim()
                    : request.getEmail().split("@")[0];
            String userAbout = request.getAbout() != null && !request.getAbout().trim().isEmpty()
                    ? request.getAbout().trim()
                    : "Hotel enthusiast & reviewer";

            java.util.Map<String, String> userPayload = new java.util.HashMap<>();
            userPayload.put("name", userName);
            userPayload.put("email", request.getEmail());
            userPayload.put("about", userAbout);

            restTemplate.postForObject("http://USER-SERVICE/Users", userPayload, Object.class);
        } catch (Exception e) {
            System.err.println("Note: Could not automatically sync user to UserService: " + e.getMessage());
        }
    }

    public void authenticate(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
    }

    public String generateToken(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));
        return jwtService.generateToken(user.getEmail(), user.getRole().name());
    }

    public boolean isTokenValid(String token) {
        return jwtService.isTokenValid(token);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public void deleteUser(String email) {
        userRepository.findByEmail(email).ifPresent(userRepository::delete);
    }

    public void deleteAllUsers() {
        userRepository.deleteAll();
    }
}
