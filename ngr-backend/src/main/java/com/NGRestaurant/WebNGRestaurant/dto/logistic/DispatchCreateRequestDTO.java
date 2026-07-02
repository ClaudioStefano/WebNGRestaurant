package com.NGRestaurant.WebNGRestaurant.dto.logistic;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DispatchCreateRequestDTO {

    @NotNull
    private Long orderId;

    @NotBlank
    private String deliveryAddress;

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;
}
