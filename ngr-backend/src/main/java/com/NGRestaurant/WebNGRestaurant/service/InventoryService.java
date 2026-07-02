package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.dto.inventory.InventoryResponseDTO;
import com.NGRestaurant.WebNGRestaurant.dto.inventory.StockCheckRequestDTO;
import com.NGRestaurant.WebNGRestaurant.dto.inventory.StockUpdateRequestDTO;
import com.NGRestaurant.WebNGRestaurant.exception.InsufficientStockException;
import com.NGRestaurant.WebNGRestaurant.model.Inventory;
import com.NGRestaurant.WebNGRestaurant.repository.InventoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryService implements InterfaceInventoryService {

    private static final int REORDER_THRESHOLD = 5;

    private final InventoryRepository inventoryRepository;

    @Override
    @Transactional(readOnly = true)
    public InventoryResponseDTO checkStockAvailability(StockCheckRequestDTO request) {
        InventoryResponseDTO response = new InventoryResponseDTO();
        response.setProductId(request.getProductId());

        Inventory inventory = inventoryRepository.findByProductId(request.getProductId()).orElse(null);

        if (inventory == null) {
            response.setCurrentStock(0);
            response.setIsAvailable(false);
            response.setMessage("Producto no encontrado en inventario");
            return response;
        }

        response.setCurrentStock(inventory.getStock());
        boolean available = inventory.getStock() >= request.getQuantity();
        response.setIsAvailable(available);

        if (available) {
            response.setMessage("Stock disponible");
        } else {
            response.setMessage("Stock insuficiente: disponible " + inventory.getStock()
                    + ", solicitado " + request.getQuantity());
        }

        return response;
    }

    @Override
    public InventoryResponseDTO reduceStock(StockUpdateRequestDTO request) {
        Inventory inventory = inventoryRepository.findByProductId(request.getProductId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Producto con id " + request.getProductId() + " no encontrado en inventario"));

        if (inventory.getStock() < request.getQuantityToDeduct()) {
            throw new InsufficientStockException(
                    "Stock insuficiente para el producto " + request.getProductId()
                            + ": disponible " + inventory.getStock()
                            + ", solicitado " + request.getQuantityToDeduct());
        }

        inventory.setStock(inventory.getStock() - request.getQuantityToDeduct());
        inventory.setLastUpdate(LocalDateTime.now());
        inventoryRepository.save(inventory);

        InventoryResponseDTO response = new InventoryResponseDTO();
        response.setProductId(request.getProductId());
        response.setCurrentStock(inventory.getStock());
        response.setIsAvailable(true);

        if (inventory.getStock() < REORDER_THRESHOLD) {
            response.setMessage("Stock actualizado exitosamente | Alerta Predictiva de Reabastecimiento: stock por debajo del umbral crítico (" + REORDER_THRESHOLD + " unidades)");
        } else {
            response.setMessage("Stock actualizado exitosamente");
        }

        return response;
    }
}
