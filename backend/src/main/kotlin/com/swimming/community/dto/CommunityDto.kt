package com.swimming.community.dto

import com.swimming.community.domain.Comment
import com.swimming.community.domain.Post
import java.time.LocalDateTime

// 게시글 응답

data class PostResponse(
    val id: Long,
    val userEmail: String,
    val title: String,
    val content: String,
    val createdAt: LocalDateTime,
    val comments: List<CommentResponse>,
    val likeCount: Int
) {
    companion object {
        fun from(entity: Post): PostResponse =
            PostResponse(
                id = entity.id,
                userEmail = entity.userEmail,
                title = entity.title,
                content = entity.content,
                createdAt = entity.createdAt,
                comments = entity.comments.map { CommentResponse.from(it) },
                likeCount = entity.likes.size
            )
    }
}

data class PostCreateRequest(
    val title: String,
    val content: String
)

data class CommentResponse(
    val id: Long,
    val userEmail: String,
    val content: String,
    val createdAt: LocalDateTime
) {
    companion object {
        fun from(entity: Comment): CommentResponse =
            CommentResponse(
                id = entity.id,
                userEmail = entity.userEmail,
                content = entity.content,
                createdAt = entity.createdAt
            )
    }
}

data class CommentCreateRequest(
    val content: String
) 