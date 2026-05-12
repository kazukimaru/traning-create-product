package com.example.backend.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long restaurantId;
    
    private String email;
    
    @Column(name = "parent_id")
    private Long parentId;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    private Integer rate;
    private Integer numberOfPeople;
    
    private LocalDateTime createdAt;
}
