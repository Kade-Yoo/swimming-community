-- Swimming Community Database Initialization Script

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables for swimming community
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) DEFAULT '일반',
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
    author_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS likes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON comments(author_id);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);

-- Insert sample data
INSERT INTO users (username, email, password_hash, full_name) VALUES
('admin', 'admin@swimming.com', '$2a$10$dummy.hash.for.demo', '관리자'),
('user1', 'user1@example.com', '$2a$10$dummy.hash.for.demo', '사용자1'),
('user2', 'user2@example.com', '$2a$10$dummy.hash.for.demo', '사용자2'),
('user3', 'user3@example.com', '$2a$10$dummy.hash.for.demo', '사용자3')
ON CONFLICT (username) DO NOTHING;

-- Insert sample posts
INSERT INTO posts (title, content, author_id, category, likes_count, comments_count, views_count) VALUES
('오늘 수영 연습 어땠나요?', '오늘 자유형 연습을 했는데 호흡 타이밍이 많이 좋아진 것 같아요! 여러분은 어떤 연습을 하셨나요?', 2, '일반', 15, 8, 156),
('스타트 자세 어떻게 해요?', '수영 시작할 때 스타트 자세가 너무 어려워요. 다이빙할 때 물에 제대로 들어가는 방법을 알려주세요!', 3, '질문', 12, 15, 203),
('평영 킥이 너무 어려워요', '평영 킥이 너무 어려워요. 발목을 어떻게 써야 하는지 감이 안 잡혀요. 팁 좀 주세요!', 4, '기술', 8, 12, 189),
('접영 팔 동작 팁', '접영을 배우고 있는데 팔 동작이 너무 힘들어요. 어깨에 무리가 가지 않게 하는 방법이 있을까요?', 2, '기술', 6, 9, 142)
ON CONFLICT DO NOTHING;

-- Insert sample comments
INSERT INTO comments (post_id, author_id, content) VALUES
(1, 3, '저도 오늘 자유형 연습했어요! 호흡이 정말 중요하죠.'),
(1, 4, '평영 연습했는데 킥이 어려워요 ㅠㅠ'),
(2, 2, '발에 힘을 더 주시면 됩니다!'),
(2, 4, '저도 같은 고민이 있어요. 팁 감사합니다!'),
(3, 2, '발목을 자연스럽게 펴서 킥하세요!')
ON CONFLICT DO NOTHING;

-- Insert sample likes
INSERT INTO likes (user_id, post_id) VALUES
(2, 1), (3, 1), (4, 1), (2, 2), (3, 2), (4, 2), (2, 3), (3, 3), (2, 4)
ON CONFLICT DO NOTHING;
