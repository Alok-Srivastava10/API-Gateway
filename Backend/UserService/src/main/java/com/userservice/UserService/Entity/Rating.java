package com.userservice.UserService.Entity;

import jdk.jfr.SettingDefinition;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rating {
    private String ratingId;
    private String userId;
    private String hotelId;
    private int rating;
    private String remarks;
    private Hotel hotel;

}
