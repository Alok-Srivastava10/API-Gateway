package com.Rating.RatingService.Repository;

import com.Rating.RatingService.Entity.Rating;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RatingRepository extends MongoRepository<Rating, String> {

    List<Rating> findByUserId(String userId);
    List<Rating> findByHotelId(String hotelId);
    void deleteByHotelId(String hotelId);
    void deleteByUserId(String userId);
}
