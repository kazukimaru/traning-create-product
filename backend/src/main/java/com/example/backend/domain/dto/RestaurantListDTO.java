package com.example.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantListDTO {
    private Long id;
    private String name;
    private String area;
    private String genre;
    private Boolean isSmoke;
    private Boolean isCourse;
    private Boolean isAycd;
    private Integer maxPeople;
    private Double rateAverage;
}
