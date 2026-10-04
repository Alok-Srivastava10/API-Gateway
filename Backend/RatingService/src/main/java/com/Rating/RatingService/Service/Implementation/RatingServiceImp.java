package com.Rating.RatingService.Service.Implementation;

import com.Rating.RatingService.Entity.Rating;
import com.Rating.RatingService.Repository.RatingRepository;
import com.Rating.RatingService.Service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImp implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public Rating create(Rating rating) {
        return ratingRepository.save(rating);
    }

    @Override
    public List<Rating> getAll() {
        return ratingRepository.findAll();
    }

    @Override
    public List<Rating> getRatingByUserId(String userId) {
        return ratingRepository.findByUserId(userId)    ;
    }

    @Override
    public List<Rating> getRatingByHotelId(String hotelId) {
        return ratingRepository.findByHotelId(hotelId);
    }

    @Override
    public Rating updateRating(String ratingId, Rating rating) {
        Rating existingRating = ratingRepository.findById(ratingId).orElseThrow(() -> new RuntimeException("Rating not found with id: " + ratingId));
        existingRating.setRating(rating.getRating());
        existingRating.setRemarks(rating.getRemarks());
        return ratingRepository.save(existingRating);
    }

    @Override
    public void deleteAll() {
        ratingRepository.deleteAll();
    }

    @Override
    public void deleteRating(String ratingId) {
        ratingRepository.deleteById(ratingId);
    }

    @Override
    public void deleteUserRating(String userId, String ratingId) {
        Rating existingRating = ratingRepository.findById(ratingId).orElseThrow(() -> new RuntimeException("Rating not found with id: " + ratingId));
        if (existingRating.getUserId().equals(userId)) {
            ratingRepository.deleteById(ratingId);
        } else {
            throw new RuntimeException("Rating with id " + ratingId + " does not belong to user " + userId);
        }
    }

    @Override
    public void deleteRatingsByUserId(String userId) {
        ratingRepository.deleteByUserId(userId);
    }

    @Override
    public void deleteRatingsByHotelId(String hotelId) {
        ratingRepository.deleteByHotelId(hotelId);
    }
}

