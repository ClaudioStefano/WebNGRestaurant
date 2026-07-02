package com.NGRestaurant.WebNGRestaurant.dto.inventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryResponseDTO {

    private Long productId;
    private Integer currentStock;
    private Boolean isAvailable;
    private String message;
}
