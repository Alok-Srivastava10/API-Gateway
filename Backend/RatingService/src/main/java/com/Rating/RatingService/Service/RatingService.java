package com.Rating.RatingService.Service;

import com.Rating.RatingService.Entity.Rating;

import java.util.List;

public interface RatingService {

    //create
    Rating create(Rating rating);

    //get all
    List<Rating> getAll();

    //get single rating of user
    List<Rating> getRatingByUserId(String userId);

    //get single rating of hotel
    List<Rating> getRatingByHotelId(String hotelId);

    //update rating
    Rating updateRating(String ratingId, Rating rating);

    //delete all ratings
    void deleteAll();

    //delete single rating by id
    void deleteRating(String ratingId);

    //delete rating for a user
    void deleteUserRating(String userId, String ratingId);

    //delete all ratings of a user
    void deleteRatingsByUserId(String userId);

    //delete ratings for a hotel
    void deleteRatingsByHotelId(String hotelId);
}
