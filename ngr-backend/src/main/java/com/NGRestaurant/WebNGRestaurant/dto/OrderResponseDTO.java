package com.NGRestaurant.WebNGRestaurant.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private Long id;
    private LocalDateTime orderDate;
    private Double totalAmount;
    private String status;
    private Long customerId;
    private String customerFullName;
    private List<OrderDetailDTO> items;
}