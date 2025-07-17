package com.swimming.community.repository

import com.swimming.community.domain.GearReview
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GearReviewRepository : JpaRepository<GearReview, Long> {
    fun findAllByGearId(gearId: Long): List<GearReview>
} 