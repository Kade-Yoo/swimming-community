package com.swimming.community.controller

import com.swimming.community.dto.CommentCreateRequest
import com.swimming.community.dto.CommentResponse
import com.swimming.community.dto.PostCreateRequest
import com.swimming.community.dto.PostResponse
import com.swimming.community.service.CommunityService
import com.swimming.community.service.JwtUtil
import com.swimming.community.service.JwtUtil.extractEmail
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus

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
    fun create(@RequestHeader("Authorization") token: String,
               @RequestBody req: PostCreateRequest): ResponseEntity<PostResponse> {
        val email = extractEmail(token) ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        return ResponseEntity.ok(communityService.create(email, req))
    }

    @PostMapping("/{id}/comments")
    fun addComment(@RequestHeader("Authorization") token: String,
                   @PathVariable id: Long,
                   @RequestBody req: CommentCreateRequest): ResponseEntity<CommentResponse> {
        val email = extractEmail(token) ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        return ResponseEntity.ok(communityService.addComment(id, email, req))
    }

    @PostMapping("/{id}/like")
    fun like(@RequestHeader("Authorization") token: String,
             @PathVariable id: Long): ResponseEntity<Void> {
        val email = extractEmail(token) ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        communityService.like(id, email)
        return ResponseEntity.noContent().build()
    }
}