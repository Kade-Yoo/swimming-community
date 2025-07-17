package com.swimming.community.controller

import com.swimming.community.dto.CompetitionCreateRequest
import com.swimming.community.dto.CompetitionResponse
import com.swimming.community.dto.CompetitionResultRequest
import com.swimming.community.service.CompetitionService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/competitions")
class CompetitionController(
    private val competitionService: CompetitionService
) {
    @GetMapping
    fun getAll(): ResponseEntity<List<CompetitionResponse>> =
        ResponseEntity.ok(competitionService.getAll())

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): ResponseEntity<CompetitionResponse> =
        ResponseEntity.ok(competitionService.getById(id))

    @PostMapping
    fun create(@RequestBody req: CompetitionCreateRequest): ResponseEntity<CompetitionResponse> =
        ResponseEntity.ok(competitionService.create(req))

    @PostMapping("/{id}/result")
    fun updateResult(@PathVariable id: Long, @RequestBody req: CompetitionResultRequest): ResponseEntity<CompetitionResponse> =
        ResponseEntity.ok(competitionService.updateResult(id, req))
} 