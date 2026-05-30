package com.NGRestaurant.WebNGRestaurant.controller;

import com.NGRestaurant.WebNGRestaurant.dto.*;
import com.NGRestaurant.WebNGRestaurant.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventories")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<InventoryResponseDTO> create(@RequestBody InventoryRegisterDTO dto) {
        InventoryResponseDTO response = inventoryService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<InventoryResponseDTO>> getAll() {
        List<InventoryResponseDTO> inventories = inventoryService.findAll();
        return ResponseEntity.ok(inventories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryResponseDTO> getById(@PathVariable Long id) {
        InventoryResponseDTO response = inventoryService.findById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<InventoryResponseDTO> getByProductId(@PathVariable Long productId) {
        InventoryResponseDTO response = inventoryService.findByProductId(productId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/check")
    public ResponseEntity<InventoryResponseDTO> checkAvailability(@RequestBody StockCheckRequestDTO dto) {
        InventoryResponseDTO response = inventoryService.checkAvailability(dto);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/deduct")
    public ResponseEntity<InventoryResponseDTO> deductStock(@RequestBody StockUpdateDTO dto) {
        InventoryResponseDTO response = inventoryService.deductStock(dto);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryResponseDTO> updateStock(@PathVariable Long id, @RequestBody Integer stock) {
        InventoryResponseDTO response = inventoryService.updateStock(id, stock);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        inventoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
