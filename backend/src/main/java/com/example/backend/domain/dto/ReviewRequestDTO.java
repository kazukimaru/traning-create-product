package com.example.backend.domain.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class ReviewRequestDTO {
    @NotNull
    private Long restaurantId;
    
    @NotBlank
    private String email;
    
    private String company; // For conditional registration
    
    private Long parentId;
    
    @NotBlank
    private String content;
    
    private Integer rate;
    private Integer numberOfPeople;
}
