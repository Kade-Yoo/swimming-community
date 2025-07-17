package com.swimming.community.controller

import com.swimming.community.dto.GuideResponse
import com.swimming.community.service.GuideService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/guides")
class GuideController(
    private val guideService: GuideService
) {
    @GetMapping
    fun getAll(): ResponseEntity<List<GuideResponse>> =
        ResponseEntity.ok(guideService.getAll())

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): ResponseEntity<GuideResponse> =
        ResponseEntity.ok(guideService.getById(id))
} 