package com.NGRestaurant.WebNGRestaurant.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "delivery_dispatches")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDispatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long orderId;

    @Column(nullable = true)
    private Long driverId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String deliveryAddress;

    private Double latitude;

    private Double longitude;

    @Column(nullable = false)
    private String dispatchStatus;

    private LocalDateTime estimatedArrivalTime;
}
