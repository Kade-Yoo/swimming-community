package com.swimming.community.config

import com.swimming.community.service.JwtUtil
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException

class JwtAuthFilter : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader("Authorization")
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            val token = authHeader.substring(7)
            if (!JwtUtil.validateToken(token)) {
                response.status = HttpServletResponse.SC_UNAUTHORIZED
                response.contentType = "application/json"
                response.writer.write("{\"error\":\"유효하지 않은 토큰입니다.\"}")
                return
            }
            // 필요시 request attribute에 email 등 저장 가능
        }
        filterChain.doFilter(request, response)
    }
} 