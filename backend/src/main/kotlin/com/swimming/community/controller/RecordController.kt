package com.swimming.community.controller

import com.swimming.community.dto.RecordCreateRequest
import com.swimming.community.dto.RecordResponse
import com.swimming.community.service.JwtUtil
import com.swimming.community.service.RecordService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import jakarta.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/api/records")
class RecordController(
    private val recordService: RecordService
) {
    @GetMapping("/my")
    fun getMyRecords(request: HttpServletRequest): ResponseEntity<List<RecordResponse>> {
        val email = extractEmail(request) ?: return ResponseEntity.status(401).build()
        return ResponseEntity.ok(recordService.getMyRecords(email))
    }

    @PostMapping
    fun create(@RequestBody req: RecordCreateRequest, request: HttpServletRequest): ResponseEntity<RecordResponse> {
        val email = extractEmail(request) ?: return ResponseEntity.status(401).build()
        return ResponseEntity.ok(recordService.create(email, req))
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long, request: HttpServletRequest): ResponseEntity<Void> {
        val email = extractEmail(request) ?: return ResponseEntity.status(401).build()
        recordService.delete(email, id)
        return ResponseEntity.noContent().build()
    }

    private fun extractEmail(request: HttpServletRequest): String? {
        val authHeader = request.getHeader("Authorization") ?: return null
        if (!authHeader.startsWith("Bearer ")) return null
        return JwtUtil.getEmail(authHeader.substring(7))
    }
} 