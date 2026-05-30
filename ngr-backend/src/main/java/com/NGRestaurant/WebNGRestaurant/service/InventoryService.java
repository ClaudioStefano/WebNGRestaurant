package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.dto.*;
import com.NGRestaurant.WebNGRestaurant.exception.InsufficientStockException;
import com.NGRestaurant.WebNGRestaurant.mapper.InventoryMapper;
import com.NGRestaurant.WebNGRestaurant.model.Inventory;
import com.NGRestaurant.WebNGRestaurant.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final InventoryMapper inventoryMapper;

    @Transactional
    public InventoryResponseDTO create(InventoryRegisterDTO dto) {
        Inventory inventory = inventoryMapper.toEntity(dto);
        inventory.setLastUpdate(new Date());

        Inventory saved = inventoryRepository.save(inventory);
        return inventoryMapper.toResponseDTO(saved);
    }

    @Transactional(readOnly = true)
    public InventoryResponseDTO findById(Long id) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found with id: " + id));
        return inventoryMapper.toResponseDTO(inventory);
    }

    @Transactional(readOnly = true)
    public List<InventoryResponseDTO> findAll() {
        return inventoryRepository.findAll()
                .stream()
                .map(inventoryMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public InventoryResponseDTO findByProductId(Long productId) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Inventory not found for productId: " + productId));
        return inventoryMapper.toResponseDTO(inventory);
    }

    @Transactional(readOnly = true)
    public InventoryResponseDTO checkAvailability(StockCheckRequestDTO dto) {
        Inventory inventory = inventoryRepository.findByProductId(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Inventory not found for productId: " + dto.getProductId()));

        InventoryResponseDTO response = inventoryMapper.toResponseDTO(inventory);
        response.setIsAvailable(inventory.getStock() >= dto.getQuantity());
        response.setMessage(inventory.getStock() >= dto.getQuantity()
                ? "Stock suficiente: " + inventory.getStock() + " disponibles para las " + dto.getQuantity() + " solicitadas"
                : "Stock insuficiente: " + inventory.getStock() + " disponibles, se requieren " + dto.getQuantity());
        return response;
    }

    @Transactional
    public InventoryResponseDTO deductStock(StockUpdateDTO dto) {
        Inventory inventory = inventoryRepository.findByProductIdWithLock(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Inventory not found for productId: " + dto.getProductId()));

        if (inventory.getStock() < dto.getQuantityToDeduct()) {
            throw new InsufficientStockException(
                    dto.getProductId(), dto.getQuantityToDeduct(), inventory.getStock());
        }

        inventory.setStock(inventory.getStock() - dto.getQuantityToDeduct());
        inventory.setLastUpdate(new Date());

        Inventory saved = inventoryRepository.save(inventory);
        return inventoryMapper.toResponseDTO(saved);
    }

    @Transactional
    public InventoryResponseDTO updateStock(Long id, Integer stock) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found with id: " + id));

        inventory.setStock(stock);
        inventory.setLastUpdate(new Date());

        Inventory saved = inventoryRepository.save(inventory);
        return inventoryMapper.toResponseDTO(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!inventoryRepository.existsById(id)) {
            throw new RuntimeException("Inventory not found with id: " + id);
        }
        inventoryRepository.deleteById(id);
    }
}
