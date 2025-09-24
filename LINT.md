# React 코드 포맷팅 가이드

## 🎯 개요

React 프로젝트에서 일관된 코드 스타일을 유지하기 위한 포맷팅 도구와 설정 방법을 정리한 문서입니다.

## 🛠️ 주요 도구들

### 1. Prettier (코드 포맷터)
- **용도**: 코드 스타일 자동 포맷팅
- **특징**: 설정 기반, 다양한 언어 지원
- **장점**: 일관된 스타일, 자동화 가능

### 2. ESLint (코드 품질 검사)
- **용도**: 코드 품질 검사 + 일부 포맷팅
- **특징**: 규칙 기반, 오류 검출
- **장점**: 버그 예방, 코드 품질 향상

## 📦 설치 및 설정

### Prettier 설치
```bash
# 전역 설치
npm install -g prettier

# 프로젝트별 설치
npm install --save-dev prettier
```

### 설정 파일 (.prettierrc)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "jsxSingleQuote": true,
  "bracketSameLine": false
}
```

### 무시 파일 (.prettierignore)
```
node_modules
build
dist
*.min.js
*.min.css
package-lock.json
yarn.lock
```

## 🚀 사용 방법

### npm 스크립트 추가 (package.json)
```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{js,jsx,ts,tsx,json,css,md}\""
  }
}
```

### 명령어 사용법
```bash
# 전체 프로젝트 포맷팅
npm run format

# 포맷팅 확인만 (변경하지 않음)
npm run format:check

# 특정 파일만 포맷팅
npx prettier --write src/components/Component.js

# 특정 디렉토리 포맷팅
npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,md}"

# 포맷팅 확인만 (변경하지 않음)
prettier --check "src/**/*.{js,jsx,ts,tsx}"
```

## ⚙️ Prettier 설정 옵션 설명

| 옵션 | 값 | 설명 |
|------|-----|------|
| `semi` | `true/false` | 세미콜론 사용 여부 |
| `trailingComma` | `"es5"/"all"/"none"` | Trailing comma 사용 규칙 |
| `singleQuote` | `true/false` | 작은따옴표 사용 여부 |
| `printWidth` | `number` | 한 줄 최대 문자 수 |
| `tabWidth` | `number` | 탭 크기 (스페이스 개수) |
| `useTabs` | `true/false` | 탭 문자 사용 여부 |
| `bracketSpacing` | `true/false` | 객체 괄호 안 공백 |
| `arrowParens` | `"avoid"/"always"` | 화살표 함수 괄호 규칙 |
| `endOfLine` | `"lf"/"crlf"/"auto"` | 줄바꿈 문자 타입 |
| `jsxSingleQuote` | `true/false` | JSX에서 작은따옴표 사용 |
| `bracketSameLine` | `true/false` | JSX 닫는 괄호 위치 |

## 🔧 VS Code 통합

### 추천 확장 프로그램
- **Prettier - Code formatter**
- **ESLint**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

### VS Code 설정 (.vscode/settings.json)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "prettier.requireConfig": true
}
```

## 📋 ESLint를 활용한 코드 품질 향상

### ESLint란?
- **정적 코드 분석 도구**: 코드를 실행하지 않고도 잠재적 오류와 문제점을 찾아냄
- **코드 품질 검사**: 일관성, 가독성, 유지보수성 향상
- **버그 예방**: 런타임 오류를 개발 단계에서 미리 발견
- **팀 협업**: 일관된 코딩 스타일과 규칙 적용

### ESLint 설치 및 설정

#### 기본 설치
```bash
# ESLint 기본 설치
npm install --save-dev eslint

# React 프로젝트용 추가 패키지
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks

# Prettier와 통합
npm install --save-dev eslint-config-prettier eslint-plugin-prettier

# TypeScript 지원 (선택사항)
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

#### ESLint 설정 파일 (.eslintrc.js)
```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // Prettier 통합
    'prettier/prettier': 'error',
    
    // React 관련 규칙
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off', // React 17+ 자동 import
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // 일반적인 코드 품질 규칙
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### ESLint 규칙 카테고리

