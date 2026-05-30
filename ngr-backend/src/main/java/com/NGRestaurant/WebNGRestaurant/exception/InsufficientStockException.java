package com.NGRestaurant.WebNGRestaurant.exception;

public class InsufficientStockException extends RuntimeException {

    public InsufficientStockException(Long productId, Integer requested, Integer available) {
        super("Stock insuficiente para el producto " + productId
                + ". Solicitado: " + requested + ", disponible: " + available);
    }
}
