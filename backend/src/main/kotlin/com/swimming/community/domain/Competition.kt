package com.swimming.community.domain

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "competitions")
data class Competition(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false)
    val date: LocalDate,

    @Column(nullable = false)
    val location: String,

    @Column(nullable = false)
    val description: String,

    @Column(nullable = true)
    var result: String? = null
) 