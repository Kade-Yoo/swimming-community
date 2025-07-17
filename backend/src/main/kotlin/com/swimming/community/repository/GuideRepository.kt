package com.swimming.community.repository

import com.swimming.community.domain.Guide
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GuideRepository : JpaRepository<Guide, Long> 