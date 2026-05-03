package com.NGRestaurant.WebNGRestaurant.repository;

import com.NGRestaurant.WebNGRestaurant.model.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
}