#### 1. 오류 방지 (Error Prevention)
```javascript
// 사용하지 않는 변수
const unusedVar = 'test'; // ❌ no-unused-vars

// 선언되지 않은 변수 사용
console.log(undefinedVar); // ❌ no-undef

// console.log 사용 (프로덕션에서)
console.log('debug info'); // ❌ no-console
```

#### 2. React 특화 규칙
```javascript
// Hook 규칙 위반
function Component() {
  if (condition) {
    useState(0); // ❌ react-hooks/rules-of-hooks
  }
  
  useEffect(() => {
    // 의존성 배열 누락
  }); // ❌ react-hooks/exhaustive-deps
}

// PropTypes 누락
function MyComponent({ name }) { // ❌ react/prop-types
  return <div>{name}</div>;
}
```

#### 3. 코드 스타일 (Code Style)
```javascript
// var 사용 금지
var oldStyle = 'avoid'; // ❌ no-var

// const 사용 권장
let shouldBeConst = 'value'; // ❌ prefer-const
shouldBeConst = 'new value';

// 세미콜론 누락
const noSemicolon = 'test' // ❌ semi
```

### ESLint 명령어 사용법

#### npm 스크립트 추가
```json
{
  "scripts": {
    "lint": "eslint src/**/*.{js,jsx}",
    "lint:fix": "eslint src/**/*.{js,jsx} --fix",
    "lint:check": "eslint src/**/*.{js,jsx} --max-warnings 0"
  }
}
```

#### 명령어 실행
```bash
# 전체 프로젝트 검사
npm run lint

# 자동 수정 가능한 오류 수정
npm run lint:fix

# 경고도 오류로 처리
npm run lint:check

# 특정 파일만 검사
npx eslint src/components/MyComponent.js

# 특정 규칙만 검사
npx eslint --rule "no-console: error" src/
```

### ESLint 규칙 커스터마이징

#### 규칙 레벨 설정
```javascript
// .eslintrc.js
module.exports = {
  rules: {
    // 0: 끄기, 1: 경고, 2: 오류
    'no-console': 1,        // 경고
    'no-debugger': 2,       // 오류
    'prefer-const': 0,      // 끄기
    
    // 옵션과 함께 설정
    'max-len': [2, { code: 80, ignoreUrls: true }],
    'react/prop-types': [1, { ignore: ['children'] }],
  }
};
```

#### 파일별 규칙 설정
```javascript
// 특정 파일에서만 규칙 비활성화
/* eslint-disable no-console */
console.log('이 파일에서만 console 허용');
/* eslint-enable no-console */

// 한 줄만 비활성화
const unused = 'test'; // eslint-disable-line no-unused-vars

// 다음 줄만 비활성화
// eslint-disable-next-line no-console
console.log('debug');
```

### ESLint 무시 파일 (.eslintignore)
```
node_modules/
build/
dist/
*.min.js
coverage/
.env
```

### VS Code ESLint 통합

#### 확장 프로그램 설정
```json
// .vscode/settings.json
{
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.format.enable": true
}
```

### 실제 프로젝트 적용 예시

#### step4-lifecycle 프로젝트에 ESLint 적용
```bash
cd /home/milman2/front-end/React/Tutorial/step4-lifecycle
npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier eslint-plugin-prettier
```

#### package.json 스크립트 추가
```json
{
  "scripts": {
    "lint": "eslint src/**/*.{js,jsx}",
    "lint:fix": "eslint src/**/*.{js,jsx} --fix",
    "lint:check": "eslint src/**/*.{js,jsx} --max-warnings 0"
  }
}
```

### ESLint vs Prettier 역할 분담

| 도구 | 역할 | 예시 |
|------|------|------|
| **ESLint** | 코드 품질, 버그 방지 | `no-unused-vars`, `react-hooks/rules-of-hooks` |
| **Prettier** | 코드 포맷팅, 스타일 | 들여쓰기, 따옴표, 세미콜론 |

### 일반적인 ESLint 오류와 해결법

#### 1. Hook 규칙 위반
```javascript
// ❌ 잘못된 사용
function Component() {
  if (condition) {
    const [state, setState] = useState(0);
  }
}

// ✅ 올바른 사용
function Component() {
  const [state, setState] = useState(0);
  
  if (condition) {
    // 조건부 로직은 Hook 호출 후에
  }
}
```

