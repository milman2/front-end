import React from 'react';

interface DeploymentInfo {
  platform: string;
  url: string;
  status: 'deployed' | 'building' | 'failed';
  lastDeploy: string;
}

const DeploymentStatus: React.FC = () => {
  const deployments: DeploymentInfo[] = [
    {
      platform: 'Netlify',
      url: 'https://step12-build-deploy.netlify.app',
      status: 'deployed',
      lastDeploy: new Date().toLocaleString(),
    },
    {
      platform: 'Vercel',
      url: 'https://step12-build-deploy.vercel.app',
      status: 'deployed',
      lastDeploy: new Date().toLocaleString(),
    },
    {
      platform: 'GitHub Pages',
      url: 'https://username.github.io/step12-build-deploy',
      status: 'building',
      lastDeploy: new Date().toLocaleString(),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return '#28a745';
      case 'building':
        return '#ffc107';
      case 'failed':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'deployed':
        return '배포됨';
      case 'building':
        return '빌드 중';
      case 'failed':
        return '실패';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className="deployment-status">
      <h3>배포 상태</h3>
      <div className="deployments-list">
        {deployments.map((deployment, index) => (
          <div key={index} className="deployment-item">
            <div className="deployment-header">
              <span className="platform">{deployment.platform}</span>
              <span
                className="status"
                style={{ color: getStatusColor(deployment.status) }}
              >
                {getStatusText(deployment.status)}
              </span>
            </div>
            <div className="deployment-details">
              <div className="url">
                <a
                  href={deployment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {deployment.url}
                </a>
              </div>
              <div className="last-deploy">
                마지막 배포: {deployment.lastDeploy}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeploymentStatus;
