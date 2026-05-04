package com.NGRestaurant.WebNGRestaurant.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor

public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    @Column(name = "unit_price")
    private Double unitPrice;

    private Double subtotal;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}