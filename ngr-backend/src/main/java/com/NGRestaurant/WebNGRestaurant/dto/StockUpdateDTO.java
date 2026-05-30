package com.NGRestaurant.WebNGRestaurant.dto;

import lombok.Data;

@Data
public class StockUpdateDTO {

    private Long productId;
    private Integer quantityToDeduct;
}
