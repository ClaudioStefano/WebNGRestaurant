package com.NGRestaurant.WebNGRestaurant.dto.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {

    @NotNull
    private Long productId;

    @NotNull
    @Min(1)
    private Integer quantity;

    @NotNull
    @Positive
    private Double appliedPrice;
}
