# GitHub 배포 가이드

이 문서는 Swimming Community 프로젝트를 GitHub에 배포하는 방법을 설명합니다.

## 📋 사전 준비

### 1. GitHub Repository 생성
```bash
# 로컬에서 GitHub 저장소 생성
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/swimming-community.git
git push -u origin main
```

### 2. GitHub Secrets 설정
GitHub Repository → Settings → Secrets and variables → Actions에서 다음 시크릿 추가:

#### 필수 시크릿
```
DOCKER_USERNAME=your-dockerhub-username
DOCKER_PASSWORD=your-dockerhub-password
HOST=your-server-ip
USERNAME=your-server-username
SSH_KEY=your-private-ssh-key
```

#### 선택적 시크릿
```
DB_HOST=your-db-host
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
```

## 🚀 자동 배포 설정

### 1. GitHub Actions 워크플로우
`.github/workflows/deploy.yml` 파일이 자동으로 생성됩니다.

### 2. 브랜치 보호 규칙 설정
GitHub Repository → Settings → Branches에서:

1. **Branch protection rules** 추가
2. **main** 브랜치 선택
3. 다음 옵션 활성화:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

### 3. Actions 권한 설정
GitHub Repository → Settings → Actions → General에서:

- ✅ Allow all actions and reusable workflows
- ✅ Allow GitHub Actions to create and approve pull requests

## 🔄 배포 프로세스

### 1. 개발 워크플로우
```bash
# 1. 개발 브랜치 생성
git checkout -b feature/new-feature

# 2. 코드 수정 및 커밋
git add .
git commit -m "Add new feature"

# 3. Pull Request 생성
git push origin feature/new-feature
# GitHub에서 Pull Request 생성
```

### 2. 자동 테스트
Pull Request 생성 시 자동으로 실행:
- ✅ Backend 테스트 (Spring Boot)
- ✅ Frontend 테스트 (React)
- ✅ 코드 품질 검사
- ✅ Docker 이미지 빌드 테스트

### 3. 자동 배포
main 브랜치에 머지 시 자동으로 실행:
- 🐳 Docker 이미지 빌드 및 푸시
- 🚀 서버 자동 배포
- 🔍 헬스 체크

## 🌐 서버 설정

### 1. 서버 준비
```bash
# Ubuntu 20.04+ 서버에서
sudo apt update
sudo apt install docker.io docker-compose git

# Docker 권한 설정
sudo usermod -aG docker $USER
newgrp docker
```

### 2. 프로젝트 클론
```bash
# 서버에서 프로젝트 클론
git clone https://github.com/your-username/swimming-community.git
cd swimming-community

# 환경 변수 설정
cp env.example .env
# .env 파일 편집
```

### 3. SSL 인증서 설정 (선택사항)
```bash
# Let's Encrypt 설치
sudo apt install certbot python3-certbot-nginx

# SSL 인증서 발급
sudo certbot --nginx -d your-domain.com
```

## 📊 모니터링

### 1. GitHub Actions 모니터링
- GitHub Repository → Actions 탭에서 워크플로우 상태 확인
- 실패 시 자동 알림 설정 가능

### 2. 서버 모니터링
```bash
# 서비스 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs -f

# 리소스 사용량 확인
docker stats
```

### 3. 애플리케이션 모니터링
- Frontend: http://your-domain.com/health
- Backend: http://your-domain.com:8080/actuator/health

## 🔧 문제 해결

### 1. GitHub Actions 실패
```bash
# 로컬에서 테스트
cd frontend && npm run build
cd backend && ./gradlew test
```

### 2. 배포 실패
```bash
# 서버에서 수동 배포
cd /opt/swimming-community
git pull origin main
docker-compose down
docker-compose up -d
```

### 3. SSL 인증서 문제
```bash
# 인증서 갱신
sudo certbot renew

# Nginx 설정 테스트
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 보안 체크리스트

### ✅ 코드 보안
- [ ] .env 파일이 .gitignore에 포함됨
- [ ] 하드코딩된 비밀번호 제거
- [ ] API 키가 환경 변수로 관리됨

### ✅ GitHub 보안
- [ ] GitHub Secrets 설정 완료
- [ ] 브랜치 보호 규칙 설정
- [ ] Actions 권한 설정 확인

### ✅ 서버 보안
- [ ] SSH 키 인증 설정
- [ ] 방화벽 설정
- [ ] SSL 인증서 설치

## 📈 성능 최적화

### 1. Docker 이미지 최적화
- 멀티스테이지 빌드 사용
- 불필요한 파일 제거 (.dockerignore)
- 베이스 이미지 최신화

### 2. GitHub Actions 최적화
- 캐시 활용 (Gradle, npm)
- 병렬 작업 실행
- 불필요한 단계 제거

### 3. 서버 최적화
- Docker 볼륨 사용
- 로그 로테이션 설정
- 정기적인 정리 작업

## 🔄 롤백 방법

### 1. 이전 버전으로 롤백
```bash
# 특정 커밋으로 롤백
git revert <commit-hash>
git push origin main

# 또는 태그 사용
git tag v1.0.1
git push origin v1.0.1
```

### 2. Docker 이미지 롤백
```bash
# 이전 이미지로 배포
docker-compose down
docker-compose up -d --force-recreate
```

## 📞 지원

문제가 발생하면:
1. GitHub Issues에 등록
2. Actions 로그 확인
3. 서버 로그 확인
4. 보안 가이드 참조

---

**🎉 축하합니다!** GitHub Actions를 통한 자동 배포가 설정되었습니다.
