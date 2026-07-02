package com.NGRestaurant.WebNGRestaurant.controller;

import com.NGRestaurant.WebNGRestaurant.dto.customer.CustomerRegisterDTO;
import com.NGRestaurant.WebNGRestaurant.dto.customer.CustomerResponseDTO;
import com.NGRestaurant.WebNGRestaurant.service.InterfaceCustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final InterfaceCustomerService customerService;

    @PostMapping
    public ResponseEntity<CustomerResponseDTO> register(@Valid @RequestBody CustomerRegisterDTO dto) {
        CustomerResponseDTO response = customerService.register(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> findById(@PathVariable Long id) {
        CustomerResponseDTO response = customerService.findById(id);
        return ResponseEntity.ok(response);
    }
}
