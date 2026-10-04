package com.userservice.UserService.Services.Implementation;

import com.userservice.UserService.Entity.Hotel;
import com.userservice.UserService.Entity.Rating;
import com.userservice.UserService.Entity.User;
import com.userservice.UserService.ExternalServices.Services.HotelService;
import com.userservice.UserService.ExternalServices.Services.RatingService;
import com.userservice.UserService.Repository.UserRepository;
import com.userservice.UserService.Services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private HotelService hotelService;

    @Autowired
    private RatingService ratingService;

    private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public User saveUser(User user) {
        String randomUserId = UUID.randomUUID().toString();
        user.setUserId(randomUserId);
        return userRepository.save(user);
    }

    @Override
    public List<User> getallUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::populateUserRatingsAndHotels)
                .collect(Collectors.toList());
    }

    @Override
    public User getUser(String userId) {
        User user = userRepository.findById(userId)
                .or(() -> userRepository.findByEmail(userId))
                .orElseThrow(() -> new RuntimeException("User not found with id or email: " + userId));
        return user;
    }

    @Override
    public void deleteUser(String userId) {
        User user = userRepository.findById(userId)
                .or(() -> userRepository.findByEmail(userId))
                .orElseThrow(() -> new RuntimeException("User not found with id or email: " + userId));

        // 1. Delete credentials from AuthService (auth_db)
        try {
            if (user.getEmail() != null) {
                restTemplate.delete("http://AUTH-SERVICE/auth/users/" + user.getEmail());
            }
        } catch (Exception e) {
            logger.warn("Could not delete auth credentials for user {}: {}", user.getEmail(), e.getMessage());
        }

        // 2. Delete ratings from RatingService (MongoDB)
        try {
            if (user.getUserID() != null) {
                restTemplate.delete("http://RATING-SERVICE/ratings/users/" + user.getUserID());
            }
            if (user.getEmail() != null) {
                restTemplate.delete("http://RATING-SERVICE/ratings/users/" + user.getEmail());
            }
        } catch (Exception e) {
            logger.warn("Could not cascade delete ratings for user {}: {}", user.getUserID(), e.getMessage());
        }

        // 3. Delete from UserService (user_db)
        userRepository.delete(user);
    }

    @Override
    public void deleteAllUsers() {
        // 1. Delete all credentials from AuthService
        try {
            restTemplate.delete("http://AUTH-SERVICE/auth/users");
        } catch (Exception e) {
            logger.warn("Could not cascade delete all users in AuthService: {}", e.getMessage());
        }

        // 2. Delete all ratings from RatingService
        try {
            restTemplate.delete("http://RATING-SERVICE/ratings");
        } catch (Exception e) {
            logger.warn("Could not cascade delete all ratings in RatingService: {}", e.getMessage());
        }

        // 3. Delete all users in UserService
        userRepository.deleteAll();
    }

    @Override
    public void deleteUserRating(String userId, String ratingId) {
        ratingService.deleteUserRating(userId, ratingId);
    }

    @Override
    public User updateUser(String userId, User user) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setAbout(user.getAbout());
        return userRepository.save(existingUser);
    }

    private User populateUserRatingsAndHotels(User user) {
        try {
            List<Rating> allRatings = new ArrayList<>();

            // 1. Fetch ratings by User UUID (e.g. 54e80d73-...)
            if (user.getUserID() != null && !user.getUserID().trim().isEmpty()) {
                try {
                    Rating[] byId = restTemplate.getForObject(
                            "http://RATING-SERVICE/ratings/users/" + user.getUserID(), Rating[].class);
                    if (byId != null) {
                        allRatings.addAll(Arrays.asList(byId));
                    }
                } catch (Exception e) {
                    logger.warn("Could not fetch ratings by UUID for user {}", user.getUserID());
                }
            }

            // 2. Also fetch ratings by User Email (e.g. Puneet@gmail.com) if any exist
            if (user.getEmail() != null && !user.getEmail().trim().isEmpty()) {
                try {
                    Rating[] byEmail = restTemplate.getForObject(
                            "http://RATING-SERVICE/ratings/users/" + user.getEmail(), Rating[].class);
                    if (byEmail != null) {
                        for (Rating r : byEmail) {
                            boolean exists = allRatings.stream().anyMatch(
                                    existing -> existing.getRatingId() != null && existing.getRatingId().equals(r.getRatingId())
                            );
                            if (!exists) {
                                allRatings.add(r);
                            }
                        }
                    }
                } catch (Exception e) {
                    logger.warn("Could not fetch ratings by Email for user {}", user.getEmail());
                }
            }

            // 3. Populate Hotel details and keep ONLY ratings whose hotel still exists in DB
            List<Rating> ratinglist = allRatings.stream()
                    .filter(rating -> rating.getHotelId() != null && !rating.getHotelId().trim().isEmpty())
                    .map(rating -> {
                        try {
                            Hotel hotel = hotelService.getHotel(rating.getHotelId());
                            rating.setHotel(hotel);
                        } catch (Exception e) {
                            logger.warn("Hotel {} not found for rating {}", rating.getHotelId(), rating.getRatingId());
                            rating.setHotel(null);
                        }
                        return rating;
                    })
                    .filter(rating -> rating.getHotel() != null)
                    .collect(Collectors.toList());

            user.setRatings(ratinglist);
        } catch (Exception e) {
            logger.error("Error populating ratings for user {}", user.getUserID(), e);
            user.setRatings(new ArrayList<>());
        }
        return user;
    }
}
