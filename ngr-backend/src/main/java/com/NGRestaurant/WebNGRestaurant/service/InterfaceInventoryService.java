package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.dto.inventory.InventoryResponseDTO;
import com.NGRestaurant.WebNGRestaurant.dto.inventory.StockCheckRequestDTO;
import com.NGRestaurant.WebNGRestaurant.dto.inventory.StockUpdateRequestDTO;

public interface InterfaceInventoryService {

    InventoryResponseDTO checkStockAvailability(StockCheckRequestDTO request);

    InventoryResponseDTO reduceStock(StockUpdateRequestDTO request);
}
