package com.example.backend.service;

import com.example.backend.domain.dto.RestaurantDetailDTO;
import com.example.backend.domain.dto.RestaurantListDTO;
import com.example.backend.domain.dto.ReviewDTO;
import com.example.backend.domain.entity.Restaurant;
import com.example.backend.domain.entity.Review;
import com.example.backend.domain.entity.User;
import com.example.backend.domain.repository.RestaurantRepository;
import com.example.backend.domain.repository.ReviewRepository;
import com.example.backend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public List<RestaurantListDTO> getAllRestaurants() {
        return restaurantRepository.findAll().stream().map(r -> {
            List<Review> reviews = reviewRepository.findByRestaurantId(r.getId());
            int maxPeople = reviews.stream().mapToInt(Review::getNumberOfPeople).max().orElse(r.getMaxPeople() != null ? r.getMaxPeople() : 0);
            double avgRate = reviews.stream().mapToInt(Review::getRate).average().orElse(0.0);
            
            return RestaurantListDTO.builder()
                .id(r.getId())
                .name(r.getName())
                .area(r.getArea())
                .genre(r.getGenre())
                .isSmoke(r.getIsSmoke())
                .isCourse(r.getIsCourse())
                .isAycd(r.getIsAycd())
                .maxPeople(maxPeople)
                .rateAverage(avgRate)
                .build();
        }).collect(Collectors.toList());
    }

    public RestaurantDetailDTO getRestaurantDetails(Long id) {
        Restaurant r = restaurantRepository.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found"));
        List<Review> reviews = reviewRepository.findByRestaurantIdOrderByCreatedAtDesc(id);
        
        int maxPeople = reviews.stream().mapToInt(Review::getNumberOfPeople).max().orElse(r.getMaxPeople() != null ? r.getMaxPeople() : 0);
        double avgRate = reviews.stream().mapToInt(Review::getRate).average().orElse(0.0);

        // Fetch users to get company names
        List<String> emails = reviews.stream().map(Review::getEmail).distinct().collect(Collectors.toList());
        Map<String, User> userMap = userRepository.findAllById(emails).stream().collect(Collectors.toMap(User::getEmail, u -> u));

        // Create map of ReviewDTOs
        Map<Long, ReviewDTO> dtoMap = reviews.stream().collect(Collectors.toMap(Review::getId, review -> {
            User u = userMap.get(review.getEmail());
            return ReviewDTO.builder()
                .id(review.getId())
                .userName(review.getEmail())
                .company(u != null ? u.getCompany() : "")
                .reviewBody(review.getContent())
                .rate(review.getRate())
                .numberOfPeople(review.getNumberOfPeople())
                .reviewTime(review.getCreatedAt())
                .parentId(review.getParentId())
                .build();
        }));

        // Organize into 1-level tree (YouTube style)
        List<ReviewDTO> rootReviews = dtoMap.values().stream()
            .filter(dto -> dto.getParentId() == null)
            .collect(Collectors.toList());

        for (ReviewDTO dto : dtoMap.values()) {
            if (dto.getParentId() != null) {
                ReviewDTO parent = dtoMap.get(dto.getParentId());
                if (parent != null) {
                    // Prevent deeper nesting (only attach if parent itself is root)
                    if (parent.getParentId() == null) {
                        parent.getReplies().add(dto);
                    }
                }
            }
        }

        // sort replies by created time
        for (ReviewDTO root : rootReviews) {
            root.getReplies().sort((r1, r2) -> r1.getReviewTime().compareTo(r2.getReviewTime()));
        }

        return RestaurantDetailDTO.builder()
            .id(r.getId())
            .name(r.getName())
            .area(r.getArea())
            .genre(r.getGenre())
            .phoneNumber(r.getPhoneNumber())
            .isSmoke(r.getIsSmoke())
            .isCourse(r.getIsCourse())
            .isAycd(r.getIsAycd())
            .maxPeople(maxPeople)
            .rateAverage(avgRate)
            .reviews(rootReviews)
            .build();
    }
}
