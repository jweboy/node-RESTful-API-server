module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // My application
    {
      name: 'node-api',
      script: 'app.js',
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 4000,
        NODE_ENV: 'production'
      }
    }
  ],
  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'root',
      host: '165.227.6.201',
      ref: 'origin/master',
      repo: 'git@github.com:jweboy/node-server.git',
      path: '/var/www/production',
      // ssh_options: "StrictHostKeyChecking=no",
      // 'pre-setup': "apt-get install git",
      "pre-deploy-local": "echo '本地发布测试'",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    },
    // dev: {
    //   user: 'node',
    //   host: '212.83.163.1',
    //   ref: 'origin/master',
    //   repo: 'git@github.com:jweboy/node-server.git',
    //   path: '/var/www/development',
    //   'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
    //   env: {
    //     NODE_ENV: 'dev'
    //   }
    // }
  }
};
