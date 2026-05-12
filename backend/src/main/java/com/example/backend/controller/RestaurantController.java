package com.example.backend.controller;

import com.example.backend.domain.dto.RestaurantDetailDTO;
import com.example.backend.domain.dto.RestaurantListDTO;
import com.example.backend.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class RestaurantController {
    private final RestaurantService restaurantService;

    @GetMapping
    public List<RestaurantListDTO> getAll() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/{id}")
    public RestaurantDetailDTO getById(@PathVariable Long id) {
        return restaurantService.getRestaurantDetails(id);
    }
}
