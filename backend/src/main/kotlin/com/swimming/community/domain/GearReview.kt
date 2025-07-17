package com.swimming.community.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "gear_reviews")
data class GearReview(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gear_id")
    val gear: Gear,

    @Column(nullable = false)
    val userEmail: String,

    @Column(nullable = false)
    val rating: Int,

    @Column(nullable = false)
    val comment: String,

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
) 