package com.NGRestaurant.WebNGRestaurant.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor

public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;
    //Brand
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;
    //Category
    @OneToMany(mappedBy = "category")
    private List<Product> products;
}