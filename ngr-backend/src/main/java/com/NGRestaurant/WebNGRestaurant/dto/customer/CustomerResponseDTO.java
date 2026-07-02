package com.NGRestaurant.WebNGRestaurant.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponseDTO {

    private Long customerId;
    private String email;
    private String fullName;
    private Boolean isActive;
    private String message;
}
