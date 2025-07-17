package com.swimming.community.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.swimming.community.dto.UserLoginRequest
import com.swimming.community.dto.UserRegisterRequest
import com.swimming.community.repository.UserRepository
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.post

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest @Autowired constructor(
    val mockMvc: MockMvc,
    val objectMapper: ObjectMapper,
    val userRepository: UserRepository
) {
    @AfterEach
    fun clean() {
        userRepository.deleteAll()
    }

    @Test
    fun `회원가입 성공`() {
        val req = UserRegisterRequest("api@email.com", "pw1234")
        mockMvc.post("/api/users/register") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(req)
        }.andExpect {
            status { isOk() }
            jsonPath("$.email") { value("api@email.com") }
        }
    }

    @Test
    fun `회원가입 - 중복 이메일`() {
        val req = UserRegisterRequest("dup@email.com", "pw1234")
        userRepository.save(com.swimming.community.domain.User(email = req.email, password = req.password))
        mockMvc.post("/api/users/register") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(req)
        }.andExpect {
            status { isBadRequest() }
            jsonPath("$.error") { exists() }
        }
    }

    @Test
    fun `로그인 성공`() {
        val email = "login@email.com"
        val password = "pw1234"
        userRepository.save(com.swimming.community.domain.User(email = email, password = password))
        val req = UserLoginRequest(email, password)
        mockMvc.post("/api/users/login") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(req)
        }.andExpect {
            status { isOk() }
            jsonPath("$.email") { value(email) }
        }
    }

    @Test
    fun `로그인 - 이메일 없음`() {
        val req = UserLoginRequest("notfound@email.com", "pw1234")
        mockMvc.post("/api/users/login") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(req)
        }.andExpect {
            status { isUnauthorized() }
            jsonPath("$.error") { exists() }
        }
    }

    @Test
    fun `로그인 - 비밀번호 불일치`() {
        val email = "login@email.com"
        userRepository.save(com.swimming.community.domain.User(email = email, password = "realpw"))
        val req = UserLoginRequest(email, "wrongpw")
        mockMvc.post("/api/users/login") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(req)
        }.andExpect {
            status { isUnauthorized() }
            jsonPath("$.error") { exists() }
        }
    }
} 