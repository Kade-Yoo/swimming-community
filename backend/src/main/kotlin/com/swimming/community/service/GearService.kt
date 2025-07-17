package com.swimming.community.service

import com.swimming.community.domain.Gear
import com.swimming.community.domain.GearReview
import com.swimming.community.dto.GearResponse
import com.swimming.community.dto.GearReviewCreateRequest
import com.swimming.community.dto.GearReviewResponse
import com.swimming.community.repository.GearRepository
import com.swimming.community.repository.GearReviewRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class GearService(
    private val gearRepository: GearRepository,
    private val gearReviewRepository: GearReviewRepository
) {
    fun getAll(): List<GearResponse> =
        gearRepository.findAll().map { GearResponse.from(it) }

    fun getById(id: Long): GearResponse =
        gearRepository.findById(id)
            .map { GearResponse.from(it) }
            .orElseThrow { NoSuchElementException("장비를 찾을 수 없습니다.") }

    @Transactional
    fun addReview(gearId: Long, userEmail: String, req: GearReviewCreateRequest): GearReviewResponse {
        val gear = gearRepository.findById(gearId)
            .orElseThrow { NoSuchElementException("장비를 찾을 수 없습니다.") }
        val review = GearReview(
            gear = gear,
            userEmail = userEmail,
            rating = req.rating,
            comment = req.comment
        )
        return GearReviewResponse.from(gearReviewRepository.save(review))
    }

    fun recommend(): List<GearResponse> {
        // 평점 평균이 높은 순 3개 추천
        val gears = gearRepository.findAll()
        return gears.sortedByDescending { gear ->
            val reviews = gear.reviews
            if (reviews.isEmpty()) 0.0 else reviews.map { it.rating }.average()
        }.take(3).map { GearResponse.from(it) }
    }
} 