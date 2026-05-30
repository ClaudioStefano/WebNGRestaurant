package com.NGRestaurant.WebNGRestaurant.dto;

import lombok.Data;

@Data
public class StockCheckRequestDTO {

    private Long productId;
    private Integer quantity;
}
