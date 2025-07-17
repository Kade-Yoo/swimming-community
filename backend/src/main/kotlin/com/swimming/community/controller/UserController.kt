package com.swimming.community.controller

import com.swimming.community.dto.UserRegisterRequest
import com.swimming.community.dto.UserLoginRequest
import com.swimming.community.dto.UserResponse
import com.swimming.community.repository.UserRepository
import com.swimming.community.service.UserService
import com.swimming.community.service.JwtUtil
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import jakarta.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService,
    private val userRepository: UserRepository
) {
    @PostMapping("/register")
    fun register(@RequestBody req: UserRegisterRequest): ResponseEntity<UserResponse> {
        val user = userService.register(req)
        return ResponseEntity.ok(user)
    }

    @PostMapping("/login")
    fun login(@RequestBody req: UserLoginRequest): ResponseEntity<UserResponse> {
        val user = userService.login(req)
        return ResponseEntity.ok(user)
    }

    @GetMapping("/mypage")
    fun myPage(request: HttpServletRequest): ResponseEntity<UserResponse> {
        val authHeader = request.getHeader("Authorization") ?: return ResponseEntity.status(401).build()
        if (!authHeader.startsWith("Bearer ")) return ResponseEntity.status(401).build()
        val token = authHeader.substring(7)
        val email = JwtUtil.getEmail(token) ?: return ResponseEntity.status(401).build()
        val user = userRepository.findByEmail(email) ?: return ResponseEntity.status(404).build()
        return ResponseEntity.ok(UserResponse.from(user))
    }
} 