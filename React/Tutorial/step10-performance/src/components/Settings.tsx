import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'ko',
    notifications: true,
    emailAlerts: false,
    autoSave: true,
    dataRetention: '1year',
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // 설정 저장 시뮬레이션
    alert('설정이 저장되었습니다!');
  };

  const handleReset = () => {
    if (window.confirm('모든 설정을 기본값으로 초기화하시겠습니까?')) {
      setSettings({
        theme: 'light',
        language: 'ko',
        notifications: true,
        emailAlerts: false,
        autoSave: true,
        dataRetention: '1year',
      });
    }
  };

  return (
    <div className="settings">
      <h3>설정</h3>

      <div className="settings-sections">
        <div className="settings-section">
          <h4>일반 설정</h4>
          <div className="setting-item">
            <label>테마</label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            >
              <option value="light">라이트</option>
              <option value="dark">다크</option>
              <option value="auto">자동</option>
            </select>
          </div>

          <div className="setting-item">
            <label>언어</label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h4>알림 설정</h4>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              푸시 알림 활성화
            </label>
          </div>

          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) => handleSettingChange('emailAlerts', e.target.checked)}
              />
              이메일 알림 활성화
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h4>데이터 설정</h4>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
              />
              자동 저장 활성화
            </label>
          </div>

          <div className="setting-item">
            <label>데이터 보존 기간</label>
            <select
              value={settings.dataRetention}
              onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
            >
              <option value="1month">1개월</option>
              <option value="3months">3개월</option>
              <option value="6months">6개월</option>
              <option value="1year">1년</option>
              <option value="forever">영구</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="save-btn" onClick={handleSave}>
          설정 저장
        </button>
        <button className="reset-btn" onClick={handleReset}>
          기본값으로 초기화
        </button>
      </div>

      <div className="settings-info">
        <h4>시스템 정보</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">버전:</span>
            <span className="info-value">1.0.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">빌드:</span>
            <span className="info-value">2024.01.15</span>
          </div>
          <div className="info-item">
            <span className="info-label">환경:</span>
            <span className="info-value">Production</span>
          </div>
          <div className="info-item">
            <span className="info-label">마지막 업데이트:</span>
            <span className="info-value">2024-01-15 14:30</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
