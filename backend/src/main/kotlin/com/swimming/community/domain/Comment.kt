package com.swimming.community.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "comments")
data class Comment(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    val post: Post,

    @Column(nullable = false)
    val userEmail: String,

    @Column(nullable = false, columnDefinition = "TEXT")
    val content: String,

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
) 