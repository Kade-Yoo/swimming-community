package com.swimming.community.repository

import com.swimming.community.domain.PostLike
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PostLikeRepository : JpaRepository<PostLike, Long> 