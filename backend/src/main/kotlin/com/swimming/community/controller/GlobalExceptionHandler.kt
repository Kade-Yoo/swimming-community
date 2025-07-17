package com.swimming.community.controller

import com.swimming.community.service.DuplicateEmailException
import com.swimming.community.service.InvalidCredentialsException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(DuplicateEmailException::class)
    fun handleDuplicateEmail(): ResponseEntity<Map<String, String>> =
        ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(mapOf("error" to "이미 존재하는 이메일입니다."))

    @ExceptionHandler(InvalidCredentialsException::class)
    fun handleInvalidCredentials(): ResponseEntity<Map<String, String>> =
        ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(mapOf("error" to "이메일 또는 비밀번호가 올바르지 않습니다."))
} 