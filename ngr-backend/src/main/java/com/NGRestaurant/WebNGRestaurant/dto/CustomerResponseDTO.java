package com.NGRestaurant.WebNGRestaurant.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponseDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
}