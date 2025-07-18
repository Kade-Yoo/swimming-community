package com.swimming.community.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
class SecurityConfig {
    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }
            .sessionManagement { it.disable() }
            .formLogin { it.disable() }
            .httpBasic { it.disable() }
            .authorizeHttpRequests {
                it
                    .requestMatchers(
                        "/api/users/login",
                        "/api/users/register",
                        "/swagger-ui.html",
                        "/swagger-ui/**",
                        "/v3/api-docs/**"
                    ).permitAll()
                    .anyRequest().authenticated()
            }
            .addFilterBefore(JwtAuthFilter(), UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }
} 