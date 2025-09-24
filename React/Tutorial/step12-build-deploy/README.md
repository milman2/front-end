# 12단계: 빌드와 배포

React 앱의 빌드 최적화와 배포 과정을 학습하는 예제입니다.

## 🚀 주요 기능

- **빌드 정보 표시**: 환경, 버전, 빌드 시간 등
- **성능 메트릭**: 로딩 시간, 렌더링 시간, 메모리 사용량
- **배포 상태**: 다양한 플랫폼의 배포 상태 확인
- **빌드 명령어**: 자주 사용하는 빌드 명령어들

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build

# 빌드 결과 서빙
npm run build:analyze
```

## 🛠️ 사용 가능한 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm start` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 생성 |
| `npm run build:production` | 소스맵 없는 프로덕션 빌드 |
| `npm run build:analyze` | 빌드 후 로컬 서빙 |
| `npm test` | 테스트 실행 |
| `npm run format` | 코드 포맷팅 |
| `npm run format:check` | 포맷팅 체크 |
| `npm run lint` | ESLint 실행 |
| `npm run lint:fix` | ESLint 자동 수정 |

## 🎯 빌드 최적화

### 1. 코드 분할 (Code Splitting)
- React.lazy()를 사용한 동적 import
- 라우트 기반 코드 분할

### 2. 번들 최적화
- Tree shaking으로 불필요한 코드 제거
- 압축 및 최적화된 번들 생성
- 소스맵 제거로 보안 강화

### 3. 성능 최적화
- 이미지 최적화
- CSS 최적화
- JavaScript 압축

## 🌐 배포 플랫폼

### Netlify
```bash
# netlify.toml 설정 파일 포함
# 자동 배포 설정 완료
```

### Vercel
```bash
# vercel.json 설정 파일 포함
# 자동 배포 설정 완료
```

### GitHub Pages
```bash
# gh-pages 브랜치에 빌드 결과 배포
npm install --save-dev gh-pages
npm run build
npx gh-pages -d build
```

## 📊 빌드 결과

```
File sizes after gzip:
  60.32 kB  build/static/js/main.a52d3ea6.js
  1.77 kB   build/static/js/453.cf5da50d.chunk.js
  1.03 kB   build/static/css/main.c46dca32.css
```

## 🔧 환경 변수

환경 변수는 `.env` 파일에서 설정할 수 있습니다:

```env
REACT_APP_VERSION=1.0.0
REACT_APP_BUILD_TIME=2024-01-15T10:30:00Z
REACT_APP_NODE_VERSION=18.17.0
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENVIRONMENT=development
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── BuildInfo.tsx          # 빌드 정보 컴포넌트
│   ├── PerformanceMetrics.tsx # 성능 메트릭 컴포넌트
│   └── DeploymentStatus.tsx   # 배포 상태 컴포넌트
├── App.tsx                    # 메인 앱 컴포넌트
├── App.css                    # 스타일시트
└── index.tsx                  # 앱 진입점

# 배포 설정 파일
├── netlify.toml               # Netlify 설정
├── vercel.json                # Vercel 설정
└── public/_redirects          # Netlify 리다이렉트
```

## 🎨 스타일링

- **Glassmorphism 디자인**: 반투명 배경과 블러 효과
- **반응형 레이아웃**: 모바일 친화적 그리드 시스템
- **그라데이션 배경**: 시각적으로 매력적인 UI

## 🚀 배포 가이드

### 1. Netlify 배포
1. GitHub 저장소 연결
2. 빌드 명령어: `npm run build`
3. 배포 디렉토리: `build`
4. 자동 배포 활성화

### 2. Vercel 배포
1. GitHub 저장소 연결
2. 프레임워크: Create React App
3. 빌드 명령어: `npm run build`
4. 출력 디렉토리: `build`

### 3. GitHub Pages 배포
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d build
```

## 📈 성능 모니터링

- **Web Vitals**: Core Web Vitals 메트릭 측정
- **번들 분석**: 번들 크기 및 의존성 분석
- **성능 프로파일링**: 렌더링 성능 측정

## 🔍 문제 해결

### 빌드 실패
```bash
# 캐시 클리어
rm -rf node_modules package-lock.json
npm install

# 의존성 업데이트
npm update
```

### 배포 실패
1. 환경 변수 확인
2. 빌드 로그 확인
3. 네트워크 연결 확인

## 📚 추가 학습 자료

- [Create React App 배포 가이드](https://create-react-app.dev/docs/deployment/)
- [Netlify 배포 가이드](https://docs.netlify.com/)
- [Vercel 배포 가이드](https://vercel.com/docs)
- [React 성능 최적화](https://react.dev/learn/render-and-commit)

## 🎯 다음 단계

- **13단계**: 고급 패턴과 모범 사례
- **14단계**: 실전 프로젝트
- **15단계**: 생태계와 도구들