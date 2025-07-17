package com.swimming.community.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.boot.web.servlet.FilterRegistrationBean

@Configuration
class FilterConfig {
    @Bean
    fun jwtAuthFilterRegistration(): FilterRegistrationBean<JwtAuthFilter> {
        val registration = FilterRegistrationBean(JwtAuthFilter())
        registration.addUrlPatterns("/api/mypage/*") // 마이페이지 API 보호 예시
        registration.order = 1
        return registration
    }
} 