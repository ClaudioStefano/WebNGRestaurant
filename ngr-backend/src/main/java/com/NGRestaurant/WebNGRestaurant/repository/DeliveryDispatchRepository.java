package com.NGRestaurant.WebNGRestaurant.repository;

import com.NGRestaurant.WebNGRestaurant.model.DeliveryDispatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeliveryDispatchRepository extends JpaRepository<DeliveryDispatch, Long> {

    Optional<DeliveryDispatch> findByOrderId(Long orderId);
}
