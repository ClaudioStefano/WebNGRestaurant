package com.NGRestaurant.WebNGRestaurant.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
    private Long id;
    private String name;
    private Double price;
    private Boolean isAvailable;
    private Long categoryId;
    private String categoryName;
}