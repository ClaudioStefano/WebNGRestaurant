package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.dto.order.OrderDetailDTO;
import com.NGRestaurant.WebNGRestaurant.dto.order.OrderRequestDTO;
import com.NGRestaurant.WebNGRestaurant.dto.order.OrderResponseDTO;
import com.NGRestaurant.WebNGRestaurant.model.Order;
import com.NGRestaurant.WebNGRestaurant.model.OrderDetail;
import com.NGRestaurant.WebNGRestaurant.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService implements InterfaceOrderService {

    private final OrderRepository orderRepository;

    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO request) {
        Order order = new Order();
        order.setCustomerId(request.getCustomerId());
        order.setTransactionDate(LocalDateTime.now());
        order.setPaymentStatus("PENDING");
        order.setOrderStatus("PENDING");
        order.setTotalAmount(0.0);

        List<OrderDetail> details = new ArrayList<>();
        double total = 0.0;

        for (OrderDetailDTO item : request.getItems()) {
            OrderDetail detail = new OrderDetail();
            detail.setOrder(order);
            detail.setProductId(item.getProductId());
            detail.setQuantity(item.getQuantity());
            detail.setAppliedPrice(item.getAppliedPrice());

            double subTotal = item.getQuantity() * item.getAppliedPrice();
            detail.setSubTotal(subTotal);
            total += subTotal;

            details.add(detail);
        }

        order.setItems(details);
        order.setTotalAmount(total);

        Order saved = orderRepository.save(order);

        OrderResponseDTO response = new OrderResponseDTO();
        response.setOrderId(saved.getId());
        response.setStatus("PENDING");
        response.setMessage("Orden creada exitosamente");

        return response;
    }
}
