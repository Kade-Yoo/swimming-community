package com.swimming.community.repository

import com.swimming.community.domain.Competition
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CompetitionRepository : JpaRepository<Competition, Long> 