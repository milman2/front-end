import React from 'react';

interface BuildInfoProps {
  buildTime?: string;
  version?: string;
  environment?: string;
}

const BuildInfo: React.FC<BuildInfoProps> = ({
  buildTime,
  version,
  environment,
}) => {
  return (
    <div className="build-info">
      <h3>빌드 정보</h3>
      <div className="info-grid">
        <div className="info-item">
          <span className="label">환경:</span>
          <span className="value">{environment || 'development'}</span>
        </div>
        <div className="info-item">
          <span className="label">버전:</span>
          <span className="value">{version || '1.0.0'}</span>
        </div>
        <div className="info-item">
          <span className="label">빌드 시간:</span>
          <span className="value">
            {buildTime || new Date().toLocaleString()}
          </span>
        </div>
        <div className="info-item">
          <span className="label">Node.js 버전:</span>
          <span className="value">{process.env.REACT_APP_NODE_VERSION}</span>
        </div>
      </div>
    </div>
  );
};

export default BuildInfo;
