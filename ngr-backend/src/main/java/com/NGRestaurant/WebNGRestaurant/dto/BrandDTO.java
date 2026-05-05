package com.NGRestaurant.WebNGRestaurant.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class BrandDTO {
    private Long id;
    private String name;
    private String description;
    private Boolean isActive;
}