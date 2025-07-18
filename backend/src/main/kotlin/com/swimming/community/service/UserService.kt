package com.swimming.community.service

import com.swimming.community.domain.User
import com.swimming.community.dto.UserRegisterRequest
import com.swimming.community.dto.UserLoginRequest
import com.swimming.community.dto.UserResponse
import com.swimming.community.repository.UserRepository
import org.springframework.stereotype.Service

class DuplicateEmailException : RuntimeException()
class InvalidCredentialsException : RuntimeException()

@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun register(request: UserRegisterRequest): UserResponse {
        if (userRepository.findByEmail(request.email) != null) {
            throw DuplicateEmailException()
        }
        val user = User(
            email = request.email,
            password = request.password
        )
        val saved = userRepository.save(user)
        val token = JwtUtil.generateToken(saved.email)
        return UserResponse(saved, token)
    }

    fun login(request: UserLoginRequest): UserResponse {
        val user = userRepository.findByEmail(request.email)
            ?: throw InvalidCredentialsException()
        if (user.password != request.password) {
            throw InvalidCredentialsException()
        }
        val token = JwtUtil.generateToken(user.email)
        return UserResponse(user, token)
    }
} 