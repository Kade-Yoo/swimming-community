package com.swimming.community.service

import com.swimming.community.domain.Competition
import com.swimming.community.dto.CompetitionCreateRequest
import com.swimming.community.dto.CompetitionResponse
import com.swimming.community.dto.CompetitionResultRequest
import com.swimming.community.repository.CompetitionRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CompetitionService(
    private val competitionRepository: CompetitionRepository
) {
    fun getAll(): List<CompetitionResponse> =
        competitionRepository.findAll().map { CompetitionResponse.from(it) }

    fun getById(id: Long): CompetitionResponse =
        competitionRepository.findById(id)
            .map { CompetitionResponse.from(it) }
            .orElseThrow { NoSuchElementException("대회를 찾을 수 없습니다.") }

    @Transactional
    fun create(request: CompetitionCreateRequest): CompetitionResponse {
        val entity = Competition(
            name = request.name,
            date = request.date,
            location = request.location,
            description = request.description
        )
        return CompetitionResponse.from(competitionRepository.save(entity))
    }

    @Transactional
    fun updateResult(id: Long, request: CompetitionResultRequest): CompetitionResponse {
        val entity = competitionRepository.findById(id)
            .orElseThrow { NoSuchElementException("대회를 찾을 수 없습니다.") }
        entity.result = request.result
        return CompetitionResponse.from(entity)
    }
} 