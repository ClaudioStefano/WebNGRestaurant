package com.NGRestaurant.WebNGRestaurant.controller;

import com.NGRestaurant.WebNGRestaurant.dto.inventory.InventoryResponseDTO;
import com.NGRestaurant.WebNGRestaurant.dto.inventory.StockCheckRequestDTO;
import com.NGRestaurant.WebNGRestaurant.dto.inventory.StockUpdateRequestDTO;
import com.NGRestaurant.WebNGRestaurant.service.InterfaceInventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inventories")
@RequiredArgsConstructor
public class InventoryController {

    private final InterfaceInventoryService inventoryService;

    @PostMapping("/check")
    public ResponseEntity<InventoryResponseDTO> checkStock(@Valid @RequestBody StockCheckRequestDTO request) {
        InventoryResponseDTO response = inventoryService.checkStockAvailability(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/reduce")
    public ResponseEntity<InventoryResponseDTO> reduceStock(@Valid @RequestBody StockUpdateRequestDTO request) {
        InventoryResponseDTO response = inventoryService.reduceStock(request);
        return ResponseEntity.ok(response);
    }
}
