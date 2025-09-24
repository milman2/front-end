import React, { useState } from 'react';

interface DeploymentStep {
  platform: string;
  steps: string[];
  commands?: string[];
}

const DeploymentGuide: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('netlify');

  const deploymentGuides: Record<string, DeploymentStep> = {
    netlify: {
      platform: 'Netlify',
      steps: [
        'GitHub 저장소에 코드 푸시',
        'Netlify 웹사이트에 로그인',
        'New site from Git 클릭',
        'GitHub 저장소 선택',
        '빌드 설정 확인 (빌드 명령어: npm run build, 배포 디렉토리: build)',
        'Deploy site 클릭',
      ],
      commands: [
        'git add .',
        'git commit -m "Deploy to Netlify"',
        'git push origin main',
      ],
    },
    vercel: {
      platform: 'Vercel',
      steps: [
        'GitHub 저장소에 코드 푸시',
        'Vercel 웹사이트에 로그인',
        'New Project 클릭',
        'GitHub 저장소 선택',
        '프레임워크: Create React App 선택',
        'Deploy 클릭',
      ],
      commands: [
        'git add .',
        'git commit -m "Deploy to Vercel"',
        'git push origin main',
      ],
    },
    github: {
      platform: 'GitHub Pages',
      steps: [
        'gh-pages 패키지 설치',
        'package.json에 배포 스크립트 추가',
        '빌드 실행',
        'gh-pages로 배포',
      ],
      commands: [
        'npm install --save-dev gh-pages',
        'npm run build',
        'npx gh-pages -d build',
      ],
    },
  };

  const currentGuide = deploymentGuides[selectedPlatform];

  return (
    <div className="deployment-guide">
      <h3>배포 가이드</h3>
      <div className="platform-selector">
        {Object.keys(deploymentGuides).map((platform) => (
          <button
            key={platform}
            className={`platform-btn ${
              selectedPlatform === platform ? 'active' : ''
            }`}
            onClick={() => setSelectedPlatform(platform)}
          >
            {deploymentGuides[platform].platform}
          </button>
        ))}
      </div>

      <div className="guide-content">
        <h4>{currentGuide.platform} 배포 단계</h4>
        <div className="steps-section">
          <h5>단계별 가이드:</h5>
          <ol className="steps-list">
            {currentGuide.steps.map((step, index) => (
              <li key={index} className="step-item">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {currentGuide.commands && (
          <div className="commands-section">
            <h5>필요한 명령어:</h5>
            <div className="commands-list">
              {currentGuide.commands.map((command, index) => (
                <div key={index} className="command-line">
                  <code>{command}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="note-section">
          <h5>📝 참고사항:</h5>
          <ul className="notes-list">
            <li>
              배포 전에 반드시 <code>npm run build</code>로 빌드 테스트
            </li>
            <li>환경 변수가 필요한 경우 배포 플랫폼에서 설정</li>
            <li>도메인 설정은 배포 후 플랫폼 설정에서 가능</li>
            <li>자동 배포를 위해 GitHub Actions 사용 권장</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeploymentGuide;
