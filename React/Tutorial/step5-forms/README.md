# React 5단계: 폼 처리와 사용자 입력

## 📚 학습 목표
React에서 폼을 효과적으로 처리하고 다양한 사용자 입력을 관리하는 방법을 완전히 익힙니다.

## 🎯 이 프로젝트에서 배우는 것들

### 1. 제어 컴포넌트(Controlled Components) 만들기
- 제어 컴포넌트의 개념과 특징
- React state로 폼 값 관리
- 실시간 유효성 검사
- 동적 폼 필드 관리

### 2. 비제어 컴포넌트(Uncontrolled Components) 이해하기
- 비제어 컴포넌트의 개념과 특징
- useRef를 통한 DOM 접근
- FormData API 활용
- 파일 업로드 처리

### 3. 폼 유효성 검사 구현하기
- 기본 유효성 검사 패턴
- 실시간 검증과 포커스 아웃 검증
- 비동기 검증 (서버 중복 체크)
- 커스텀 검증 규칙

### 4. 다양한 입력 타입 처리하기
- HTML5 입력 타입들
- 특수 입력 타입 처리
- 다중 선택 처리
- 태그 입력 시스템

## 🚀 프로젝트 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

브라우저에서 `http://localhost:3000`으로 접속하면 학습 내용을 확인할 수 있습니다.

## 📁 프로젝트 구조

```
step5-forms/
├── public/
│   └── index.html                    # HTML 템플릿
├── src/
│   ├── components/
│   │   ├── ControlledComponents.js   # 제어 컴포넌트
│   │   ├── UncontrolledComponents.js # 비제어 컴포넌트
│   │   ├── FormValidation.js         # 폼 유효성 검사
│   │   └── InputTypes.js            # 다양한 입력 타입
│   ├── App.js                        # 메인 앱 컴포넌트
│   ├── App.css                       # 스타일링
│   └── index.js                      # 앱 진입점
├── package.json                      # 프로젝트 설정
└── README.md                         # 이 파일
```

## 🔍 주요 학습 포인트

### 제어 컴포넌트
- **특징**: React state로 값이 제어됨
- **장점**: 예측 가능한 동작, 실시간 검증 가능
- **사용 시기**: 복잡한 폼, 실시간 유효성 검사 필요
- **패턴**: `value`와 `onChange` 사용

### 비제어 컴포넌트
- **특징**: DOM 요소가 직접 값을 관리
- **장점**: 성능상 이점, 간단한 구현
- **사용 시기**: 간단한 폼, 파일 업로드
- **패턴**: `useRef`와 `defaultValue` 사용

### 폼 유효성 검사
- **실시간 검증**: 사용자 입력과 동시에 검증
- **포커스 아웃 검증**: 필드에서 포커스가 벗어날 때 검증
- **제출 시 검증**: 폼 제출 시 전체 검증
- **비동기 검증**: 서버와의 중복 체크

### 입력 타입 처리
- **기본 타입**: text, email, password, number
- **특수 타입**: file, checkbox, radio, select
- **HTML5 타입**: date, time, color, range
- **다중 선택**: multiple 속성 활용

## 💡 실습 과제

### 1. 회원가입 폼 만들기
```jsx
// 요구사항
- 실시간 유효성 검사
- 비밀번호 강도 표시
- 이메일 중복 체크 (비동기)
- 약관 동의 체크
```

### 2. 파일 업로드 시스템
```jsx
// 요구사항
- 다중 파일 선택
- 파일 타입 제한
- 파일 크기 제한
- 업로드 진행률 표시
```

### 3. 동적 설문조사 폼
```jsx
// 요구사항
- 질문 타입별 입력 필드
- 조건부 필드 표시
- 진행률 표시
- 임시 저장 기능
```

## 🎨 폼 처리 패턴

### 기본 제어 컴포넌트
```jsx
function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <input
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
    </form>
  );
}
```

### 유효성 검사
```jsx
function FormWithValidation() {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (!isValidEmail(value)) {
          newErrors.email = '올바른 이메일 형식이 아닙니다.';
        } else {
          delete newErrors.email;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  return (
    <form>
      <input
        name="email"
        onBlur={(e) => {
          setTouched(prev => ({ ...prev, [e.target.name]: true }));
          validateField(e.target.name, e.target.value);
        }}
      />
      {touched.email && errors.email && <div className="error">{errors.email}</div>}
    </form>
  );
}
```

### 비제어 컴포넌트
```jsx
function UncontrolledForm() {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="name" defaultValue="" />
      <input name="email" type="email" defaultValue="" />
    </form>
  );
}
```

### 파일 업로드
```jsx
function FileUpload() {
  const fileRef = useRef();
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileRef}
        onChange={handleFileChange}
        multiple
        accept=".jpg,.png,.pdf"
      />
      {files.map((file, index) => (
        <div key={index}>{file.name}</div>
      ))}
    </div>
  );
}
```

## ⚠️ 주의사항

1. **제어 vs 비제어**: 폼의 복잡성에 따라 적절히 선택
2. **유효성 검사**: 사용자 경험을 고려한 검증 시점 선택
3. **성능**: 과도한 실시간 검증은 성능 저하 원인
4. **접근성**: 라벨, 에러 메시지 등 접근성 고려
5. **보안**: 클라이언트 검증은 보안 목적이 아님

## 📖 추가 학습 자료

- [React 공식 문서 - 폼](https://react.dev/reference/react-dom/components/form)
- [HTML5 입력 타입](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [폼 유효성 검사 가이드](https://web.dev/sign-up-form-best-practices/)

## 🔧 문제 해결

### 보안 취약점 해결
이 프로젝트에서 발견된 보안 취약점들을 해결했습니다:

#### 발견된 취약점
- **nth-check**: 정규식 복잡도 취약점 (High)
- **postcss**: 라인 반환 파싱 오류 (Moderate)  
- **webpack-dev-server**: 소스 코드 유출 취약점 (Moderate)

#### 해결 방법
`package.json`에 `overrides` 설정을 추가하여 안전한 버전으로 강제 업데이트:

```json
{
  "overrides": {
    "nth-check": ">=2.0.1",
    "postcss": ">=8.4.31",
    "webpack-dev-server": "4.15.2"
  }
}
```

### 코드 품질 도구 설정
- **Prettier**: 코드 포맷팅 자동화
- **ESLint**: 코드 품질 검사 및 버그 방지
- **설정 파일**: `.prettierrc`, `.eslintrc.js` 포함

#### 사용 가능한 명령어
```bash
# 코드 포맷팅
npm run format

# ESLint 검사
npm run lint

# 자동 수정
npm run lint:fix
```

## 🎉 다음 단계

이 단계를 완료했다면 다음 단계로 진행하세요:
- **6단계**: 조건부 렌더링과 리스트 (조건부 렌더링, 배열 렌더링, key 속성)
