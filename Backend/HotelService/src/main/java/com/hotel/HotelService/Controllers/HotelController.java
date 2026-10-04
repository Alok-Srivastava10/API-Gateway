package com.hotel.HotelService.Controllers;


import com.hotel.HotelService.Entity.Hotel;
import com.hotel.HotelService.Service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @PostMapping
    public ResponseEntity<Hotel>createHotel(@RequestBody Hotel hotel){
        System.out.println("Name = " + hotel.getName());
        System.out.println("Location = " + hotel.getLocation());
        System.out.println("About = " + hotel.getAbout());
        Hotel createdHotel = hotelService.create(hotel);
        return ResponseEntity.ok(createdHotel);
    }

    @GetMapping("/{HotelId}")
    public ResponseEntity<Hotel>getHotelByID(@PathVariable String HotelId){

        Hotel hotel = hotelService.get(HotelId);
        return ResponseEntity.ok(hotel);
    }

    @GetMapping
    public ResponseEntity<List<Hotel>> getAllHotels() {
        List<Hotel> allHotels = hotelService.getall();
        return ResponseEntity.ok(allHotels);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllHotels() {
        hotelService.deleteAll();
        return ResponseEntity.ok("All hotels deleted successfully");
    }

    @DeleteMapping("/{HotelId}")
    public ResponseEntity<String> deleteHotelByID(@PathVariable String HotelId) {
        hotelService.delete(HotelId);
        return ResponseEntity.ok("Hotel deleted successfully with id: " + HotelId);
    }

    // Ek hotel ko kis kis user ne book kiya aur kitna rating diya
    @GetMapping("/{HotelId}/users-ratings")
    public ResponseEntity<Hotel> getHotelWithUsersAndRatings(@PathVariable String HotelId) {
        Hotel hotel = hotelService.getHotelWithUsersAndRatings(HotelId);
        return ResponseEntity.ok(hotel);
    }

    @PutMapping("/{hotelId}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable String hotelId, @RequestBody Hotel hotel) {
        Hotel updatedHotel = hotelService.updateHotel(hotelId, hotel);
        return ResponseEntity.ok(updatedHotel);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Hotel>> searchAndFilterHotels(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double minRating) {
        List<Hotel> hotels = hotelService.searchAndFilterHotels(location, minRating);
        return ResponseEntity.ok(hotels);
    }
}

