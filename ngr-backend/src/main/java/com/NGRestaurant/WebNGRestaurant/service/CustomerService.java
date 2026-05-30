package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.dto.CustomerRegisterDTO;
import com.NGRestaurant.WebNGRestaurant.dto.CustomerResponseDTO;
import com.NGRestaurant.WebNGRestaurant.mapper.CustomerMapper;
import com.NGRestaurant.WebNGRestaurant.model.Customer;
import com.NGRestaurant.WebNGRestaurant.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public CustomerResponseDTO register(CustomerRegisterDTO dto) {
        Customer customer = customerMapper.toEntity(dto);
        customer.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        customer.setRegistrationDate(new Date());
        customer.setIsActive(true);

        Customer saved = customerRepository.save(customer);
        return customerMapper.toResponseDTO(saved);
    }

    @Transactional(readOnly = true)
    public CustomerResponseDTO findById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
        return customerMapper.toResponseDTO(customer);
    }

    @Transactional(readOnly = true)
    public List<CustomerResponseDTO> findAll() {
        return customerRepository.findByIsActiveTrue()
                .stream()
                .map(customerMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public CustomerResponseDTO update(Long id, CustomerRegisterDTO dto) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            customer.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }

        Customer updated = customerRepository.save(customer);
        return customerMapper.toResponseDTO(updated);
    }

    @Transactional
    public void deactivate(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
        customer.setIsActive(false);
        customerRepository.save(customer);
    }
}
