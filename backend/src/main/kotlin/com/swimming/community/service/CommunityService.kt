package com.swimming.community.service

import com.swimming.community.domain.Comment
import com.swimming.community.domain.Post
import com.swimming.community.domain.PostLike
import com.swimming.community.dto.CommentCreateRequest
import com.swimming.community.dto.CommentResponse
import com.swimming.community.dto.PostCreateRequest
import com.swimming.community.dto.PostResponse
import com.swimming.community.repository.CommentRepository
import com.swimming.community.repository.PostLikeRepository
import com.swimming.community.repository.PostRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CommunityService(
    private val postRepository: PostRepository,
    private val commentRepository: CommentRepository,
    private val postLikeRepository: PostLikeRepository
) {
    fun getAll(): List<PostResponse> =
        postRepository.findAll().map { PostResponse.from(it) }

    fun getById(id: Long): PostResponse =
        postRepository.findById(id)
            .map { PostResponse.from(it) }
            .orElseThrow { NoSuchElementException("게시글을 찾을 수 없습니다.") }

    @Transactional
    fun create(userEmail: String, req: PostCreateRequest): PostResponse {
        val post = Post(
            userEmail = userEmail,
            title = req.title,
            content = req.content
        )
        return PostResponse.from(postRepository.save(post))
    }

    @Transactional
    fun addComment(postId: Long, userEmail: String, req: CommentCreateRequest): CommentResponse {
        val post = postRepository.findById(postId)
            .orElseThrow { NoSuchElementException("게시글을 찾을 수 없습니다.") }
        val comment = Comment(
            post = post,
            userEmail = userEmail,
            content = req.content
        )
        return CommentResponse.from(commentRepository.save(comment))
    }

    @Transactional
    fun like(postId: Long, userEmail: String) {
        val post = postRepository.findById(postId)
            .orElseThrow { NoSuchElementException("게시글을 찾을 수 없습니다.") }
        // 중복 좋아요 방지
        if (post.likes.any { it.userEmail == userEmail }) return
        postLikeRepository.save(PostLike(post = post, userEmail = userEmail))
    }
} 