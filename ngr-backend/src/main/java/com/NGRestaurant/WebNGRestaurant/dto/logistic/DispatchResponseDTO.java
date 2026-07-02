package com.NGRestaurant.WebNGRestaurant.dto.logistic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DispatchResponseDTO {

    private Long dispatchId;
    private Long orderId;
    private String driverName;
    private String vehiclePlate;
    private String dispatchStatus;
    private LocalDateTime estimatedArrivalTime;
    private String message;
}
