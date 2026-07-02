package com.NGRestaurant.WebNGRestaurant.dto.order;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {

    @NotNull
    private Long customerId;

    @NotEmpty
    private List<OrderDetailDTO> items;
}
