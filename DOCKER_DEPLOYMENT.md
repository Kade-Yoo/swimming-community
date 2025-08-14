# Docker 배포 가이드

이 문서는 Swimming Community 프로젝트를 Docker를 사용하여 배포하는 방법을 설명합니다.

## 📋 사전 요구사항

- Docker Desktop (v20.10 이상)
- Docker Compose (v2.0 이상)
- 최소 4GB RAM
- 최소 10GB 디스크 공간

## 🚀 빠른 시작

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd swimming-community
```

### 2. 환경 변수 설정
```bash
cp env.example .env
# .env 파일을 편집하여 필요한 설정을 변경
```

### 3. 배포 실행
```bash
chmod +x deploy.sh
./deploy.sh
```

## 📁 프로젝트 구조

```
swimming-community/
├── frontend/                 # React 프론트엔드
│   ├── Dockerfile           # 프론트엔드 Docker 이미지
│   ├── nginx.conf           # Nginx 설정
│   └── .dockerignore        # Docker 빌드 제외 파일
├── backend/                  # Spring Boot 백엔드
│   ├── Dockerfile           # 백엔드 Docker 이미지
│   └── .dockerignore        # Docker 빌드 제외 파일
├── docker-compose.yml       # 프로덕션 Docker Compose
├── docker-compose.dev.yml   # 개발용 Docker Compose
├── init.sql                 # 데이터베이스 초기화 스크립트
├── deploy.sh                # 배포 스크립트
├── env.example              # 환경 변수 예시
└── DOCKER_DEPLOYMENT.md     # 이 문서
```

## 🐳 Docker 서비스

### 프로덕션 서비스
- **frontend**: React 애플리케이션 (포트 80)
- **backend**: Spring Boot API (포트 8080)
- **postgres**: PostgreSQL 데이터베이스 (포트 5432)
- **redis**: Redis 캐시 (포트 6379)

### 개발 서비스
- **postgres-dev**: 개발용 PostgreSQL (포트 5433)
- **redis-dev**: 개발용 Redis (포트 6380)

## 🔧 배포 스크립트 사용법

### 전체 배포
```bash
./deploy.sh deploy
```

### 서비스 시작
```bash
./deploy.sh start
```

### 서비스 중지
```bash
./deploy.sh stop
```

### 서비스 재시작
```bash
./deploy.sh restart
```

### 로그 확인
```bash
./deploy.sh logs
```

### 상태 확인
```bash
./deploy.sh status
```

### 정리
```bash
./deploy.sh cleanup
```

### 이미지 빌드만
```bash
./deploy.sh build
```

## 🌐 서비스 접속

배포 완료 후 다음 URL로 접속할 수 있습니다:

- **프론트엔드**: http://localhost
- **백엔드 API**: http://localhost:8080
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 🔍 문제 해결

### 1. 포트 충돌
포트가 이미 사용 중인 경우:
```bash
# 사용 중인 포트 확인
lsof -i :80
lsof -i :8080
lsof -i :5432
lsof -i :6379

# Docker Compose 포트 변경
# docker-compose.yml 파일에서 ports 섹션 수정
```

### 2. 메모리 부족
Docker Desktop의 메모리 할당을 늘리세요:
1. Docker Desktop 설정 열기
2. Resources > Memory 설정
3. 최소 4GB로 설정

### 3. 디스크 공간 부족
```bash
# 사용하지 않는 Docker 리소스 정리
docker system prune -a
```

### 4. 서비스 시작 실패
```bash
# 로그 확인
./deploy.sh logs

# 개별 서비스 로그 확인
docker-compose logs frontend
docker-compose logs backend
docker-compose logs postgres
docker-compose logs redis
```

## 🔒 보안 설정

### 1. 환경 변수 보안
- `.env` 파일을 `.gitignore`에 추가
- 프로덕션에서는 강력한 비밀번호 사용
- JWT 시크릿 키 변경

### 2. 데이터베이스 보안
- 기본 비밀번호 변경
- 네트워크 접근 제한
- SSL 연결 활성화

### 3. API 보안
- CORS 설정 확인
- Rate limiting 적용
- API 키 인증 추가

## 📊 모니터링

### 1. 헬스 체크
```bash
# 서비스 상태 확인
curl http://localhost/health
curl http://localhost:8080/actuator/health
```

### 2. 리소스 사용량
```bash
# 컨테이너 리소스 사용량 확인
docker stats
```

### 3. 로그 모니터링
```bash
# 실시간 로그 확인
docker-compose logs -f
```

## 🔄 업데이트

### 1. 코드 업데이트
```bash
# 최신 코드 가져오기
git pull origin main

# 재배포
./deploy.sh deploy
```

### 2. 데이터베이스 마이그레이션
```bash
# 백업 생성
docker-compose exec postgres pg_dump -U swimming_user swimming_community > backup.sql

# 마이그레이션 실행
docker-compose exec backend ./gradlew flywayMigrate
```

## 🗑️ 완전 제거

모든 Docker 리소스를 제거하려면:
```bash
# 서비스 중지 및 제거
docker-compose down -v

# 이미지 제거
docker rmi swimming-community-frontend
docker rmi swimming-community-backend

# 볼륨 제거
docker volume rm swimming-community_postgres_data
docker volume rm swimming-community_redis_data

# 네트워크 제거
docker network rm swimming-community_swimming_network
```

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. Docker Desktop이 실행 중인지 확인
2. 충분한 메모리와 디스크 공간이 있는지 확인
3. 방화벽 설정 확인
4. 로그 파일에서 오류 메시지 확인

추가 지원이 필요하면 이슈를 생성해 주세요.
