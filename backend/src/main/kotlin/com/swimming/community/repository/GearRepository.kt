package com.swimming.community.repository

import com.swimming.community.domain.Gear
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GearRepository : JpaRepository<Gear, Long> 