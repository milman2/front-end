import React from 'react';
import BuildInfo from './components/BuildInfo';
import PerformanceMetrics from './components/PerformanceMetrics';
import DeploymentStatus from './components/DeploymentStatus';
import DeploymentGuide from './components/DeploymentGuide';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>12단계: 빌드와 배포</h1>
        <p>React 앱의 빌드 최적화와 배포 과정을 학습합니다.</p>
      </header>

      <main className="App-main">
        <div className="content-grid">
          <BuildInfo
            buildTime={process.env.REACT_APP_BUILD_TIME}
            version={process.env.REACT_APP_VERSION}
            environment={process.env.NODE_ENV}
          />

          <PerformanceMetrics />

          <DeploymentStatus />

          <DeploymentGuide />
        </div>

        <div className="build-commands">
          <h3>빌드 명령어</h3>
          <div className="command-list">
            <div className="command-item">
              <code>npm run build</code>
              <span>프로덕션 빌드 생성</span>
            </div>
            <div className="command-item">
              <code>npm run format</code>
              <span>코드 포맷팅</span>
            </div>
            <div className="command-item">
              <code>npm run lint</code>
              <span>코드 린팅</span>
            </div>
            <div className="command-item">
              <code>npm run test</code>
              <span>테스트 실행</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
