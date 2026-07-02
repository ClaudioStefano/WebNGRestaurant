package com.NGRestaurant.WebNGRestaurant.exception;

public class PaymentDeclinedException extends RuntimeException {

    public PaymentDeclinedException(String message) {
        super(message);
    }
}
