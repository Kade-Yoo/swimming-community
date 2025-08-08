package com.swimming.community.config

import com.swimming.community.domain.*
import com.swimming.community.repository.*
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.time.LocalDate
import java.time.LocalDateTime

@Component
class DataInitializer(
    private val userRepository: UserRepository,
    private val postRepository: PostRepository,
    private val commentRepository: CommentRepository,
    private val postLikeRepository: PostLikeRepository,
    private val competitionRepository: CompetitionRepository,
    private val gearRepository: GearRepository,
    private val gearReviewRepository: GearReviewRepository,
    private val guideRepository: GuideRepository,
    private val recordRepository: RecordRepository,
) : CommandLineRunner {

    override fun run(vararg args: String?) {
        if (userRepository.count() > 0L) {
            return
        }

        // Users
        val users = (1..10).map { idx ->
            User(
                email = "user$idx@example.com",
                password = "pass$idx",
                createdAt = LocalDateTime.now().minusDays((20L - idx))
            )
        }
        userRepository.saveAll(users)

        // Posts
        val titles = listOf(
            "오늘 수영 연습 어땠나요?",
            "스타트 자세 어떻게 해요?",
            "평영 킥이 너무 어려워요",
            "접영 팔 동작 팁",
            "수영장 추천 좀 해주세요",
            "자유형 호흡 팁",
            "수영복 구매 후기",
            "대회 준비 방법",
            "수영 강사 추천",
            "수영장 시설 비교"
        )

        val posts = (1..15).map { idx ->
            Post(
                userEmail = users.random().email,
                title = titles[(idx - 1) % titles.size],
                content = "이것은 ${idx}번째 게시글의 내용입니다. 수영에 대한 다양한 이야기를 나눠보세요.",
                createdAt = LocalDateTime.now().minusDays((30L - idx))
            )
        }
        val savedPosts = postRepository.saveAll(posts)

        // Comments per post (0~3)
        val allComments = mutableListOf<Comment>()
        savedPosts.forEach { post ->
            val count = (0..3).random()
            repeat(count) { ci ->
                allComments += Comment(
                    post = post,
                    userEmail = users.random().email,
                    content = "댓글 ${ci + 1} - 좋은 정보 감사합니다!",
                    createdAt = LocalDateTime.now().minusHours((ci * 3).toLong())
                )
            }
        }
        commentRepository.saveAll(allComments)

        // Likes per post (0~5 distinct users)
        val allLikes = mutableListOf<PostLike>()
        savedPosts.forEach { post ->
            val likeUsers = users.shuffled().take((0..5).random())
            likeUsers.forEach { u ->
                allLikes += PostLike(post = post, userEmail = u.email)
            }
        }
        postLikeRepository.saveAll(allLikes)

        // Competitions
        val competitions = listOf(
            Competition(name = "Spring Swim Cup", date = LocalDate.now().plusDays(14), location = "Seoul Aquatic Center", description = "봄 시즌 수영 대회"),
            Competition(name = "Summer Nationals", date = LocalDate.now().plusDays(45), location = "Busan Marine Pool", description = "여름 전국 수영 대회"),
            Competition(name = "City League", date = LocalDate.now().plusDays(7), location = "Incheon Pool", description = "도시 리그 경기"),
            Competition(name = "Masters Open", date = LocalDate.now().plusDays(60), location = "Daegu Swim Club", description = "마스터즈 오픈"),
            Competition(name = "Junior Championship", date = LocalDate.now().plusDays(30), location = "Daejeon Sports Park", description = "주니어 선수권"),
        )
        val savedCompetitions = competitionRepository.saveAll(competitions)
        // Add a result to first competition for example
        if (savedCompetitions.isNotEmpty()) {
            savedCompetitions[0].result = "200m 자유형 1위"
            competitionRepository.save(savedCompetitions[0])
        }

        // Gear + Reviews
        val gears = listOf(
            Gear(name = "SpeedX Goggles", brand = "AquaCo", category = "Goggles", description = "김서림 방지 기능 고글"),
            Gear(name = "Hydro Pro Suit", brand = "Oceanic", category = "Suit", description = "저항 감소 수영복"),
            Gear(name = "Flow Fins", brand = "WaveTech", category = "Fins", description = "훈련용 핀"),
            Gear(name = "Stream Cap", brand = "AquaCo", category = "Cap", description = "실리콘 수모"),
            Gear(name = "Power Paddles", brand = "WaveTech", category = "Paddles", description = "스트로크 훈련 패들")
        )
        val savedGears = gearRepository.saveAll(gears)

        val gearReviews = mutableListOf<GearReview>()
        savedGears.forEachIndexed { gi, gear ->
            val count = (1..3).random()
            repeat(count) { ri ->
                gearReviews += GearReview(
                    gear = gear,
                    userEmail = users.random().email,
                    rating = (3..5).random(),
                    comment = "${gear.name} 사용 후기 ${ri + 1} - 만족합니다.",
                    createdAt = LocalDateTime.now().minusDays((gi + ri + 1).toLong())
                )
            }
        }
        gearReviewRepository.saveAll(gearReviews)

        // Guides
        val guides = listOf(
            Guide(title = "자유형 호흡 마스터", content = "호흡 타이밍과 몸의 롤링을 익히는 방법.", category = "기술"),
            Guide(title = "평영 킥 교정", content = "발목의 유연성과 킥 타이밍을 개선.", category = "기술"),
            Guide(title = "스타트와 턴", content = "효율적인 스타트와 빠른 턴 기술.", category = "대회"),
            Guide(title = "지구력 향상 루틴", content = "인터벌 트레이닝 계획.", category = "훈련"),
            Guide(title = "장비 선택 가이드", content = "고글/수모/수영복 선택 팁.", category = "정보")
        )
        guideRepository.saveAll(guides)

        // Records
        val records = listOf(
            Record(userEmail = users[0].email, event = "자유형 50m", recordTime = "00:32.15", date = LocalDate.now().minusDays(10), memo = "개인 최고"),
            Record(userEmail = users[0].email, event = "배영 100m", recordTime = "01:25.30", date = LocalDate.now().minusDays(22), memo = "턴 연습"),
            Record(userEmail = users[1].email, event = "평영 50m", recordTime = "00:45.80", date = LocalDate.now().minusDays(28), memo = null),
            Record(userEmail = users[2].email, event = "접영 100m", recordTime = "01:15.45", date = LocalDate.now().minusDays(35), memo = "팔 동작 개선"),
            Record(userEmail = users[3].email, event = "자유형 100m", recordTime = "01:12.10", date = LocalDate.now().minusDays(5), memo = null),
            Record(userEmail = users[4].email, event = "자유형 200m", recordTime = "02:45.90", date = LocalDate.now().minusDays(2), memo = "페이스 유지"),
        )
        recordRepository.saveAll(records)
    }
}

