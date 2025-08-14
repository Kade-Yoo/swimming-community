# 보안 가이드 - GitHub 배포

이 문서는 Swimming Community 프로젝트를 GitHub에 배포할 때 고려해야 할 보안 사항을 설명합니다.

## 🔒 민감한 정보 보호

### 1. 환경 변수 (.env 파일)
**절대 GitHub에 커밋하지 마세요!**

```bash
# .gitignore에 이미 추가됨
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 2. 데이터베이스 비밀번호
프로덕션에서는 강력한 비밀번호를 사용하세요:

```bash
# env.example에서 변경
POSTGRES_PASSWORD=your-super-strong-password-here
JWT_SECRET=your-super-secret-jwt-key-here
```

### 3. API 키 및 시크릿
소셜 로그인 API 키 등은 환경 변수로 관리:

```bash
# .env 파일에 추가
KAKAO_CLIENT_ID=your-kakao-client-id
GOOGLE_CLIENT_ID=your-google-client-id
NAVER_CLIENT_ID=your-naver-client-id
```

## 🛡️ GitHub Secrets 설정

### 1. Docker Hub 인증
GitHub Repository → Settings → Secrets and variables → Actions에서 추가:

```
DOCKER_USERNAME=your-dockerhub-username
DOCKER_PASSWORD=your-dockerhub-password
```

### 2. 서버 배포 정보
```
HOST=your-server-ip
USERNAME=your-server-username
SSH_KEY=your-private-ssh-key
```

### 3. 데이터베이스 접속 정보
```
DB_HOST=your-db-host
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
```

## 🔐 프로덕션 보안 설정

### 1. HTTPS 설정
```nginx
# nginx.conf에 SSL 설정 추가
server {
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    # ... 기존 설정
}
```

### 2. 방화벽 설정
```bash
# 필요한 포트만 열기
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw enable
```

### 3. 데이터베이스 보안
```sql
-- 강력한 비밀번호 설정
ALTER USER swimming_user PASSWORD 'super-strong-password';

-- 네트워크 접근 제한
-- pg_hba.conf에서 설정
```

## 🚀 배포 전 체크리스트

### ✅ 코드 보안
- [ ] 민감한 정보가 코드에 하드코딩되지 않음
- [ ] .env 파일이 .gitignore에 포함됨
- [ ] API 키와 시크릿이 환경 변수로 관리됨
- [ ] 데이터베이스 비밀번호가 강력함

### ✅ GitHub 설정
- [ ] GitHub Secrets 설정 완료
- [ ] Actions 권한 설정 확인
- [ ] 브랜치 보호 규칙 설정
- [ ] 코드 리뷰 필수 설정

### ✅ 서버 보안
- [ ] SSH 키 인증 설정
- [ ] 방화벽 설정 완료
- [ ] SSL 인증서 설치
- [ ] 정기적인 보안 업데이트

### ✅ 모니터링
- [ ] 로그 모니터링 설정
- [ ] 에러 알림 설정
- [ ] 성능 모니터링 설정
- [ ] 백업 정책 수립

## 🔍 보안 스캔

### 1. 의존성 취약점 검사
```bash
# Frontend
cd frontend
npm audit

# Backend
cd backend
./gradlew dependencyCheckAnalyze
```

### 2. Docker 이미지 보안
```bash
# Docker 이미지 스캔
docker scan swimming-community-frontend
docker scan swimming-community-backend
```

### 3. 코드 품질 검사
```bash
# Frontend
npm run lint

# Backend
./gradlew checkstyleMain
```

## 🚨 보안 사고 대응

### 1. 비밀번호 노출 시
1. 즉시 비밀번호 변경
2. GitHub Secrets 업데이트
3. 서버 환경 변수 업데이트
4. 로그 확인 및 분석

### 2. 데이터베이스 침입 시
1. 네트워크 연결 차단
2. 데이터베이스 백업 확인
3. 보안 로그 분석
4. 시스템 복구 및 보안 강화

### 3. API 키 노출 시
1. API 키 즉시 재발급
2. 환경 변수 업데이트
3. 사용량 모니터링
4. 비정상 접근 차단

## 📞 보안 문의

보안 관련 문제나 문의사항이 있으면:
1. GitHub Issues에 보안 라벨로 등록
2. 이메일로 직접 문의 (보안 관련)
3. 보안 취약점 발견 시 즉시 보고

---

**⚠️ 주의**: 이 가이드를 따라 보안을 강화하세요. 보안은 한 번의 실수로도 심각한 문제를 야기할 수 있습니다.
