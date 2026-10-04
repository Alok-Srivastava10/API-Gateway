package com.hotel.HotelService.Service.Implmenetation;

import com.hotel.HotelService.Entity.Hotel;
import com.hotel.HotelService.Entity.Rating;
import com.hotel.HotelService.Entity.User;
import com.hotel.HotelService.Exceptions.ResourceNotFoundException;
import com.hotel.HotelService.Repository.HotelRepository;
import com.hotel.HotelService.Service.HotelService;
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
public class HotelServiceImpl implements HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RestTemplate restTemplate;

    private Logger logger = LoggerFactory.getLogger(HotelServiceImpl.class);

    @Override
    public Hotel create(Hotel hotel) {
        String hotelId = UUID.randomUUID().toString();
        hotel.setId(hotelId);
        return hotelRepository.save(hotel);
    }

    @Override
    public List<Hotel> getall() {
        List<Hotel> hotels = hotelRepository.findAll();
        return hotels.stream()
                .map(this::populateHotelRatingsAndUsers)
                .collect(Collectors.toList());
    }

    @Override
    public Hotel get(String id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + id));
        return populateHotelRatingsAndUsers(hotel);
    }

    @Override
    public void deleteAll() {
        try {
            restTemplate.delete("http://RATING-SERVICE/ratings");
        } catch (Exception e) {
            logger.warn("Could not cascade delete all ratings from RatingService: {}", e.getMessage());
        }
        hotelRepository.deleteAll();
    }

    @Override
    public void delete(String id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + id));
        try {
            restTemplate.delete("http://RATING-SERVICE/ratings/hotels/" + id);
        } catch (Exception e) {
            logger.warn("Could not cascade delete ratings for hotel {} from RatingService: {}", id, e.getMessage());
        }
        hotelRepository.delete(hotel);
    }

    @Override
    public Hotel getHotelWithUsersAndRatings(String hotelId) {
        return get(hotelId);
    }

    @Override
    public Hotel updateHotel(String hotelId, Hotel hotel) {
        Hotel existingHotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + hotelId));
        existingHotel.setName(hotel.getName());
        existingHotel.setLocation(hotel.getLocation());
        existingHotel.setAbout(hotel.getAbout());
        return hotelRepository.save(existingHotel);
    }

    @Override
    public List<Hotel> searchAndFilterHotels(String location, Double minRating) {
        List<Hotel> hotels;
        if (location != null && !location.trim().isEmpty()) {
            hotels = hotelRepository.findByLocationContainingIgnoreCase(location.trim());
        } else {
            hotels = hotelRepository.findAll();
        }

        List<Hotel> populatedHotels = hotels.stream()
                .map(this::populateHotelRatingsAndUsers)
                .collect(Collectors.toList());

        if (minRating != null) {
            return populatedHotels.stream()
                    .filter(h -> h.getAverageRating() != null && h.getAverageRating() >= minRating)
                    .collect(Collectors.toList());
        }

        return populatedHotels;
    }

    private Hotel populateHotelRatingsAndUsers(Hotel hotel) {
        try {
            Rating[] ratingsArray = restTemplate.getForObject(
                    "http://RATING-SERVICE/ratings/hotels/" + hotel.getId(), Rating[].class);

            if (ratingsArray != null && ratingsArray.length > 0) {
                List<Rating> ratingsWithUsers = Arrays.stream(ratingsArray).map(rating -> {
                    try {
                        User user = restTemplate.getForObject(
                                "http://USER-SERVICE/Users/" + rating.getUserId(), User.class);
                        rating.setUser(user);
                    } catch (Exception e) {
                        logger.error("Error fetching user {} for rating {}", rating.getUserId(), rating.getRatingId(), e);
                    }
                    return rating;
                }).collect(Collectors.toList());

                double sum = 0;
                for (Rating r : ratingsArray) {
                    sum += r.getRating();
                }
                double average = sum / ratingsArray.length;
                hotel.setAverageRating(Math.round(average * 10.0) / 10.0);
                hotel.setRatings(ratingsWithUsers);
            } else {
                hotel.setRatings(new ArrayList<>());
                hotel.setAverageRating(0.0);
            }
        } catch (Exception e) {
            logger.error("Error fetching ratings for hotel {}", hotel.getId(), e);
            hotel.setRatings(new ArrayList<>());
            hotel.setAverageRating(0.0);
        }
        return hotel;
    }
}
