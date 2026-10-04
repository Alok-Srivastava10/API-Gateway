package com.userservice.UserService.Services;

import com.userservice.UserService.Entity.User;

import java.util.List;

public interface UserService {


    //create user
    User saveUser(User user);

    //Get all users
    List<User>getallUsers();

    //Get single user of given id
    User getUser(String userId);

    //delete user by id
    void deleteUser(String userId);

    //delete all users
    void deleteAllUsers();

    //delete user rating
    void deleteUserRating(String userId, String ratingId);

    //update user
    User updateUser(String userId, User user);
}

