package com.swimming.community.dto

import com.swimming.community.domain.Record
import java.time.LocalDate

data class RecordResponse(
    val id: Long,
    val event: String,
    val recordTime: String,
    val date: LocalDate,
    val memo: String?
) {
    companion object {
        fun from(entity: Record): RecordResponse =
            RecordResponse(
                id = entity.id,
                event = entity.event,
                recordTime = entity.recordTime,
                date = entity.date,
                memo = entity.memo
            )
    }
}

data class RecordCreateRequest(
    val event: String,
    val recordTime: String,
    val date: LocalDate,
    val memo: String? = null
) 