#### 2. 의존성 배열 누락
```javascript
// ❌ 의존성 누락
useEffect(() => {
  fetchData(userId);
}, []); // userId가 변경되어도 실행되지 않음

// ✅ 올바른 의존성
useEffect(() => {
  fetchData(userId);
}, [userId]); // userId 변경 시 재실행
```

#### 3. 사용하지 않는 변수
```javascript
// ❌ 사용하지 않는 변수
const [count, setCount] = useState(0);
const unusedVar = 'test';

// ✅ 사용하지 않는 변수 제거 또는 언더스코어 사용
const [count, setCount] = useState(0);
const _unusedVar = 'test'; // eslint-disable-line no-unused-vars
```

### CI/CD에서 ESLint 통합

#### GitHub Actions 예시
```yaml
# .github/workflows/lint.yml
name: Lint
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run lint:check
```

### ESLint 성능 최적화

#### 캐시 사용
```bash
# 캐시와 함께 실행
npx eslint --cache src/

# 캐시 파일 위치 지정
npx eslint --cache --cache-location .eslintcache src/
```

#### 병렬 처리
```bash
# 여러 파일을 병렬로 처리
npx eslint --max-warnings 0 src/ --format=compact
```

### ESLint 규칙 조정 권장사항

#### 학습 프로젝트용 설정
```javascript
// .eslintrc.js - 학습용 완화된 설정
module.exports = {
  // ... 기존 설정
  rules: {
    // PropTypes 경고를 끄기 (학습 단계에서는 선택사항)
    'react/prop-types': 'off',
    
    // console.log를 경고로 유지 (디버깅용)
    'no-console': 'warn',
    
    // useEffect 의존성은 경고로 유지 (중요한 학습 포인트)
    'react-hooks/exhaustive-deps': 'warn',
  }
};
```

#### 프로덕션 프로젝트용 설정
```javascript
// .eslintrc.js - 프로덕션용 엄격한 설정
module.exports = {
  // ... 기존 설정
  rules: {
    // PropTypes 필수
    'react/prop-types': 'error',
    
    // console.log 금지
    'no-console': 'error',
    
    // useEffect 의존성 필수
    'react-hooks/exhaustive-deps': 'error',
  }
};
```

## 🎯 Git Hook 자동화

### Husky + lint-staged 설치
```bash
npm install --save-dev husky lint-staged
```

### package.json 설정
```json
{
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ]
  }
}
```

## 📝 포맷팅 예시

### 포맷팅 전
```javascript
const user={name:"홍길동",age:25,email:"hong@example.com"};
function greet(name){
return `안녕하세요, ${name}님!`;
}
```

### 포맷팅 후
```javascript
const user = { name: '홍길동', age: 25, email: 'hong@example.com' };

function greet(name) {
  return `안녕하세요, ${name}님!`;
}
```

## ⚠️ 주의사항

### 1. 무한 루프 방지
```javascript
// ❌ 위험한 패턴
useEffect(() => {
  setState(newValue);
}); // 의존성 배열 없음 = 무한 루프

// ✅ 안전한 패턴
useEffect(() => {
  setState(newValue);
}, []); // 빈 의존성 배열 = 마운트 시에만 실행
```

### 2. Prettier vs ESLint 충돌 방지
- `eslint-config-prettier` 사용으로 충돌 규칙 비활성화
- Prettier는 포맷팅, ESLint는 코드 품질에 집중

### 3. 팀 협업
- 모든 팀원이 동일한 설정 파일 사용
- Git Hook으로 커밋 전 자동 포맷팅
- CI/CD에서 포맷팅 검사 포함

## 🚀 프로젝트 적용 단계

1. **Prettier 설치 및 설정**
2. **설정 파일 생성** (.prettierrc, .prettierignore)
3. **npm 스크립트 추가**
4. **VS Code 확장 프로그램 설치**
5. **팀원들과 설정 공유**
6. **Git Hook 설정 (선택사항)**

## 📚 추가 자료

- [Prettier 공식 문서](https://prettier.io/)
- [ESLint 공식 문서](https://eslint.org/)
- [React ESLint 플러그인](https://github.com/jsx-eslint/eslint-plugin-react)
- [Husky Git Hooks](https://typicode.github.io/husky/)

---

**마지막 업데이트**: 2024년 12월
**작성자**: React 튜토리얼 프로젝트
