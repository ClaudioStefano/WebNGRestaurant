package com.NGRestaurant.WebNGRestaurant.dto.payment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDTO {

    @NotNull
    private Long orderId;

    @NotNull
    private Long customerId;

    @NotNull
    @Positive
    private Double amount;

    @NotBlank
    private String paymentMethod;

    @NotBlank
    private String tokenCard;
}
