package com.NGRestaurant.WebNGRestaurant.dto;

import lombok.Data;

@Data
public class CustomerRegisterDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String address;
}
