package com.NGRestaurant.WebNGRestaurant.controller;

import com.NGRestaurant.WebNGRestaurant.dto.payment.PaymentRequestDTO;
import com.NGRestaurant.WebNGRestaurant.dto.payment.PaymentResponseDTO;
import com.NGRestaurant.WebNGRestaurant.service.InterfacePaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final InterfacePaymentService paymentService;

    @PostMapping
    public ResponseEntity<PaymentResponseDTO> processPayment(@Valid @RequestBody PaymentRequestDTO request) {
        PaymentResponseDTO response = paymentService.processPayment(request);
        return ResponseEntity.ok(response);
    }
}
