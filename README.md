# 아마추어 수영 커뮤니티

## 서비스 개요
- 아마추어 수영인들을 위한 정보 제공 및 커뮤니티 플랫폼
- 주요 정보: 수영 대회 일정/결과, 기록 관리, 수영복/장비 정보, 수영 가이드/팁
- 커뮤니티 기능: 자유게시판, Q&A, 후기, 정보 공유
- 모바일 앱 확장성 고려

## 주요 기능

### 1. 정보 제공
- **대회 정보**: 국내외 아마추어 수영 대회 일정, 참가 방법, 결과 안내
- **기록 관리**: 개인 기록 등록/관리, 기록 비교, 성장 그래프
- **수영복/장비 정보**: 브랜드별 수영복/장비 리뷰, 추천, 구매처 정보
- **수영 가이드**: 수영 기술, 훈련법, 건강 관리, 입문 가이드

### 2. 커뮤니티
- **게시판**: 자유게시판, Q&A, 후기, 정보 공유
- **댓글/좋아요**: 게시글 및 댓글에 대한 좋아요, 답글 기능
- **회원 프로필**: 자기소개, 기록, 활동 내역

### 3. 회원 관리
- **회원가입/로그인**: 이메일, 소셜 로그인(카카오, 구글 등) 지원
- **마이페이지**: 내 정보, 내 기록, 내 게시글/댓글 관리

## 기술 스택

### 프론트엔드
- React (TypeScript)
- 상태관리: Redux Toolkit 또는 React Query
- 스타일: Styled-components 또는 MUI
- 반응형 디자인 (모바일 앱 확장 고려)

### 백엔드
- Spring Boot (Kotlin)
- DB: PostgreSQL
- 인증: JWT 기반 인증/인가
- RESTful API 설계
- 파일 업로드 (이미지 등)

### 기타
- 배포: AWS, Docker
- CI/CD: Github Actions

## 페이지 구성

1. **메인 페이지**: 대회 정보, 인기 게시글, 최신 기록, 공지사항 등 요약
2. **대회 정보 페이지**: 대회 일정, 상세 정보, 결과
3. **기록 관리 페이지**: 내 기록 등록/조회, 성장 그래프
4. **수영복/장비 정보 페이지**: 리뷰, 추천, 정보 공유
5. **수영 가이드 페이지**: 기술/훈련법/입문 가이드
6. **커뮤니티(게시판) 페이지**: 자유게시판, Q&A, 후기 등
7. **마이페이지**: 내 정보, 내 기록, 내 게시글/댓글

## 향후 확장
- 모바일 앱(React Native 등) 개발
- 대회 참가 신청/관리 기능
- 오프라인 모임/클럽 관리

---

## 프론트엔드 폴더 구조

```
frontend/
  └─ src/
      ├─ pages/         # 주요 페이지 컴포넌트 (메인, 대회, 기록, 장비, 가이드, 커뮤니티, 마이페이지)
      ├─ components/    # 공통 UI 컴포넌트 (Header, Footer, Navigation 등)
      ├─ routes/        # 라우팅 관련 파일 (Router.tsx)
      ├─ hooks/         # 커스텀 훅
      ├─ utils/         # 유틸리티 함수
      ├─ assets/        # 이미지, 폰트 등 정적 파일
      ├─ App.tsx        # 앱 엔트리, 라우터 포함
      └─ main.tsx       # React DOM 렌더링 엔트리
```

- **pages/**: 각 주요 화면별 컴포넌트
- **components/**: 여러 페이지에서 재사용되는 UI 컴포넌트
- **routes/**: 라우팅 설정 및 관리
- **hooks/**: 커스텀 React 훅
- **utils/**: 공통 유틸 함수
- **assets/**: 이미지, 폰트 등 정적 리소스
- **App.tsx**: 전체 앱 구조 및 라우터
- **main.tsx**: 앱 렌더링 시작점

### 공통 레이아웃 구조

- **components/Header.tsx**: 사이트 상단, 로고 및 사이트명
- **components/Navigation.tsx**: 주요 메뉴(메인, 대회, 기록, 장비, 가이드, 커뮤니티, 마이페이지) 네비게이션
- **components/Footer.tsx**: 사이트 하단, 저작권 등
- **components/Layout.tsx**: Header, Navigation, Footer를 포함하는 공통 레이아웃. 모든 페이지는 Layout으로 감싸서 렌더링

라우팅 구조 예시:

```
<BrowserRouter>
  <Layout>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/competition" element={<CompetitionPage />} />
      ...
    </Routes>
  </Layout>
</BrowserRouter>
```

### 디자인 시스템 및 상태관리 구조

- **디자인 시스템**: MUI(Material UI) 적용, ThemeProvider로 전체 스타일 일관성 유지
- **상태관리**: React Query(QueryClientProvider)로 서버 데이터 관리
- **적용 위치**: App.tsx에서 ThemeProvider, QueryClientProvider로 전체 앱 감쌈
- **샘플**: 메인 페이지에 MUI Card, Button 등 적용

코드 예시:

```tsx
<ThemeProvider theme={theme}>
  <CssBaseline />
  <QueryClientProvider client={queryClient}>
    <Router />
  </QueryClientProvider>
</ThemeProvider>
```

### 인증 구조

- **인증 페이지**: /login, /register (Layout 외부에서 렌더링)
- **인증 상태 관리**: src/hooks/useAuth.ts (localStorage에 토큰 저장, 로그인/로그아웃, 인증 여부 반환)
- **향후 확장**: 백엔드 연동 시 JWT 등 실제 토큰 사용, 인증 Context/Provider로 확장 가능

폴더/파일 예시:
- src/pages/LoginPage.tsx: 로그인 폼
- src/pages/RegisterPage.tsx: 회원가입 폼
- src/hooks/useAuth.ts: 인증 상태 관리 훅

### 인증 Context/Provider 및 보호 라우트

- **src/contexts/AuthContext.tsx**: 전역 인증 상태 관리, Provider로 전체 앱 감쌈
- **src/hooks/useAuth.ts**: Context 기반 인증 훅
- **마이페이지 보호**: 인증되지 않은 사용자는 /login으로 리다이렉트

코드 예시:
```tsx
<AuthProvider>
  <Router />
</AuthProvider>
```

### 로그인/로그아웃 및 사용자 정보 표시

- **Header.tsx**: 로그인 상태에 따라 로그인/로그아웃 버튼, 사용자 이메일(샘플) 표시
- **로그아웃**: 로그아웃 시 localStorage 토큰 삭제 및 /로 이동
- **로그인/회원가입**: 성공 시 임시 토큰(email) 저장 및 /mypage로 이동

### 샘플 API 연동 및 주요 기능 목업

- **게시판(CommunityPage)**: React Query로 공개 API(jsonplaceholder)에서 게시글 목록 fetch 및 렌더링
- **대회 정보(CompetitionPage)**: 목업 데이터로 대회 일정/장소/이름 등 리스트 렌더링
- **구조**: 실제 API 연동 시 fetch/queryFn만 교체하면 확장 가능

### 마이페이지(내 정보/기록/게시글) 샘플 데이터 표시

- **내 정보**: 로그인된 사용자 이메일(토큰) 표시
- **내 기록**: 목업 데이터(날짜, 종목, 기록 등) 테이블로 표시
- **내 게시글**: 샘플 API(jsonplaceholder)에서 userId=1 게시글만 필터링하여 표시
- **구조**: 실제 연동 시 fetch/queryFn만 교체하면 확장 가능