package com.swimming.community.controller

import com.swimming.community.dto.GearResponse
import com.swimming.community.dto.GearReviewCreateRequest
import com.swimming.community.dto.GearReviewResponse
import com.swimming.community.service.GearService
import com.swimming.community.service.JwtUtil
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import jakarta.servlet.http.HttpServletRequest

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
    fun addReview(@PathVariable id: Long, @RequestBody req: GearReviewCreateRequest, request: HttpServletRequest): ResponseEntity<GearReviewResponse> {
        val email = extractEmail(request) ?: return ResponseEntity.status(401).build()
        return ResponseEntity.ok(gearService.addReview(id, email, req))
    }

    @GetMapping("/recommend")
    fun recommend(): ResponseEntity<List<GearResponse>> =
        ResponseEntity.ok(gearService.recommend())

    private fun extractEmail(request: HttpServletRequest): String? {
        val authHeader = request.getHeader("Authorization") ?: return null
        if (!authHeader.startsWith("Bearer ")) return null
        return JwtUtil.getEmail(authHeader.substring(7))
    }
} 