package com.userservice.UserService.Controllers;


import com.userservice.UserService.Entity.User;
import com.userservice.UserService.Services.UserService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/Users")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        User user1=userService.saveUser(user);
        return ResponseEntity.ok(user1);
    }

    int retryCount=1;

    @GetMapping("/{userId}")
    @CircuitBreaker(name="ratingHotelBreaker",fallbackMethod = "ratingHotelFallback")
    @RateLimiter(name="userRateLimiter")
    public ResponseEntity<User> getUser(@PathVariable String userId) {
        log.info("Retry count: {}", retryCount);
        retryCount++;
        User user = userService.getUser(userId);
        return ResponseEntity.ok(user);
    }

    //creating fallback method for circuit breaker
    public ResponseEntity<User>ratingHotelFallback(String userID,Exception ex){
        log.error("Fallback triggered for userId: {}. Error: {}", userID, ex.getMessage(), ex);
        User user=User.builder()
                .email("dummy@gmail.com")
                .userID("123456")
                .about("This user is created dummy because some service is down")
                .name("Dummy")
                .build();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User>allUsers=userService.getallUsers();
        return ResponseEntity.ok(allUsers);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully with id: " + userId);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllUsers() {
        userService.deleteAllUsers();
        return ResponseEntity.ok("All users deleted successfully");
    }

    @DeleteMapping("/{userId}/ratings/{ratingId}")
    public ResponseEntity<String> deleteUserRating(@PathVariable String userId, @PathVariable String ratingId) {
        userService.deleteUserRating(userId, ratingId);
        return ResponseEntity.ok("Rating with id " + ratingId + " deleted successfully for user " + userId);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable String userId, @RequestBody User user) {
        User updatedUser = userService.updateUser(userId, user);
        return ResponseEntity.ok(updatedUser);
    }
}

