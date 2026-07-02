package com.NGRestaurant.WebNGRestaurant.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "drivers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Driver {

    @Id
    private Long employeeId;

    @Column(nullable = false, length = 15)
    private String vehiclePlate;

    @Column(nullable = false)
    private Boolean isAvailable;
}
