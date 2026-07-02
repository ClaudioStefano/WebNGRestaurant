package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.dto.payment.PaymentRequestDTO;
import com.NGRestaurant.WebNGRestaurant.dto.payment.PaymentResponseDTO;
import com.NGRestaurant.WebNGRestaurant.model.Payment;
import com.NGRestaurant.WebNGRestaurant.proxy.PaymentGatewayProxy;
import com.NGRestaurant.WebNGRestaurant.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService implements InterfacePaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentGatewayProxy paymentGatewayProxy;

    @Override
    public PaymentResponseDTO processPayment(PaymentRequestDTO request) {
        String transactionCode = paymentGatewayProxy.processExternalCharge(request);

        Payment payment = new Payment();
        payment.setOrderId(request.getOrderId());
        payment.setTransactionCode(transactionCode);
        payment.setAmount(request.getAmount());
        payment.setPaymentStatus("APPROVED");
        payment.setPaymentDate(LocalDateTime.now());

        paymentRepository.save(payment);

        PaymentResponseDTO response = new PaymentResponseDTO();
        response.setTransactionId(transactionCode);
        response.setPaymentStatus("APPROVED");
        response.setErrorCode(null);
        response.setMessage("Pago procesado exitosamente");

        return response;
    }
}
