package com.hotel.HotelService.Service;

import com.hotel.HotelService.Entity.Hotel;

import java.util.List;

public interface HotelService {

    //create
    Hotel create(Hotel hotel);

    //get all hotels
    List<Hotel> getall();


    //Hotel by id
    Hotel get(String id);

    //delete all hotels
    void deleteAll();

    //delete hotel by id
    void delete(String id);

    //get hotel with all users who rated it and their ratings
    Hotel getHotelWithUsersAndRatings(String hotelId);

    //update hotel
    Hotel updateHotel(String hotelId, Hotel hotel);

    //search and filter hotels
    List<Hotel> searchAndFilterHotels(String location, Double minRating);
}

