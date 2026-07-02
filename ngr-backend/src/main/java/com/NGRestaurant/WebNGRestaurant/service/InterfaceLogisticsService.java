package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.dto.logistic.DispatchCreateRequestDTO;
import com.NGRestaurant.WebNGRestaurant.dto.logistic.DispatchResponseDTO;
import com.NGRestaurant.WebNGRestaurant.dto.logistic.DispatchUpdateRequestDTO;

public interface InterfaceLogisticsService {

    DispatchResponseDTO createDispatch(DispatchCreateRequestDTO req);

    DispatchResponseDTO updateStatus(DispatchUpdateRequestDTO req);
}
