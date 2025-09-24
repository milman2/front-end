import React, { useRef, useState } from 'react';

// 기본 비제어 컴포넌트 예제
function BasicUncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };

    setSubmittedData(formData);
    alert(
      `제출된 데이터:\n이름: ${formData.name}\n이메일: ${formData.email}\n메시지: ${formData.message}`
    );
  };

  const handleReset = () => {
    nameRef.current.value = '';
    emailRef.current.value = '';
    messageRef.current.value = '';
    setSubmittedData(null);
  };

  return (
    <div className='demo-box'>
      <h3>기본 비제어 컴포넌트</h3>
      <p>DOM 요소가 직접 값을 관리하며, useRef를 통해 접근합니다.</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <div className='form-group'>
          <label htmlFor='name'>이름:</label>
          <input
            type='text'
            id='name'
            ref={nameRef}
            placeholder='이름을 입력하세요'
            defaultValue=''
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>이메일:</label>
          <input
            type='email'
            id='email'
            ref={emailRef}
            placeholder='이메일을 입력하세요'
            defaultValue=''
          />
        </div>

        <div className='form-group'>
          <label htmlFor='message'>메시지:</label>
          <textarea
            id='message'
            ref={messageRef}
            placeholder='메시지를 입력하세요'
            defaultValue=''
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

// 파일 입력 비제어 컴포넌트
function FileUploadForm() {
  const fileRef = useRef();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();

    const files = fileRef.current.files;
    const fileList = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified).toLocaleString(),
    }));

    setUploadedFiles(fileList);

    if (files.length > 0) {
      alert(`${files.length}개의 파일이 선택되었습니다.`);
    } else {
      alert('파일을 선택해주세요.');
    }
  };

  const handleReset = () => {
    fileRef.current.value = '';
    setUploadedFiles([]);
  };

  return (
    <div className='demo-box'>
      <h3>파일 업로드 비제어 컴포넌트</h3>
      <p>파일 입력은 비제어 컴포넌트로 처리하는 것이 일반적입니다.</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <div className='form-group'>
          <label htmlFor='files'>파일 선택:</label>
          <input
            type='file'
            id='files'
            ref={fileRef}
            multiple
            accept='.jpg,.jpeg,.png,.pdf,.doc,.docx'
          />
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button type='submit' className='button'>
            파일 정보 확인
          </button>
          <button type='button' className='button' onClick={handleReset}>
            초기화
          </button>
        </div>
      </form>

      {uploadedFiles.length > 0 && (
        <div className='form-preview'>
          <h4>선택된 파일 정보:</h4>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                margin: '5px 0',
                borderRadius: '3px',
              }}
            >
              <p>
                <strong>파일명:</strong> {file.name}
              </p>
              <p>
                <strong>크기:</strong> {(file.size / 1024).toFixed(2)} KB
              </p>
              <p>
                <strong>타입:</strong> {file.type}
              </p>
              <p>
                <strong>수정일:</strong> {file.lastModified}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 체크박스와 라디오 버튼 비제어 컴포넌트
function CheckboxRadioForm() {
  const checkboxRefs = useRef([]);
  const radioRefs = useRef([]);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    // 체크박스 값들 수집
    const checkedBoxes = checkboxRefs.current
      .filter(ref => ref && ref.checked)
      .map(ref => ref.value);

    // 라디오 버튼 값 수집
    const selectedRadio =
      radioRefs.current.find(ref => ref && ref.checked)?.value || '';

    const formData = {
      interests: checkedBoxes,
      experience: selectedRadio,
    };

    setSubmittedData(formData);
    alert(
      `제출된 데이터:\n관심사: ${checkedBoxes.join(', ')}\n경험: ${selectedRadio}`
    );
  };

  const handleReset = () => {
    checkboxRefs.current.forEach(ref => {
      if (ref) ref.checked = false;
    });
    radioRefs.current.forEach(ref => {
      if (ref) ref.checked = false;
    });
    setSubmittedData(null);
  };

  const interests = ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java'];
  const experienceLevels = [
    { value: 'beginner', label: '초급 (1년 미만)' },
    { value: 'intermediate', label: '중급 (1-3년)' },
    { value: 'advanced', label: '고급 (3년 이상)' },
  ];

  return (
    <div className='demo-box'>
      <h3>체크박스와 라디오 버튼 비제어 컴포넌트</h3>
      <p>여러 선택 옵션이 있는 경우 비제어 컴포넌트로 처리할 수 있습니다.</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <div className='form-group'>
          <label>관심 있는 기술:</label>
          <div className='checkbox-group'>
            {interests.map((interest, index) => (
              <div key={interest} className='checkbox-item'>
                <input
                  type='checkbox'
                  id={`interest-${index}`}
                  value={interest}
                  ref={el => (checkboxRefs.current[index] = el)}
                />
                <label htmlFor={`interest-${index}`}>{interest}</label>
              </div>
            ))}
          </div>
        </div>

        <div className='form-group'>
          <label>개발 경험:</label>
          <div className='radio-group'>
            {experienceLevels.map((level, index) => (
              <div key={level.value} className='radio-item'>
                <input
                  type='radio'
                  id={`experience-${index}`}
                  name='experience'
                  value={level.value}
                  ref={el => (radioRefs.current[index] = el)}
                />
                <label htmlFor={`experience-${index}`}>{level.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button type='submit' className='button'>
            제출
          </button>
          <button type='button' className='button' onClick={handleReset}>
            초기화
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

// FormData를 사용한 비제어 컴포넌트
function FormDataExample() {
  const formRef = useRef();
  const [formData, setFormData] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    const form = formRef.current;
    const data = new FormData(form);

    // FormData를 일반 객체로 변환
    const formObject = {};
    for (const [key, value] of data.entries()) {
      if (formObject[key]) {
        // 같은 키가 있으면 배열로 변환
        if (Array.isArray(formObject[key])) {
          formObject[key].push(value);
        } else {
          formObject[key] = [formObject[key], value];
        }
      } else {
        formObject[key] = value;
      }
    }

    setFormData(formObject);
    alert('FormData로 폼이 제출되었습니다!');
  };

  const handleReset = () => {
    formRef.current.reset();
    setFormData(null);
  };

  return (
    <div className='demo-box'>
      <h3>FormData를 사용한 비제어 컴포넌트</h3>
      <p>FormData API를 사용하여 폼 데이터를 쉽게 수집할 수 있습니다.</p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <div className='form-group'>
          <label htmlFor='username'>사용자명:</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='사용자명을 입력하세요'
            defaultValue=''
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>이메일:</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='이메일을 입력하세요'
            defaultValue=''
          />
        </div>

        <div className='form-group'>
          <label>관심사:</label>
          <div className='checkbox-group'>
            <div className='checkbox-item'>
              <input
                type='checkbox'
                id='web'
                name='interests'
                value='웹 개발'
              />
              <label htmlFor='web'>웹 개발</label>
            </div>
            <div className='checkbox-item'>
              <input
                type='checkbox'
                id='mobile'
                name='interests'
                value='모바일 개발'
              />
              <label htmlFor='mobile'>모바일 개발</label>
            </div>
            <div className='checkbox-item'>
              <input type='checkbox' id='ai' name='interests' value='AI/ML' />
              <label htmlFor='ai'>AI/ML</label>
            </div>
          </div>
        </div>

        <div className='form-group'>
          <label>경험 수준:</label>
          <div className='radio-group'>
            <div className='radio-item'>
              <input type='radio' id='junior' name='level' value='주니어' />
              <label htmlFor='junior'>주니어</label>
            </div>
            <div className='radio-item'>
              <input type='radio' id='senior' name='level' value='시니어' />
              <label htmlFor='senior'>시니어</label>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button type='submit' className='button'>
            제출
          </button>
          <button type='button' className='button' onClick={handleReset}>
            초기화
          </button>
        </div>
      </form>

      {formData && (
        <div className='form-preview'>
          <h4>FormData 결과:</h4>
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
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

function UncontrolledComponents() {
  return (
    <div className='component-section'>
      <h2>2. 비제어 컴포넌트(Uncontrolled Components) 이해하기</h2>
      <p>
        비제어 컴포넌트는 DOM 요소가 직접 값을 관리하는 폼 요소입니다. useRef를
        통해 DOM에 접근하여 값을 가져오거나 설정할 수 있습니다.
      </p>

      <div className='code-example'>
        <strong>비제어 컴포넌트 기본 패턴:</strong>
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
          {`function UncontrolledForm() {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        ref={inputRef}
        defaultValue="기본값"
      />
      <button type="submit">제출</button>
    </form>
  );
}`}
        </pre>
      </div>

      <BasicUncontrolledForm />
      <FileUploadForm />
      <CheckboxRadioForm />
      <FormDataExample />

      <div className='highlight'>
        <strong>비제어 컴포넌트의 특징:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>DOM 요소가 직접 값을 관리</li>
          <li>useRef로 DOM에 접근</li>
          <li>성능상 이점 (리렌더링 적음)</li>
          <li>기본값 설정 가능 (defaultValue)</li>
          <li>간단한 폼에 적합</li>
        </ul>
      </div>

      <div className='code-example'>
        <strong>비제어 컴포넌트 사용 시기:</strong>
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
const fileRef = useRef();
<input type="file" ref={fileRef} />

// 2. 간단한 폼 (유효성 검사 불필요)
const nameRef = useRef();
<input type="text" ref={nameRef} defaultValue="" />

// 3. FormData 사용
const formRef = useRef();
const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(formRef.current);
};

// 4. 서드파티 라이브러리와 통합
const editorRef = useRef();
<RichTextEditor ref={editorRef} />`}
        </pre>
      </div>

      <div className='highlight'>
        <strong>제어 vs 비제어 컴포넌트 선택 가이드:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>
            <strong>제어 컴포넌트:</strong> 실시간 검증, 복잡한 상태 관리
          </li>
          <li>
            <strong>비제어 컴포넌트:</strong> 간단한 폼, 파일 업로드, 성능 중요
          </li>
          <li>
            <strong>혼합 사용:</strong> 폼의 특성에 따라 적절히 선택
          </li>
          <li>
            <strong>일관성:</strong> 프로젝트 내에서 일관된 패턴 사용
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UncontrolledComponents;
