package com.swimming.community.domain

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "records")
data class Record(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val userEmail: String,

    @Column(nullable = false)
    val event: String,

    @Column(nullable = false)
    val recordTime: String,

    @Column(nullable = false)
    val date: LocalDate,

    @Column(nullable = true)
    val memo: String? = null
) 