import React, { useState } from 'react';

// 다양한 입력 타입 예제
function InputTypesDemo() {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: '',
    number: '',
    tel: '',
    url: '',
    search: '',
    date: '',
    time: '',
    datetime: '',
    month: '',
    week: '',
    color: '#000000',
    range: 50,
    file: null,
    checkbox: false,
    radio: '',
    select: '',
    textarea: '',
    hidden: 'hidden-value',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  // 기본 검증 함수
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = '올바른 이메일 형식이 아닙니다.';
        } else {
          delete newErrors.email;
        }
        break;
      case 'tel':
        if (
          value &&
          !/^01[0-9]-?\d{3,4}-?\d{4}$/.test(value.replace(/\s/g, ''))
        ) {
          newErrors.tel =
            '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)';
        } else {
          delete newErrors.tel;
        }
        break;
      case 'url':
        if (value && !/^https?:\/\/.+/.test(value)) {
          newErrors.url =
            '올바른 URL 형식이 아닙니다. (http:// 또는 https://로 시작)';
        } else {
          delete newErrors.url;
        }
        break;
      case 'number':
        if (value && (isNaN(value) || value < 0 || value > 100)) {
          newErrors.number = '0-100 사이의 숫자를 입력하세요.';
        } else {
          delete newErrors.number;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = e => {
    const { name, value, type, checked, files } = e.target;

    let fieldValue;
    if (type === 'checkbox') {
      fieldValue = checked;
    } else if (type === 'file') {
      fieldValue = files[0] || null;
    } else {
      fieldValue = value;
    }

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue,
    }));

    // 검증 실행
    validateField(name, fieldValue);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmittedData({ ...formData });
    alert('다양한 입력 타입 폼이 제출되었습니다!');
  };

  const handleReset = () => {
    setFormData({
      text: '',
      email: '',
      password: '',
      number: '',
      tel: '',
      url: '',
      search: '',
      date: '',
      time: '',
      datetime: '',
      month: '',
      week: '',
      color: '#000000',
      range: 50,
      file: null,
      checkbox: false,
      radio: '',
      select: '',
      textarea: '',
      hidden: 'hidden-value',
    });
    setSubmittedData(null);
    setErrors({});
  };

  return (
    <div className='demo-box'>
      <h3>다양한 입력 타입 처리하기</h3>
      <p>HTML5의 다양한 입력 타입들을 React에서 처리하는 방법을 알아보세요.</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <div className='input-demo'>
          <div>
            <div className='form-group'>
              <label htmlFor='text'>텍스트:</label>
              <input
                type='text'
                id='text'
                name='text'
                value={formData.text}
                onChange={handleInputChange}
                placeholder='텍스트를 입력하세요'
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
                style={{
                  borderColor: errors.email ? '#dc3545' : '#ddd',
                }}
              />
              {errors.email && <div className='error'>{errors.email}</div>}
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
              />
            </div>

            <div className='form-group'>
              <label htmlFor='number'>숫자:</label>
              <input
                type='number'
                id='number'
                name='number'
                value={formData.number}
                onChange={handleInputChange}
                placeholder='숫자를 입력하세요'
                min='0'
                max='100'
                step='1'
                style={{
                  borderColor: errors.number ? '#dc3545' : '#ddd',
                }}
              />
              {errors.number && <div className='error'>{errors.number}</div>}
            </div>

            <div className='form-group'>
              <label htmlFor='tel'>전화번호:</label>
              <input
                type='tel'
                id='tel'
                name='tel'
                value={formData.tel}
                onChange={handleInputChange}
                placeholder='010-1234-5678'
                style={{
                  borderColor: errors.tel ? '#dc3545' : '#ddd',
                }}
              />
              {errors.tel && <div className='error'>{errors.tel}</div>}
            </div>

            <div className='form-group'>
              <label htmlFor='url'>URL:</label>
              <input
                type='url'
                id='url'
                name='url'
                value={formData.url}
                onChange={handleInputChange}
                placeholder='https://example.com'
                style={{
                  borderColor: errors.url ? '#dc3545' : '#ddd',
                }}
              />
              {errors.url && <div className='error'>{errors.url}</div>}
            </div>

            <div className='form-group'>
              <label htmlFor='search'>검색:</label>
              <input
                type='search'
                id='search'
                name='search'
                value={formData.search}
                onChange={handleInputChange}
                placeholder='검색어를 입력하세요'
              />
            </div>
          </div>

          <div>
            <div className='form-group'>
              <label htmlFor='date'>날짜:</label>
              <input
                type='date'
                id='date'
                name='date'
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='time'>시간:</label>
              <input
                type='time'
                id='time'
                name='time'
                value={formData.time}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='datetime'>날짜와 시간:</label>
              <input
                type='datetime-local'
                id='datetime'
                name='datetime'
                value={formData.datetime}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='month'>월:</label>
              <input
                type='month'
                id='month'
                name='month'
                value={formData.month}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='week'>주:</label>
              <input
                type='week'
                id='week'
                name='week'
                value={formData.week}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='color'>색상:</label>
              <input
                type='color'
                id='color'
                name='color'
                value={formData.color}
                onChange={handleInputChange}
              />
              <span style={{ marginLeft: '10px', color: formData.color }}>
                선택된 색상: {formData.color}
              </span>
            </div>

            <div className='form-group'>
              <label htmlFor='range'>범위: {formData.range}</label>
              <input
                type='range'
                id='range'
                name='range'
                value={formData.range}
                onChange={handleInputChange}
                min='0'
                max='100'
                step='5'
              />
            </div>
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='file'>파일:</label>
          <input
            type='file'
            id='file'
            name='file'
            onChange={handleInputChange}
            accept='.jpg,.jpeg,.png,.pdf,.doc,.docx'
          />
          {formData.file && (
            <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
              선택된 파일: {formData.file.name}
            </div>
          )}
        </div>

        <div className='form-group'>
          <label>체크박스:</label>
          <div className='checkbox-item'>
            <input
              type='checkbox'
              id='checkbox'
              name='checkbox'
              checked={formData.checkbox}
              onChange={handleInputChange}
            />
            <label htmlFor='checkbox'>이용약관에 동의합니다</label>
          </div>
        </div>

        <div className='form-group'>
          <label>라디오 버튼:</label>
          <div className='radio-group'>
            <div className='radio-item'>
              <input
                type='radio'
                id='radio1'
                name='radio'
                value='option1'
                checked={formData.radio === 'option1'}
                onChange={handleInputChange}
              />
              <label htmlFor='radio1'>옵션 1</label>
            </div>
            <div className='radio-item'>
              <input
                type='radio'
                id='radio2'
                name='radio'
                value='option2'
                checked={formData.radio === 'option2'}
                onChange={handleInputChange}
              />
              <label htmlFor='radio2'>옵션 2</label>
            </div>
            <div className='radio-item'>
              <input
                type='radio'
                id='radio3'
                name='radio'
                value='option3'
                checked={formData.radio === 'option3'}
                onChange={handleInputChange}
              />
              <label htmlFor='radio3'>옵션 3</label>
            </div>
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='select'>선택박스:</label>
          <select
            id='select'
            name='select'
            value={formData.select}
            onChange={handleInputChange}
          >
            <option value=''>선택하세요</option>
            <option value='react'>React</option>
            <option value='vue'>Vue</option>
            <option value='angular'>Angular</option>
            <option value='svelte'>Svelte</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='textarea'>텍스트 영역:</label>
          <textarea
            id='textarea'
            name='textarea'
            value={formData.textarea}
            onChange={handleInputChange}
            placeholder='여러 줄 텍스트를 입력하세요'
            rows='4'
          />
        </div>

        <input
          type='hidden'
          name='hidden'
          value={formData.hidden}
          onChange={handleInputChange}
        />

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button type='submit' className='button'>
            제출
          </button>
          <button type='button' className='button' onClick={handleReset}>
            리셋
          </button>
        </div>
      </form>

      {submittedData && (
        <div className='form-preview'>
          <h4>제출된 데이터:</h4>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '6px', 
            overflow: 'auto',
            fontSize: '14px',
            fontFamily: 'monospace',
            border: '1px solid #e9ecef',
            margin: '10px 0'
          }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// 고급 입력 처리 예제
function AdvancedInputHandling() {
  const [formData, setFormData] = useState({
    multipleFiles: [],
    multipleCheckboxes: [],
    multipleSelect: [],
    tags: '',
    tagsArray: [],
  });

  const handleMultipleFiles = e => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      multipleFiles: files,
    }));
  };

  const handleMultipleCheckboxes = e => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      multipleCheckboxes: checked
        ? [...prev.multipleCheckboxes, value]
        : prev.multipleCheckboxes.filter(item => item !== value),
    }));
  };

  const handleMultipleSelect = e => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      option => option.value
    );
    setFormData(prev => ({
      ...prev,
      multipleSelect: selectedOptions,
    }));
  };

  const handleTagsInput = e => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      tags: value,
      tagsArray: value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag),
    }));
  };

  const addTag = tag => {
    if (tag && !formData.tagsArray.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tagsArray: [...prev.tagsArray, tag],
        tags: [...prev.tagsArray, tag].join(', '),
      }));
    }
  };

  const removeTag = tagToRemove => {
    setFormData(prev => ({
      ...prev,
      tagsArray: prev.tagsArray.filter(tag => tag !== tagToRemove),
      tags: prev.tagsArray.filter(tag => tag !== tagToRemove).join(', '),
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('고급 입력 처리 폼이 제출되었습니다!');
  };

  return (
    <div className='demo-box'>
      <h3>고급 입력 처리</h3>
      <p>다중 선택, 태그 입력 등 복잡한 입력 처리를 구현해보세요.</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px', margin: '0 auto' }}
      >
        <div className='form-group'>
          <label htmlFor='multipleFiles'>다중 파일 선택:</label>
          <input
            type='file'
            id='multipleFiles'
            multiple
            onChange={handleMultipleFiles}
            accept='.jpg,.jpeg,.png,.pdf'
          />
          {formData.multipleFiles.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <strong>선택된 파일들:</strong>
              <ul style={{ fontSize: '12px', margin: '5px 0' }}>
                {formData.multipleFiles.map((file, index) => (
                  <li key={index}>
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className='form-group'>
          <label>다중 체크박스:</label>
          <div className='checkbox-group'>
            {['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js'].map(
              framework => (
                <div key={framework} className='checkbox-item'>
                  <input
                    type='checkbox'
                    id={`framework-${framework}`}
                    value={framework}
                    checked={formData.multipleCheckboxes.includes(framework)}
                    onChange={handleMultipleCheckboxes}
                  />
                  <label htmlFor={`framework-${framework}`}>{framework}</label>
                </div>
              )
            )}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            선택된 프레임워크:{' '}
            {formData.multipleCheckboxes.join(', ') || '없음'}
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='multipleSelect'>다중 선택:</label>
          <select
            id='multipleSelect'
            multiple
            value={formData.multipleSelect}
            onChange={handleMultipleSelect}
            style={{ height: '100px' }}
          >
            <option value='frontend'>프론트엔드</option>
            <option value='backend'>백엔드</option>
            <option value='fullstack'>풀스택</option>
            <option value='mobile'>모바일</option>
            <option value='devops'>DevOps</option>
            <option value='data'>데이터 분석</option>
          </select>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            선택된 분야: {formData.multipleSelect.join(', ') || '없음'}
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='tags'>태그 입력 (쉼표로 구분):</label>
          <input
            type='text'
            id='tags'
            value={formData.tags}
            onChange={handleTagsInput}
            placeholder='태그1, 태그2, 태그3'
          />
          {formData.tagsArray.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <strong>태그들:</strong>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '5px',
                  marginTop: '5px',
                }}
              >
                {formData.tagsArray.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      background: '#e3f2fd',
                      color: '#1976d2',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    {tag}
                    <button
                      type='button'
                      onClick={() => removeTag(tag)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#1976d2',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button type='submit' className='button'>
            제출
          </button>
        </div>
      </form>
    </div>
  );
}

function InputTypes() {
  return (
    <div className='component-section'>
      <h2>4. 다양한 입력 타입 처리하기</h2>
      <p>
        HTML5의 다양한 입력 타입들을 React에서 효과적으로 처리하는 방법을
        익혀보세요. 각 입력 타입의 특성에 맞는 상태 관리와 이벤트 처리를
        구현합니다.
      </p>

      <div className='code-example'>
        <strong>다양한 입력 타입 처리 패턴:</strong>
        <br />
        <pre style={{
          background: '#f8f9fa',
          padding: '15px',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '14px',
          fontFamily: 'monospace',
          border: '1px solid #e9ecef',
          margin: '10px 0'
        }}>
          {`function InputTypesDemo() {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    number: 0,
    checkbox: false,
    radio: '',
    file: null,
    date: '',
    color: '#000000'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    let fieldValue;
    if (type === 'checkbox') {
      fieldValue = checked;
    } else if (type === 'file') {
      fieldValue = files[0] || null;
    } else {
      fieldValue = value;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));
  };

  return (
    <form>
      <input type="text" name="text" value={formData.text} onChange={handleInputChange} />
      <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      <input type="number" name="number" value={formData.number} onChange={handleInputChange} />
      <input type="checkbox" name="checkbox" checked={formData.checkbox} onChange={handleInputChange} />
      <input type="file" name="file" onChange={handleInputChange} />
    </form>
  );
}`}
        </pre>
      </div>

      <InputTypesDemo />
      <AdvancedInputHandling />

      <div className='highlight'>
        <strong>입력 타입별 처리 방법:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>
            <strong>텍스트 입력:</strong> value와 onChange 사용
          </li>
          <li>
            <strong>체크박스:</strong> checked와 onChange 사용
          </li>
          <li>
            <strong>라디오 버튼:</strong> checked와 value 비교
          </li>
          <li>
            <strong>파일 입력:</strong> files 배열에서 파일 추출
          </li>
          <li>
            <strong>다중 선택:</strong> selectedOptions 배열 처리
          </li>
          <li>
            <strong>숫자 입력:</strong> min, max, step 속성 활용
          </li>
        </ul>
      </div>

      <div className='code-example'>
        <strong>특수 입력 타입 처리:</strong>
        <br />
        <pre style={{
          background: '#f8f9fa',
          padding: '15px',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '14px',
          fontFamily: 'monospace',
          border: '1px solid #e9ecef',
          margin: '10px 0'
        }}>
          {`// 1. 파일 업로드
const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  setFiles(files);
};

// 2. 다중 체크박스
const handleMultipleCheckboxes = (e) => {
  const { value, checked } = e.target;
  setSelectedItems(prev => 
    checked 
      ? [...prev, value]
      : prev.filter(item => item !== value)
  );
};

// 3. 다중 선택
const handleMultipleSelect = (e) => {
  const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
  setSelectedValues(selectedOptions);
};

// 4. 태그 입력
const handleTagsInput = (e) => {
  const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
  setTags(tags);
};`}
        </pre>
      </div>

      <div className='highlight'>
        <strong>입력 타입 선택 가이드:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>
            <strong>text:</strong> 일반 텍스트 입력
          </li>
          <li>
            <strong>email:</strong> 이메일 주소 (브라우저 검증)
          </li>
          <li>
            <strong>password:</strong> 비밀번호 (마스킹)
          </li>
          <li>
            <strong>number:</strong> 숫자 입력 (스피너 제공)
          </li>
          <li>
            <strong>tel:</strong> 전화번호 (모바일 키패드)
          </li>
          <li>
            <strong>url:</strong> URL 입력 (브라우저 검증)
          </li>
          <li>
            <strong>date/time:</strong> 날짜/시간 선택기
          </li>
          <li>
            <strong>color:</strong> 색상 선택기
          </li>
          <li>
            <strong>range:</strong> 슬라이더
          </li>
          <li>
            <strong>file:</strong> 파일 선택
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InputTypes;
