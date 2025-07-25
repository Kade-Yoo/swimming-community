package com.swimming.community.controller

import com.swimming.community.dto.RecordCreateRequest
import com.swimming.community.dto.RecordResponse
import com.swimming.community.service.JwtUtil
import com.swimming.community.service.JwtUtil.extractEmail
import com.swimming.community.service.RecordService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/records")
class RecordController(
    private val recordService: RecordService
) {
    @GetMapping("/my")
    fun getMyRecords(@RequestHeader("Authorization") token: String): ResponseEntity<List<RecordResponse>> {
        val email = extractEmail(token) ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        return ResponseEntity.ok(recordService.getMyRecords(email))
    }

    @PostMapping
    fun create(@RequestHeader("Authorization") token: String,
               @RequestBody req: RecordCreateRequest): ResponseEntity<RecordResponse> {
        val email = extractEmail(token) ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        return ResponseEntity.ok(recordService.create(email, req))
    }

    @DeleteMapping("/{id}")
    fun delete(@RequestHeader("Authorization") token: String,
               @PathVariable id: Long): ResponseEntity<Void> {
        val email = extractEmail(token) ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        recordService.delete(email, id)
        return ResponseEntity.noContent().build()
    }
}