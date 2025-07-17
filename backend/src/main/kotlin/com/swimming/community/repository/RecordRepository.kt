package com.swimming.community.repository

import com.swimming.community.domain.Record
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RecordRepository : JpaRepository<Record, Long> {
    fun findAllByUserEmail(userEmail: String): List<Record>
} 