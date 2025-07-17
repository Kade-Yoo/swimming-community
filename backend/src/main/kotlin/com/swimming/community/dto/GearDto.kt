package com.swimming.community.dto

import com.swimming.community.domain.Gear
import com.swimming.community.domain.GearReview
import java.time.LocalDateTime

// 장비 상세/목록 응답

data class GearResponse(
    val id: Long,
    val name: String,
    val brand: String,
    val category: String,
    val description: String,
    val reviews: List<GearReviewResponse>
) {
    companion object {
        fun from(entity: Gear): GearResponse =
            GearResponse(
                id = entity.id,
                name = entity.name,
                brand = entity.brand,
                category = entity.category,
                description = entity.description,
                reviews = entity.reviews.map { GearReviewResponse.from(it) }
            )
    }
}

data class GearReviewResponse(
    val id: Long,
    val userEmail: String,
    val rating: Int,
    val comment: String,
    val createdAt: LocalDateTime
) {
    companion object {
        fun from(entity: GearReview): GearReviewResponse =
            GearReviewResponse(
                id = entity.id,
                userEmail = entity.userEmail,
                rating = entity.rating,
                comment = entity.comment,
                createdAt = entity.createdAt
            )
    }
}

data class GearReviewCreateRequest(
    val rating: Int,
    val comment: String
) 