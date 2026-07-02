package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.dto.customer.CustomerRegisterDTO;
import com.NGRestaurant.WebNGRestaurant.dto.customer.CustomerResponseDTO;

public interface InterfaceCustomerService {

    CustomerResponseDTO register(CustomerRegisterDTO dto);

    CustomerResponseDTO findById(Long id);
}
