package com.NGRestaurant.WebNGRestaurant.dto;
import com.NGRestaurant.WebNGRestaurant.model.*;
import java.util.List;
import java.util.stream.Collectors;
public class DTOConverter {
    public static CustomerResponseDTO convertToCustomerDTO(Customer customer) {
        return new CustomerResponseDTO(
                customer.getId(),
                customer.getFirstName() + " " + customer.getLastName(),
                customer.getEmail(),
                customer.getPhone()
        );
    }
    public static BrandDTO convertToBrandDTO(Brand brand) {
        return new BrandDTO(
                brand.getId(),
                brand.getName(),
                brand.getDescription(),
                brand.getIsActive()
        );
    }
    public static CategoryDTO convertToCategoryDTO(Category category) {
        return new CategoryDTO(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getBrand() != null ? category.getBrand().getId() : null
        );
    }
    public static ProductResponseDTO convertToProductDTO(Product product) {
        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getIsAvailable(),
                product.getCategory() != null ? product.getCategory().getId() : null,
                product.getCategory() != null ? product.getCategory().getName() : null
        );
    }
    public static OrderResponseDTO convertToOrderDTO(Order order) {
        List<OrderDetailDTO> items = order.getOrderDetails() != null
                ? order.getOrderDetails().stream()
                .map(DTOConverter::convertToOrderDetailDTO)
                .collect(Collectors.toList())
                : null;
        String customerFullName = order.getCustomer() != null
                ? order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName()
                : null;
        return new OrderResponseDTO(
                order.getId(),
                order.getOrderDate(),
                order.getTotalAmount(),
                order.getStatus(),
                order.getCustomer() != null ? order.getCustomer().getId() : null,
                customerFullName,
                items
        );
    }
    public static OrderDetailDTO convertToOrderDetailDTO(OrderDetail detail) {
        return new OrderDetailDTO(
                detail.getProduct() != null ? detail.getProduct().getId() : null,
                detail.getProduct() != null ? detail.getProduct().getName() : null,
                detail.getQuantity(),
                detail.getUnitPrice(),
                detail.getSubtotal()
        );
    }
}