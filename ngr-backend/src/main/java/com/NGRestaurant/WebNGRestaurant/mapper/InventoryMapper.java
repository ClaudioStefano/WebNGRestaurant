package com.NGRestaurant.WebNGRestaurant.mapper;

import com.NGRestaurant.WebNGRestaurant.dto.InventoryRegisterDTO;
import com.NGRestaurant.WebNGRestaurant.dto.InventoryResponseDTO;
import com.NGRestaurant.WebNGRestaurant.model.Inventory;
import org.springframework.stereotype.Component;

@Component
public class InventoryMapper {

    public Inventory toEntity(InventoryRegisterDTO dto) {
        Inventory inventory = new Inventory();
        inventory.setProductId(dto.getProductId());
        inventory.setStock(dto.getStock());
        return inventory;
    }

    public InventoryResponseDTO toResponseDTO(Inventory inventory) {
        InventoryResponseDTO dto = new InventoryResponseDTO();
        dto.setProductId(inventory.getProductId());
        dto.setCurrentStock(inventory.getStock());
        dto.setIsAvailable(inventory.getStock() > 0);
        dto.setMessage(inventory.getStock() > 0
                ? "Stock disponible: " + inventory.getStock() + " unidades"
                : "Producto sin stock");
        return dto;
    }
}
