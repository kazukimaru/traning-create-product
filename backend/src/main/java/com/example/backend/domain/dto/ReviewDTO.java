package com.example.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Long id;
    private String userName;
    private String company;
    private String reviewBody;
    private Integer rate;
    private Integer numberOfPeople;
    private LocalDateTime reviewTime;
    private Long parentId;
    
    @Builder.Default
    private List<ReviewDTO> replies = new ArrayList<>();
}
