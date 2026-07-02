package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.dto.customer.CustomerRegisterDTO;
import com.NGRestaurant.WebNGRestaurant.dto.customer.CustomerResponseDTO;
import com.NGRestaurant.WebNGRestaurant.exception.DuplicateEmailException;
import com.NGRestaurant.WebNGRestaurant.model.Customer;
import com.NGRestaurant.WebNGRestaurant.repository.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomerService implements InterfaceCustomerService {

    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public CustomerResponseDTO register(CustomerRegisterDTO dto) {
        if (customerRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new DuplicateEmailException("El email " + dto.getEmail() + " ya se encuentra registrado");
        }

        Customer customer = new Customer();
        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setEmail(dto.getEmail());
        customer.setPassword(passwordEncoder.encode(dto.getPassword()));
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        customer.setRegistrationDate(LocalDateTime.now());
        customer.setIsActive(true);

        Customer saved = customerRepository.save(customer);

        CustomerResponseDTO response = new CustomerResponseDTO();
        response.setCustomerId(saved.getId());
        response.setEmail(saved.getEmail());
        response.setFullName(saved.getFirstName() + " " + saved.getLastName());
        response.setIsActive(saved.getIsActive());
        response.setMessage("Cliente registrado exitosamente");

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerResponseDTO findById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente con id " + id + " no encontrado"));

        CustomerResponseDTO response = new CustomerResponseDTO();
        response.setCustomerId(customer.getId());
        response.setEmail(customer.getEmail());
        response.setFullName(customer.getFirstName() + " " + customer.getLastName());
        response.setIsActive(customer.getIsActive());
        response.setMessage("Cliente encontrado");

        return response;
    }
}
