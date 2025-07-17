package com.swimming.community.service

import com.swimming.community.domain.Record
import com.swimming.community.dto.RecordCreateRequest
import com.swimming.community.dto.RecordResponse
import com.swimming.community.repository.RecordRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class RecordService(
    private val recordRepository: RecordRepository
) {
    fun getMyRecords(userEmail: String): List<RecordResponse> =
        recordRepository.findAllByUserEmail(userEmail).map { RecordResponse.from(it) }

    @Transactional
    fun create(userEmail: String, request: RecordCreateRequest): RecordResponse {
        val entity = Record(
            userEmail = userEmail,
            event = request.event,
            recordTime = request.recordTime,
            date = request.date,
            memo = request.memo
        )
        return RecordResponse.from(recordRepository.save(entity))
    }

    @Transactional
    fun delete(userEmail: String, id: Long) {
        val record = recordRepository.findById(id)
            .orElseThrow { NoSuchElementException("기록을 찾을 수 없습니다.") }
        if (record.userEmail != userEmail) throw IllegalAccessException("본인 기록만 삭제할 수 있습니다.")
        recordRepository.delete(record)
    }
} 