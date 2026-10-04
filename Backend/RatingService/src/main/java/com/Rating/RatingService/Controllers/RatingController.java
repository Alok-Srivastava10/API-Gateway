package com.Rating.RatingService.Controllers;


import com.Rating.RatingService.Entity.Rating;
import com.Rating.RatingService.Service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;
    @PostMapping
    public ResponseEntity<Rating> addRating(@RequestBody Rating rating){
        Rating newRating = ratingService.create(rating);
        return ResponseEntity.ok(newRating);
    }

    @GetMapping
    public ResponseEntity<List<Rating>>getAllRatings(){
        List<Rating>allRatings=ratingService.getAll();
        return ResponseEntity.ok(allRatings);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<Rating>>getRatingsByUserId(@PathVariable String userId){
        List<Rating>userRatings=ratingService.getRatingByUserId(userId);
        return ResponseEntity.ok(userRatings);
    }
    @GetMapping("/hotels/{hotelId}")
    public ResponseEntity<List<Rating>>getRatingsByHotelId(@PathVariable String hotelId) {
        List<Rating> hotelRatings = ratingService.getRatingByHotelId(hotelId);
        return ResponseEntity.ok(hotelRatings);
    }

    @PutMapping("/{ratingId}")
    public ResponseEntity<Rating> updateRating(@PathVariable String ratingId, @RequestBody Rating rating) {
        Rating updatedRating = ratingService.updateRating(ratingId, rating);
        return ResponseEntity.ok(updatedRating);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllRatings() {
        ratingService.deleteAll();
        return ResponseEntity.ok("All ratings deleted successfully");
    }

    @DeleteMapping("/{ratingId}")
    public ResponseEntity<String> deleteRating(@PathVariable String ratingId) {
        ratingService.deleteRating(ratingId);
        return ResponseEntity.ok("Rating deleted successfully with id: " + ratingId);
    }

    @DeleteMapping("/users/{userId}/{ratingId}")
    public ResponseEntity<String> deleteUserRating(@PathVariable String userId, @PathVariable String ratingId) {
        ratingService.deleteUserRating(userId, ratingId);
        return ResponseEntity.ok("Rating deleted successfully for user id: " + userId);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteRatingsByUserId(@PathVariable String userId) {
        ratingService.deleteRatingsByUserId(userId);
        return ResponseEntity.ok("All ratings deleted for user: " + userId);
    }

    @DeleteMapping("/hotels/{hotelId}")
    public ResponseEntity<String> deleteRatingsByHotelId(@PathVariable String hotelId) {
        ratingService.deleteRatingsByHotelId(hotelId);
        return ResponseEntity.ok("All ratings deleted for hotel id: " + hotelId);
    }
}

