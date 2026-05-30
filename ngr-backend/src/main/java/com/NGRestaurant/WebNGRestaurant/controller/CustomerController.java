package com.NGRestaurant.WebNGRestaurant.controller;

import com.NGRestaurant.WebNGRestaurant.dto.CustomerRegisterDTO;
import com.NGRestaurant.WebNGRestaurant.dto.CustomerResponseDTO;
import com.NGRestaurant.WebNGRestaurant.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<CustomerResponseDTO> create(@RequestBody CustomerRegisterDTO dto) {
        CustomerResponseDTO response = customerService.register(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> getById(@PathVariable Long id) {
        CustomerResponseDTO response = customerService.findById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<CustomerResponseDTO>> getAll() {
        List<CustomerResponseDTO> customers = customerService.findAll();
        return ResponseEntity.ok(customers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> update(@PathVariable Long id, @RequestBody CustomerRegisterDTO dto) {
        CustomerResponseDTO response = customerService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        customerService.deactivate(id);
        return ResponseEntity.noContent().build();
    }
}
