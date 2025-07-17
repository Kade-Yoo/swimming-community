package com.swimming.community.dto

import com.swimming.community.domain.Competition
import java.time.LocalDate

data class CompetitionResponse(
    val id: Long,
    val name: String,
    val date: LocalDate,
    val location: String,
    val description: String,
    val result: String?
) {
    companion object {
        fun from(entity: Competition): CompetitionResponse =
            CompetitionResponse(
                id = entity.id,
                name = entity.name,
                date = entity.date,
                location = entity.location,
                description = entity.description,
                result = entity.result
            )
    }
}

data class CompetitionCreateRequest(
    val name: String,
    val date: LocalDate,
    val location: String,
    val description: String
)

data class CompetitionResultRequest(
    val result: String
) 