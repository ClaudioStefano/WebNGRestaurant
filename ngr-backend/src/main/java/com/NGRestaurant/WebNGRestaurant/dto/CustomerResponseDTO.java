package com.NGRestaurant.WebNGRestaurant.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CustomerResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private Date registrationDate;
    private Boolean isActive;
}
