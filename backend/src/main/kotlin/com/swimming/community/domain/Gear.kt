package com.swimming.community.domain

import jakarta.persistence.*

@Entity
@Table(name = "gears")
data class Gear(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false)
    val brand: String,

    @Column(nullable = false)
    val category: String,

    @Column(nullable = false)
    val description: String,

    @OneToMany(mappedBy = "gear", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val reviews: List<GearReview> = emptyList()
) 