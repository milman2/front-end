import React, { useState } from 'react';

// 기본 폼 유효성 검사
function BasicFormValidation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = '이름은 필수입니다.';
        } else if (value.trim().length < 2) {
          newErrors.name = '이름은 최소 2자 이상이어야 합니다.';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = '이메일은 필수입니다.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = '올바른 이메일 형식이 아닙니다.';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = '비밀번호는 필수입니다.';
        } else if (value.length < 8) {
          newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password =
            '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = '비밀번호 확인은 필수입니다.';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // 실시간 검증
    validateField(name, value);
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // 모든 필드 터치 처리
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // 모든 필드 검증
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });

    if (Object.keys(errors).length === 0) {
      alert('폼이 성공적으로 제출되었습니다!');
    } else {
      alert('입력 오류를 수정해주세요.');
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className='demo-box'>
      <h3>기본 폼 유효성 검사</h3>
      <p>실시간 검증과 제출 시 검증을 모두 지원합니다.</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <div className='form-group'>
          <label htmlFor='name'>이름 *</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder='이름을 입력하세요'
            style={{
              borderColor: touched.name && errors.name ? '#dc3545' : '#ddd',
            }}
          />
          {touched.name && errors.name && (
            <div className='error'>{errors.name}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='email'>이메일 *</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder='이메일을 입력하세요'
            style={{
              borderColor: touched.email && errors.email ? '#dc3545' : '#ddd',
            }}
          />
          {touched.email && errors.email && (
            <div className='error'>{errors.email}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='password'>비밀번호 *</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder='비밀번호를 입력하세요'
            style={{
              borderColor:
                touched.password && errors.password ? '#dc3545' : '#ddd',
            }}
          />
          {touched.password && errors.password && (
            <div className='error'>{errors.password}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='confirmPassword'>비밀번호 확인 *</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder='비밀번호를 다시 입력하세요'
            style={{
              borderColor:
                touched.confirmPassword && errors.confirmPassword
                  ? '#dc3545'
                  : '#ddd',
            }}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <div className='error'>{errors.confirmPassword}</div>
          )}
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button type='submit' className='button' disabled={!isFormValid}>
            {isFormValid ? '제출' : '입력 오류 수정 필요'}
          </button>
        </div>
      </form>

      <div className='form-preview'>
        <h4>폼 상태:</h4>
        <p>
          <strong>유효성:</strong>
          <span className={`status ${isFormValid ? 'valid' : 'invalid'}`}>
            {isFormValid ? '유효함' : '무효함'}
          </span>
        </p>
        <p>
          <strong>오류 개수:</strong> {Object.keys(errors).length}개
        </p>
        <p>
          <strong>터치된 필드:</strong>{' '}
          {Object.values(touched).filter(Boolean).length}개
        </p>
      </div>
    </div>
  );
}

// 고급 폼 유효성 검사 (비동기 검증 포함)
function AdvancedFormValidation() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    website: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [validating, setValidating] = useState({});

  const validateField = async (name, value) => {
    const newErrors = { ...errors };
    setValidating(prev => ({ ...prev, [name]: true }));

    // 기본 검증
    switch (name) {
      case 'username':
        if (!value.trim()) {
          newErrors.username = '사용자명은 필수입니다.';
        } else if (value.length < 3) {
          newErrors.username = '사용자명은 최소 3자 이상이어야 합니다.';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newErrors.username =
            '사용자명은 영문, 숫자, 언더스코어만 사용할 수 있습니다.';
        } else {
          // 비동기 검증 시뮬레이션 (사용자명 중복 체크)
          try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (value === 'admin' || value === 'test') {
              newErrors.username = '이미 사용 중인 사용자명입니다.';
            } else {
              delete newErrors.username;
            }
          } catch (error) {
            newErrors.username = '사용자명 검증 중 오류가 발생했습니다.';
          }
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = '이메일은 필수입니다.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = '올바른 이메일 형식이 아닙니다.';
        } else {
          // 비동기 검증 시뮬레이션 (이메일 중복 체크)
          try {
            await new Promise(resolve => setTimeout(resolve, 800));
            if (value.includes('test') || value.includes('example')) {
              newErrors.email = '이미 사용 중인 이메일입니다.';
            } else {
              delete newErrors.email;
            }
          } catch (error) {
            newErrors.email = '이메일 검증 중 오류가 발생했습니다.';
          }
        }
        break;

      case 'website':
        if (value.trim() && !/^https?:\/\/.+/.test(value)) {
          newErrors.website =
            '올바른 URL 형식이 아닙니다. (http:// 또는 https://로 시작)';
        } else {
          delete newErrors.website;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    setValidating(prev => ({ ...prev, [name]: false }));
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // 디바운스된 검증
    clearTimeout(window[`validation_${name}`]);
    window[`validation_${name}`] = setTimeout(() => {
      validateField(name, value);
    }, 500);
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      alert('고급 폼이 성공적으로 제출되었습니다!');
    } else {
      alert('입력 오류를 수정해주세요.');
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 && formData.username && formData.email;

  return (
    <div className='demo-box'>
      <h3>고급 폼 유효성 검사 (비동기 검증)</h3>
      <p>비동기 검증과 디바운스를 포함한 고급 유효성 검사입니다.</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <div className='form-group'>
          <label htmlFor='username'>사용자명 *</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder='사용자명을 입력하세요'
            style={{
              borderColor:
                touched.username && errors.username ? '#dc3545' : '#ddd',
            }}
          />
          {validating.username && (
            <div className='status pending'>검증 중...</div>
          )}
          {touched.username && errors.username && (
            <div className='error'>{errors.username}</div>
          )}
          {touched.username && !errors.username && !validating.username && (
            <div className='success'>✓ 사용 가능한 사용자명입니다.</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='email'>이메일 *</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder='이메일을 입력하세요'
            style={{
              borderColor: touched.email && errors.email ? '#dc3545' : '#ddd',
            }}
          />
          {validating.email && <div className='status pending'>검증 중...</div>}
          {touched.email && errors.email && (
            <div className='error'>{errors.email}</div>
          )}
          {touched.email && !errors.email && !validating.email && (
            <div className='success'>✓ 사용 가능한 이메일입니다.</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='website'>웹사이트</label>
          <input
            type='url'
            id='website'
            name='website'
            value={formData.website}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder='https://example.com'
            style={{
              borderColor:
                touched.website && errors.website ? '#dc3545' : '#ddd',
            }}
          />
          {touched.website && errors.website && (
            <div className='error'>{errors.website}</div>
          )}
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button
            type='submit'
            className='button'
            disabled={!isFormValid || Object.values(validating).some(Boolean)}
          >
            {Object.values(validating).some(Boolean)
              ? '검증 중...'
              : isFormValid
                ? '제출'
                : '입력 오류 수정 필요'}
          </button>
        </div>
      </form>

      <div className='form-preview'>
        <h4>폼 상태:</h4>
        <p>
          <strong>유효성:</strong>
          <span className={`status ${isFormValid ? 'valid' : 'invalid'}`}>
            {isFormValid ? '유효함' : '무효함'}
          </span>
        </p>
        <p>
          <strong>검증 중인 필드:</strong>{' '}
          {Object.values(validating).filter(Boolean).length}개
        </p>
        <p>
          <strong>오류 개수:</strong> {Object.keys(errors).length}개
        </p>
      </div>
    </div>
  );
}

// 커스텀 유효성 검사 훅 시뮬레이션
function CustomValidationHook() {
  const [formData, setFormData] = useState({
    phone: '',
    age: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // 커스텀 검증 함수들
  const validators = {
    phone: value => {
      if (!value.trim()) return '전화번호는 필수입니다.';
      if (!/^01[0-9]-?\d{3,4}-?\d{4}$/.test(value.replace(/\s/g, ''))) {
        return '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)';
      }
      return null;
    },

    age: value => {
      if (!value.trim()) return '나이는 필수입니다.';
      const age = parseInt(value);
      if (isNaN(age)) return '나이는 숫자여야 합니다.';
      if (age < 1 || age > 120) return '나이는 1-120 사이여야 합니다.';
      return null;
    },

    terms: value => {
      if (!value) return '약관에 동의해야 합니다.';
      return null;
    },
  };

  const validateField = (name, value) => {
    const validator = validators[name];
    if (validator) {
      const error = validator(value);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue,
    }));

    validateField(name, fieldValue);
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // 모든 필드 터치 처리
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // 모든 필드 검증
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });

    if (Object.keys(errors).length === 0) {
      alert('커스텀 검증 폼이 성공적으로 제출되었습니다!');
    } else {
      alert('입력 오류를 수정해주세요.');
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(formData).every(value =>
      typeof value === 'boolean' ? value : value.toString().trim() !== ''
    );

  return (
    <div className='demo-box'>
      <h3>커스텀 유효성 검사</h3>
      <p>재사용 가능한 검증 함수들을 사용한 커스텀 유효성 검사입니다.</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <div className='form-group'>
          <label htmlFor='phone'>전화번호 *</label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder='010-1234-5678'
            style={{
              borderColor: touched.phone && errors.phone ? '#dc3545' : '#ddd',
            }}
          />
          {touched.phone && errors.phone && (
            <div className='error'>{errors.phone}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='age'>나이 *</label>
          <input
            type='number'
            id='age'
            name='age'
            value={formData.age}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder='나이를 입력하세요'
            min='1'
            max='120'
            style={{
              borderColor: touched.age && errors.age ? '#dc3545' : '#ddd',
            }}
          />
          {touched.age && errors.age && (
            <div className='error'>{errors.age}</div>
          )}
        </div>

        <div className='form-group'>
          <div className='checkbox-item'>
            <input
              type='checkbox'
              id='terms'
              name='terms'
              checked={formData.terms}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <label htmlFor='terms'>이용약관에 동의합니다 *</label>
          </div>
          {touched.terms && errors.terms && (
            <div className='error'>{errors.terms}</div>
          )}
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button type='submit' className='button' disabled={!isFormValid}>
            {isFormValid ? '제출' : '입력 오류 수정 필요'}
          </button>
        </div>
      </form>

      <div className='validation-demo'>
        <h4>검증 규칙:</h4>
        <div className='validation-rules'>
          <ul>
            <li>
              <strong>전화번호:</strong> 010-1234-5678 형식
            </li>
            <li>
              <strong>나이:</strong> 1-120 사이의 숫자
            </li>
            <li>
              <strong>약관:</strong> 반드시 동의해야 함
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function FormValidation() {
  return (
    <div className='component-section'>
      <h2>3. 폼 유효성 검사 구현하기</h2>
      <p>
        폼 유효성 검사는 사용자 입력의 정확성을 보장하고 좋은 사용자 경험을
        제공합니다. 실시간 검증, 비동기 검증, 커스텀 검증 규칙 등을
        구현해보세요.
      </p>

      <div className='code-example'>
        <strong>기본 유효성 검사 패턴:</strong>
        <br />
        {`function FormWithValidation() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (!value.trim()) {
          newErrors.email = '이메일은 필수입니다.';
        } else if (!isValidEmail(value)) {
          newErrors.email = '올바른 이메일 형식이 아닙니다.';
        } else {
          delete newErrors.email;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  return (
    <form>
      <input
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        onBlur={(e) => setTouched(prev => ({ ...prev, [e.target.name]: true }))}
      />
      {touched.email && errors.email && <div className="error">{errors.email}</div>}
    </form>
  );
}`}
      </div>

      <BasicFormValidation />
      <AdvancedFormValidation />
      <CustomValidationHook />

      <div className='highlight'>
        <strong>유효성 검사 전략:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>
            <strong>실시간 검증:</strong> 사용자 입력과 동시에 검증
          </li>
          <li>
            <strong>포커스 아웃 검증:</strong> 필드에서 포커스가 벗어날 때 검증
          </li>
          <li>
            <strong>제출 시 검증:</strong> 폼 제출 시 전체 검증
          </li>
          <li>
            <strong>비동기 검증:</strong> 서버와의 중복 체크
          </li>
          <li>
            <strong>디바운스:</strong> 과도한 검증 요청 방지
          </li>
        </ul>
      </div>

      <div className='code-example'>
        <strong>고급 유효성 검사 패턴:</strong>
        <br />
        {`// 1. 비동기 검증
const validateUsername = async (username) => {
  const response = await fetch(\`/api/check-username/\${username}\`);
  const { available } = await response.json();
  return available ? null : '이미 사용 중인 사용자명입니다.';
};

// 2. 디바운스된 검증
const debouncedValidation = useCallback(
  debounce((name, value) => {
    validateField(name, value);
  }, 500),
  []
);

// 3. 커스텀 검증 훅
function useFormValidation(initialValues, validators) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const validate = (name, value) => {
    const validator = validators[name];
    if (validator) {
      const error = validator(value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };
  
  return { values, errors, validate, setValues };
}`}
      </div>
    </div>
  );
}

export default FormValidation;
