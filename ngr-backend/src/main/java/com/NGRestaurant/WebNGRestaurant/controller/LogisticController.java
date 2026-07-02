package com.NGRestaurant.WebNGRestaurant.controller;

import com.NGRestaurant.WebNGRestaurant.dto.logistic.DispatchCreateRequestDTO;
import com.NGRestaurant.WebNGRestaurant.dto.logistic.DispatchResponseDTO;
import com.NGRestaurant.WebNGRestaurant.dto.logistic.DispatchUpdateRequestDTO;
import com.NGRestaurant.WebNGRestaurant.service.InterfaceLogisticsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/logistic")
@RequiredArgsConstructor
public class LogisticController {

    private final InterfaceLogisticsService logisticsService;

    @PostMapping
    public ResponseEntity<DispatchResponseDTO> createDispatch(@Valid @RequestBody DispatchCreateRequestDTO request) {
        DispatchResponseDTO response = logisticsService.createDispatch(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/status")
    public ResponseEntity<DispatchResponseDTO> updateStatus(@Valid @RequestBody DispatchUpdateRequestDTO request) {
        DispatchResponseDTO response = logisticsService.updateStatus(request);
        return ResponseEntity.ok(response);
    }
}
