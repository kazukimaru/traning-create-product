package com.example.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDetailDTO {
    private Long id;
    private String name;
    private String area;
    private String genre;
    private String phoneNumber;
    private Boolean isSmoke;
    private Boolean isCourse;
    private Boolean isAycd;
    private Integer maxPeople;
    private Double rateAverage;
    private List<ReviewDTO> reviews;
}
