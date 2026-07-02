package com.NGRestaurant.WebNGRestaurant.dto.logistic;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DispatchUpdateRequestDTO {

    @NotNull
    private Long dispatchId;

    @NotBlank
    private String status;

    private Long driverId;
}
