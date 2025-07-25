package com.swimming.community.controller

import com.swimming.community.dto.GearResponse
import com.swimming.community.dto.GearReviewCreateRequest
import com.swimming.community.dto.GearReviewResponse
import com.swimming.community.service.GearService
import com.swimming.community.service.JwtUtil
import com.swimming.community.service.JwtUtil.extractEmail
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus

@RestController
@RequestMapping("/api/gears")
class GearController(
    private val gearService: GearService
) {
    @GetMapping
    fun getAll(): ResponseEntity<List<GearResponse>> =
        ResponseEntity.ok(gearService.getAll())

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): ResponseEntity<GearResponse> =
        ResponseEntity.ok(gearService.getById(id))

    @PostMapping("/{id}/reviews")
    fun addReview(@RequestHeader("Authorization") token: String,
                  @PathVariable id: Long,
                  @RequestBody req: GearReviewCreateRequest): ResponseEntity<GearReviewResponse> {
        val email = extractEmail(token) ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        return ResponseEntity.ok(gearService.addReview(id, email, req))
    }

    @GetMapping("/recommend")
    fun recommend(): ResponseEntity<List<GearResponse>> =
        ResponseEntity.ok(gearService.recommend())
}