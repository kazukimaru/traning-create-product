package com.example.backend.service;

import com.example.backend.domain.dto.ReviewRequestDTO;
import com.example.backend.domain.entity.Review;
import com.example.backend.domain.entity.User;
import com.example.backend.domain.repository.ReviewRepository;
import com.example.backend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Transactional
    public void postReview(ReviewRequestDTO req) {
        // Register company if provided and user doesn't exist
        userRepository.findById(req.getEmail()).orElseGet(() -> {
            if (req.getCompany() != null && !req.getCompany().isEmpty()) {
                return userRepository.save(User.builder().email(req.getEmail()).company(req.getCompany()).build());
            }
            return userRepository.save(User.builder().email(req.getEmail()).company("Unknown").build());
        });

        Review review = Review.builder()
            .restaurantId(req.getRestaurantId())
            .email(req.getEmail())
            .parentId(req.getParentId())
            .content(req.getContent())
            .rate(req.getRate() != null ? req.getRate() : 0)
            .numberOfPeople(req.getNumberOfPeople() != null ? req.getNumberOfPeople() : 0)
            .createdAt(LocalDateTime.now())
            .build();

        reviewRepository.save(review);
    }
}
