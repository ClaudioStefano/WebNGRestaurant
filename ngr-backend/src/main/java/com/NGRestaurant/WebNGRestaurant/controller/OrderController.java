package com.NGRestaurant.WebNGRestaurant.controller;

import com.NGRestaurant.WebNGRestaurant.dto.order.OrderRequestDTO;
import com.NGRestaurant.WebNGRestaurant.dto.order.OrderResponseDTO;
import com.NGRestaurant.WebNGRestaurant.service.InterfaceOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final InterfaceOrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDTO> createOrder(@Valid @RequestBody OrderRequestDTO request) {
        OrderResponseDTO response = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
