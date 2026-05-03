package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.model.Producto;
import com.NGRestaurant.WebNGRestaurant.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;

    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    public List<Producto> findByMarcaId(Long marcaId) {
        return productoRepository.findByMarcaId(marcaId);
    }
}