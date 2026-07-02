package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.dto.order.OrderRequestDTO;
import com.NGRestaurant.WebNGRestaurant.dto.order.OrderResponseDTO;

public interface InterfaceOrderService {

    OrderResponseDTO createOrder(OrderRequestDTO request);
}
