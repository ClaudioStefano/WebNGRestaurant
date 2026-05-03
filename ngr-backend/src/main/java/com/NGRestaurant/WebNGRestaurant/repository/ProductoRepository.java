package com.NGRestaurant.WebNGRestaurant.repository;

import com.NGRestaurant.WebNGRestaurant.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByMarcaId(Long marcaId);
    List<Producto> findByDisponibleTrue();
}