package com.swimming.community.domain

import jakarta.persistence.*

@Entity
@Table(name = "post_likes")
data class PostLike(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    val post: Post,

    @Column(nullable = false)
    val userEmail: String
) 