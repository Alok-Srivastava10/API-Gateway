package com.userservice.UserService.ExternalServices.Services;

import com.userservice.UserService.Entity.Rating;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Service
@FeignClient(name = "RATING-SERVICE")
public interface RatingService {

    //Get


    //Post
    @PostMapping("/ratings")
    public Rating createRating(@RequestBody Rating rating);

    //put
    @PutMapping("/ratings/{ratingId}")
    public Rating updateRating(@PathVariable("ratingId") String ratingId, @RequestBody Rating rating);

    @DeleteMapping("/ratings/{ratingId}")
    public void deleteRating(@PathVariable("ratingId") String ratingId);

    @DeleteMapping("/ratings/users/{userId}/{ratingId}")
    public void deleteUserRating(@PathVariable("userId") String userId, @PathVariable("ratingId") String ratingId);
}

