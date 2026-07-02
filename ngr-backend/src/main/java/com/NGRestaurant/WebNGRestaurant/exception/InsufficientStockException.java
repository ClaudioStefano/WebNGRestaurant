package com.NGRestaurant.WebNGRestaurant.exception;

public class InsufficientStockException extends RuntimeException {

    public InsufficientStockException(String message) {
        super(message);
    }
}
