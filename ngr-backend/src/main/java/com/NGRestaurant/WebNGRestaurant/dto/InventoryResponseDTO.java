package com.NGRestaurant.WebNGRestaurant.dto;

import lombok.Data;

@Data
public class InventoryResponseDTO {

    private Long productId;
    private Integer currentStock;
    private Boolean isAvailable;
    private String message;
}
