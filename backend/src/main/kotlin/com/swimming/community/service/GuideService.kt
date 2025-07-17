package com.swimming.community.service

import com.swimming.community.dto.GuideResponse
import com.swimming.community.repository.GuideRepository
import org.springframework.stereotype.Service

@Service
class GuideService(
    private val guideRepository: GuideRepository
) {
    fun getAll(): List<GuideResponse> =
        guideRepository.findAll().map { GuideResponse.from(it) }

    fun getById(id: Long): GuideResponse =
        guideRepository.findById(id)
            .map { GuideResponse.from(it) }
            .orElseThrow { NoSuchElementException("가이드를 찾을 수 없습니다.") }
} 