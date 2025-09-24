import React, { useState } from 'react';

// 기본 제어 컴포넌트 예제
function BasicControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(
      `제출된 데이터:\n이름: ${formData.name}\n이메일: ${formData.email}\n메시지: ${formData.message}`
    );
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className='demo-box'>
      <h3>기본 제어 컴포넌트</h3>
      <p>모든 입력값이 React state로 관리됩니다.</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <div className='form-group'>
          <label htmlFor='name'>이름:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            placeholder='이름을 입력하세요'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>이메일:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='이메일을 입력하세요'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='message'>메시지:</label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleInputChange}
            placeholder='메시지를 입력하세요'
          />
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button type='submit' className='button'>
            제출
          </button>
          <button type='button' className='button' onClick={handleReset}>
            리셋
          </button>
        </div>
      </form>

      <div className='form-preview'>
        <h4>현재 폼 데이터:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}

// 실시간 검증이 있는 제어 컴포넌트
function RealTimeValidationForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'username':
        if (value.length < 3) {
          newErrors.username = '사용자명은 최소 3자 이상이어야 합니다.';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newErrors.username =
            '사용자명은 영문, 숫자, 언더스코어만 사용할 수 있습니다.';
        } else {
          delete newErrors.username;
        }
        break;

      case 'password':
        if (value.length < 6) {
          newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password =
            '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
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

  const handleSubmit = e => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      alert('폼이 성공적으로 제출되었습니다!');
    } else {
      alert('입력 오류를 수정해주세요.');
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.username &&
    formData.password &&
    formData.confirmPassword;

  return (
    <div className='demo-box'>
      <h3>실시간 검증이 있는 제어 컴포넌트</h3>
      <p>입력과 동시에 유효성 검사가 실행됩니다.</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <div className='form-group'>
          <label htmlFor='username'>사용자명:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleInputChange}
            placeholder='사용자명을 입력하세요'
            style={{
              borderColor: errors.username ? '#dc3545' : '#ddd',
            }}
          />
          {errors.username && <div className='error'>{errors.username}</div>}
        </div>

        <div className='form-group'>
          <label htmlFor='password'>비밀번호:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            placeholder='비밀번호를 입력하세요'
            style={{
              borderColor: errors.password ? '#dc3545' : '#ddd',
            }}
          />
          {errors.password && <div className='error'>{errors.password}</div>}
        </div>

        <div className='form-group'>
          <label htmlFor='confirmPassword'>비밀번호 확인:</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder='비밀번호를 다시 입력하세요'
            style={{
              borderColor: errors.confirmPassword ? '#dc3545' : '#ddd',
            }}
          />
          {errors.confirmPassword && (
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
        {Object.keys(errors).length > 0 && (
          <div>
            <strong>오류 목록:</strong>
            <ul>
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>
                  {field}: {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// 동적 폼 필드가 있는 제어 컴포넌트
function DynamicFormFields() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [''],
    contacts: [{ name: '', email: '', phone: '' }],
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagChange = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({
      ...prev,
      tags: newTags,
    }));
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, ''],
    }));
  };

  const removeTag = index => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, field, value) => {
    const newContacts = [...formData.contacts];
    newContacts[index] = {
      ...newContacts[index],
      [field]: value,
    };
    setFormData(prev => ({
      ...prev,
      contacts: newContacts,
    }));
  };

  const addContact = () => {
    setFormData(prev => ({
      ...prev,
      contacts: [...prev.contacts, { name: '', email: '', phone: '' }],
    }));
  };

  const removeContact = index => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('동적 폼 데이터가 제출되었습니다!');
  };

  return (
    <div className='demo-box'>
      <h3>동적 폼 필드가 있는 제어 컴포넌트</h3>
      <p>필요에 따라 폼 필드를 추가하거나 제거할 수 있습니다.</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px', margin: '0 auto' }}
      >
        <div className='form-group'>
          <label htmlFor='title'>제목:</label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            placeholder='제목을 입력하세요'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='description'>설명:</label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            placeholder='설명을 입력하세요'
          />
        </div>

        <div className='form-group'>
          <label>태그:</label>
          {formData.tags.map((tag, index) => (
            <div
              key={index}
              style={{ display: 'flex', gap: '10px', margin: '5px 0' }}
            >
              <input
                type='text'
                value={tag}
                onChange={e => handleTagChange(index, e.target.value)}
                placeholder='태그를 입력하세요'
                style={{ flex: 1 }}
              />
              <button
                type='button'
                className='button'
                onClick={() => removeTag(index)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#dc3545',
                }}
              >
                삭제
              </button>
            </div>
          ))}
          <button
            type='button'
            className='button'
            onClick={addTag}
            style={{ marginTop: '10px' }}
          >
            태그 추가
          </button>
        </div>

        <div className='form-group'>
          <label>연락처:</label>
          {formData.contacts.map((contact, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                padding: '15px',
                margin: '10px 0',
                borderRadius: '5px',
              }}
            >
              <h5>연락처 {index + 1}</h5>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                }}
              >
                <input
                  type='text'
                  value={contact.name}
                  onChange={e =>
                    handleContactChange(index, 'name', e.target.value)
                  }
                  placeholder='이름'
                />
                <input
                  type='email'
                  value={contact.email}
                  onChange={e =>
                    handleContactChange(index, 'email', e.target.value)
                  }
                  placeholder='이메일'
                />
                <input
                  type='tel'
                  value={contact.phone}
                  onChange={e =>
                    handleContactChange(index, 'phone', e.target.value)
                  }
                  placeholder='전화번호'
                  style={{ gridColumn: '1 / -1' }}
                />
              </div>
              <button
                type='button'
                className='button'
                onClick={() => removeContact(index)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#dc3545',
                  marginTop: '10px',
                }}
              >
                연락처 삭제
              </button>
            </div>
          ))}
          <button
            type='button'
            className='button'
            onClick={addContact}
            style={{ marginTop: '10px' }}
          >
            연락처 추가
          </button>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button type='submit' className='button'>
            제출
          </button>
        </div>
      </form>

      <div className='form-preview'>
        <h4>현재 폼 데이터:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}

