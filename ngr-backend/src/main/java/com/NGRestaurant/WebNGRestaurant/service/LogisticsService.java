package com.NGRestaurant.WebNGRestaurant.service;

import com.NGRestaurant.WebNGRestaurant.dto.logistic.DispatchCreateRequestDTO;
import com.NGRestaurant.WebNGRestaurant.dto.logistic.DispatchResponseDTO;
import com.NGRestaurant.WebNGRestaurant.dto.logistic.DispatchUpdateRequestDTO;
import com.NGRestaurant.WebNGRestaurant.model.DeliveryDispatch;
import com.NGRestaurant.WebNGRestaurant.model.Driver;
import com.NGRestaurant.WebNGRestaurant.model.Employee;
import com.NGRestaurant.WebNGRestaurant.repository.DeliveryDispatchRepository;
import com.NGRestaurant.WebNGRestaurant.repository.DriverRepository;
import com.NGRestaurant.WebNGRestaurant.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LogisticsService implements InterfaceLogisticsService {

    private final DeliveryDispatchRepository deliveryDispatchRepository;
    private final DriverRepository driverRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public DispatchResponseDTO createDispatch(DispatchCreateRequestDTO req) {
        DeliveryDispatch dispatch = new DeliveryDispatch();
        dispatch.setOrderId(req.getOrderId());
        dispatch.setDeliveryAddress(req.getDeliveryAddress());
        dispatch.setLatitude(req.getLatitude());
        dispatch.setLongitude(req.getLongitude());
        dispatch.setDispatchStatus("PENDING");
        dispatch.setEstimatedArrivalTime(LocalDateTime.now().plusMinutes(40));

        List<Driver> availableDrivers = driverRepository.findByIsAvailableTrue();
        if (!availableDrivers.isEmpty()) {
            Driver driver = availableDrivers.get(0);
            dispatch.setDriverId(driver.getEmployeeId());
            dispatch.setDispatchStatus("ASSIGNED");
            driver.setIsAvailable(false);
            driverRepository.save(driver);
        }

        DeliveryDispatch saved = deliveryDispatchRepository.save(dispatch);

        DispatchResponseDTO response = new DispatchResponseDTO();
        response.setDispatchId(saved.getId());
        response.setOrderId(saved.getOrderId());
        response.setDispatchStatus(saved.getDispatchStatus());
        response.setEstimatedArrivalTime(saved.getEstimatedArrivalTime());

        if (saved.getDriverId() != null) {
            Driver assignedDriver = driverRepository.findById(saved.getDriverId())
                    .orElse(null);
            if (assignedDriver != null) {
                response.setVehiclePlate(assignedDriver.getVehiclePlate());
                Employee employee = employeeRepository.findById(assignedDriver.getEmployeeId())
                        .orElse(null);
                if (employee != null) {
                    response.setDriverName(employee.getName());
                }
            }
        }

        String msg = "ASSIGNED".equals(saved.getDispatchStatus())
                ? "Despacho creado y repartidor asignado"
                : "Despacho creado en espera de repartidor disponible";
        response.setMessage(msg);

        return response;
    }

    @Override
    public DispatchResponseDTO updateStatus(DispatchUpdateRequestDTO req) {
        DeliveryDispatch dispatch = deliveryDispatchRepository.findById(req.getDispatchId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Despacho con id " + req.getDispatchId() + " no encontrado"));

        dispatch.setDispatchStatus(req.getStatus());

        if (req.getDriverId() != null) {
            dispatch.setDriverId(req.getDriverId());
        }

        if ("DELIVERED".equals(req.getStatus()) && dispatch.getDriverId() != null) {
            Driver driver = driverRepository.findById(dispatch.getDriverId())
                    .orElse(null);
            if (driver != null) {
                driver.setIsAvailable(true);
                driverRepository.save(driver);
            }
        }

        DeliveryDispatch saved = deliveryDispatchRepository.save(dispatch);

        DispatchResponseDTO response = new DispatchResponseDTO();
        response.setDispatchId(saved.getId());
        response.setOrderId(saved.getOrderId());
        response.setDispatchStatus(saved.getDispatchStatus());
        response.setEstimatedArrivalTime(saved.getEstimatedArrivalTime());

        if (saved.getDriverId() != null) {
            Driver assignedDriver = driverRepository.findById(saved.getDriverId())
                    .orElse(null);
            if (assignedDriver != null) {
                response.setVehiclePlate(assignedDriver.getVehiclePlate());
                Employee employee = employeeRepository.findById(assignedDriver.getEmployeeId())
                        .orElse(null);
                if (employee != null) {
                    response.setDriverName(employee.getName());
                }
            }
        }

        response.setMessage("Estado de despacho actualizado a " + req.getStatus());

        return response;
    }
}
