package com.swimming.community.service

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import java.util.*

object JwtUtil {
    private const val SECRET_KEY = "swimming_community_secret_2024" // 실제 운영 시 외부 주입 권장
    private const val EXPIRATION_MS = 1000 * 60 * 60 * 24 // 24시간

    fun generateToken(email: String): String {
        val now = Date()
        val expiry = Date(now.time + EXPIRATION_MS)
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact()
    }

    fun validateToken(token: String): Boolean = try {
        Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token)
        true
    } catch (e: JwtException) {
        false
    }

    fun getEmail(token: String): String? = try {
        val claims: Claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).body
        claims.subject
    } catch (e: Exception) {
        null
    }
} 