function ControlledComponents() {
  return (
    <div className='component-section'>
      <h2>1. 제어 컴포넌트(Controlled Components) 만들기</h2>
      <p>
        제어 컴포넌트는 React state에 의해 값이 제어되는 폼 요소입니다. 모든
        사용자 입력이 React state를 통해 관리되므로 예측 가능하고 제어
        가능합니다.
      </p>

      <div className='code-example'>
        <strong>제어 컴포넌트 기본 패턴:</strong>
        <br />
        {`function ControlledForm() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
}`}
      </div>

      <BasicControlledForm />
      <RealTimeValidationForm />
      <DynamicFormFields />

      <div className='highlight'>
        <strong>제어 컴포넌트의 특징:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>React state로 값이 제어됨</li>
          <li>예측 가능한 동작</li>
          <li>실시간 유효성 검사 가능</li>
          <li>프로그래밍 방식으로 값 변경 가능</li>
          <li>사용자 입력을 완전히 제어</li>
        </ul>
      </div>

      <div className='code-example'>
        <strong>제어 컴포넌트 사용 시기:</strong>
        <br />
        {`// 1. 실시간 유효성 검사가 필요한 경우
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const handleEmailChange = (e) => {
  const value = e.target.value;
  setEmail(value);
  
  // 실시간 검증
  if (!isValidEmail(value)) {
    setError('올바른 이메일 형식이 아닙니다.');
  } else {
    setError('');
  }
};

// 2. 동적 폼 필드가 있는 경우
const [fields, setFields] = useState([{ name: '', value: '' }]);

const addField = () => {
  setFields(prev => [...prev, { name: '', value: '' }]);
};

// 3. 복잡한 폼 상태 관리가 필요한 경우
const [formData, setFormData] = useState({
  user: { name: '', email: '' },
  preferences: { theme: 'light', notifications: true }
});`}
      </div>
    </div>
  );
}

export default ControlledComponents;
