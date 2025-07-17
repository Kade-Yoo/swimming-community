package com.swimming.community.controller

import com.swimming.community.dto.CommentCreateRequest
import com.swimming.community.dto.CommentResponse
import com.swimming.community.dto.PostCreateRequest
import com.swimming.community.dto.PostResponse
import com.swimming.community.service.CommunityService
import com.swimming.community.service.JwtUtil
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import jakarta.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/api/posts")
class CommunityController(
    private val communityService: CommunityService
) {
    @GetMapping
    fun getAll(): ResponseEntity<List<PostResponse>> =
        ResponseEntity.ok(communityService.getAll())

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): ResponseEntity<PostResponse> =
        ResponseEntity.ok(communityService.getById(id))

    @PostMapping
    fun create(@RequestBody req: PostCreateRequest, request: HttpServletRequest): ResponseEntity<PostResponse> {
        val email = extractEmail(request) ?: return ResponseEntity.status(401).build()
        return ResponseEntity.ok(communityService.create(email, req))
    }

    @PostMapping("/{id}/comments")
    fun addComment(@PathVariable id: Long, @RequestBody req: CommentCreateRequest, request: HttpServletRequest): ResponseEntity<CommentResponse> {
        val email = extractEmail(request) ?: return ResponseEntity.status(401).build()
        return ResponseEntity.ok(communityService.addComment(id, email, req))
    }

    @PostMapping("/{id}/like")
    fun like(@PathVariable id: Long, request: HttpServletRequest): ResponseEntity<Void> {
        val email = extractEmail(request) ?: return ResponseEntity.status(401).build()
        communityService.like(id, email)
        return ResponseEntity.noContent().build()
    }

    private fun extractEmail(request: HttpServletRequest): String? {
        val authHeader = request.getHeader("Authorization") ?: return null
        if (!authHeader.startsWith("Bearer ")) return null
        return JwtUtil.getEmail(authHeader.substring(7))
    }
} 