package com.NGRestaurant.WebNGRestaurant.dto.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {

    private Long orderId;
    private String status;
    private String message;
}
