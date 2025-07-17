package com.swimming.community.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "guides")
data class Guide(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val title: String,

    @Column(nullable = false, columnDefinition = "TEXT")
    val content: String,

    @Column(nullable = false)
    val category: String,

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
) 