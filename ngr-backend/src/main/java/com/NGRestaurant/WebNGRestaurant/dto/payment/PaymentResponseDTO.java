package com.NGRestaurant.WebNGRestaurant.dto.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDTO {

    private String transactionId;
    private String paymentStatus;
    private String errorCode;
    private String message;
}
