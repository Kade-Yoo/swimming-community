package com.swimming.community.service

import com.swimming.community.domain.User
import com.swimming.community.dto.UserRegisterRequest
import com.swimming.community.dto.UserLoginRequest
import com.swimming.community.repository.UserRepository
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito.*
import org.mockito.kotlin.any
import java.util.*

class UserServiceTest {
    private lateinit var userRepository: UserRepository
    private lateinit var userService: UserService

    @BeforeEach
    fun setUp() {
        userRepository = mock(UserRepository::class.java)
        userService = UserService(userRepository)
    }

    @Test
    fun `회원가입 성공`() {
        val req = UserRegisterRequest("test@email.com", "pw1234")
        `when`(userRepository.findByEmail(req.email)).thenReturn(null)
        `when`(userRepository.save(any(User::class.java))).thenAnswer { it.arguments[0] as User }

        val res = userService.register(req)
        assertEquals(req.email, res.email)
    }

    @Test
    fun `회원가입 - 중복 이메일 예외`() {
        val req = UserRegisterRequest("dup@email.com", "pw1234")
        `when`(userRepository.findByEmail(req.email)).thenReturn(User(1, req.email, req.password))

        assertThrows<DuplicateEmailException> { userService.register(req) }
    }

    @Test
    fun `로그인 성공`() {
        val req = UserLoginRequest("login@email.com", "pw1234")
        val user = User(1, req.email, req.password)
        `when`(userRepository.findByEmail(req.email)).thenReturn(user)

        val res = userService.login(req)
        assertEquals(req.email, res.email)
    }

    @Test
    fun `로그인 - 이메일 없음`() {
        val req = UserLoginRequest("notfound@email.com", "pw1234")
        `when`(userRepository.findByEmail(req.email)).thenReturn(null)

        assertThrows<InvalidCredentialsException> { userService.login(req) }
    }

    @Test
    fun `로그인 - 비밀번호 불일치`() {
        val req = UserLoginRequest("login@email.com", "wrongpw")
        val user = User(1, req.email, "realpw")
        `when`(userRepository.findByEmail(req.email)).thenReturn(user)

        assertThrows<InvalidCredentialsException> { userService.login(req) }
    }
} 