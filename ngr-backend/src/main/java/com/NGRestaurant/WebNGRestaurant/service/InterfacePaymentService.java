package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.dto.payment.PaymentRequestDTO;
import com.NGRestaurant.WebNGRestaurant.dto.payment.PaymentResponseDTO;

public interface InterfacePaymentService {

    PaymentResponseDTO processPayment(PaymentRequestDTO request);
}
