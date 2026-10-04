package com.userservice.UserService.Exceptions;


import com.userservice.UserService.Payload.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> handlerResourceNotFoundException(ResourceNotFoundException ex) {
        String message = ex.getMessage();
        ApiResponse response=ApiResponse.builder()
                .message(message)
                .success(true)
                .status(org.springframework.http.HttpStatus.NOT_FOUND)
                .build();

        return new ResponseEntity<>(response, org.springframework.http.HttpStatus.NOT_FOUND);
    }
}
