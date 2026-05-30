package com.NGRestaurant.WebNGRestaurant.mapper;

import com.NGRestaurant.WebNGRestaurant.dto.CustomerRegisterDTO;
import com.NGRestaurant.WebNGRestaurant.dto.CustomerResponseDTO;
import com.NGRestaurant.WebNGRestaurant.model.Customer;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public Customer toEntity(CustomerRegisterDTO dto) {
        Customer customer = new Customer();
        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        return customer;
    }

    public CustomerResponseDTO toResponseDTO(Customer customer) {
        CustomerResponseDTO dto = new CustomerResponseDTO();
        dto.setId(customer.getId());
        dto.setFullName(customer.getFirstName() + " " + customer.getLastName());
        dto.setEmail(customer.getEmail());
        dto.setPhone(customer.getPhone());
        dto.setAddress(customer.getAddress());
        dto.setRegistrationDate(customer.getRegistrationDate());
        dto.setIsActive(customer.getIsActive());
        return dto;
    }
}
