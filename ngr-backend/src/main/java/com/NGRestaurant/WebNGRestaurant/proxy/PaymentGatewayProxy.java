package com.NGRestaurant.WebNGRestaurant.proxy;

import com.NGRestaurant.WebNGRestaurant.dto.payment.PaymentRequestDTO;
import com.NGRestaurant.WebNGRestaurant.exception.PaymentDeclinedException;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class PaymentGatewayProxy {

    public String processExternalCharge(PaymentRequestDTO request) {
        if (request.getTokenCard().endsWith("9999")) {
            throw new PaymentDeclinedException("Tarjeta rechazada o saldo insuficiente");
        }
        return UUID.randomUUID().toString();
    }
}
