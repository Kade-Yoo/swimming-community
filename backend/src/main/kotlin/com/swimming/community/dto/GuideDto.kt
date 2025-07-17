package com.swimming.community.dto

import com.swimming.community.domain.Guide
import java.time.LocalDateTime

data class GuideResponse(
    val id: Long,
    val title: String,
    val content: String,
    val category: String,
    val createdAt: LocalDateTime
) {
    companion object {
        fun from(entity: Guide): GuideResponse =
            GuideResponse(
                id = entity.id,
                title = entity.title,
                content = entity.content,
                category = entity.category,
                createdAt = entity.createdAt
            )
    }
} 