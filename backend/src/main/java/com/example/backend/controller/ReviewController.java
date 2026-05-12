package com.example.backend.controller;

import com.example.backend.domain.dto.ReviewRequestDTO;
import com.example.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public void postReview(@RequestBody @Valid ReviewRequestDTO req) {
        reviewService.postReview(req);
    }
}
