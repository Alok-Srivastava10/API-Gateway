package com.userservice.UserService.Payload;

import lombok.*;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ApiResponse {

    private String message;
    private boolean success;
    private HttpStatus status;
}
