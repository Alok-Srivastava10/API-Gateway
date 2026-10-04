package com.userservice.UserService.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "micro - users")
public class User {
    @Id
    @Column (name ="ID")
    private String userID;

    @Column(name = "NAME")
    private String name;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "ABOUT")
    private String about;

    @Transient
    private List<Rating>ratings = new ArrayList<Rating>();

    public void setUserId(String randomUserId) {
        userID = randomUserId;
    }
}
