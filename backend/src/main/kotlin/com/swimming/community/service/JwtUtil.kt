package com.swimming.community.service

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import java.util.*

object JwtUtil {
    private const val SECRET_KEY = "9b5c0ae365789a0395ad8378e8a9f3cccebfac9d029c07d068502569839743ac" // 실제 운영 시 외부 주입 권장
    private const val EXPIRATION_MS = 1000 * 60 * 60 * 24 // 24시간

    fun generateToken(email: String): String {
        val now = Date()
        val expiry = Date(now.time + EXPIRATION_MS)
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY)), SignatureAlgorithm.HS256)
            .compact()
    }

    fun validateToken(token: String): Boolean = try {
        Jwts.parserBuilder()
            .setSigningKey(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY)))
            .build()
            .parseClaimsJws(token)

        true
    } catch (e: JwtException) {
        false
    }

    fun getEmail(token: String): String? = try {
        val claims: Claims =
            Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY))).build()
                .parseClaimsJws(token).body
        claims.subject
    } catch (e: Exception) {
        null
    }
} 