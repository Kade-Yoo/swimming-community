package com.swimming.community.dto

import com.swimming.community.domain.User
import java.time.LocalDateTime

data class UserRegisterRequest(
    val email: String,
    val password: String
)

data class UserLoginRequest(
    val email: String,
    val password: String
)

data class UserResponse(
    val id: Long,
    val email: String,
    val createdAt: LocalDateTime,
    val token: String? = null
) {
    constructor(user: User, token: String? = null) : this(
        id = user.id,
        email = user.email,
        createdAt = user.createdAt,
        token = token
    )
}