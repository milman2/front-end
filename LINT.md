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

## 📋 ESLint 통합

### ESLint + Prettier 설치
```bash
npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier
```

### ESLint 설정 (.eslintrc.js)
```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': 'error'
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
