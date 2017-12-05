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
      "ignore_watch": [
        "node_modules",
        // "logs"
      ],
      // log_date_format: 'YYYY-MM-DD HH:mm Z',
      // error_file: './logs/app-err.log',
      // out_file: './logs/app-out.log',
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
        HOST: '127.0.0.1',
        COMMON_VARIABLE: true
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: 'production',
        HOST: '138.197.120.135'
      }
    }
  ],
  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'jweboy',
      host: '138.197.120.135',
      ref: 'origin/master',
      repo: 'git@github.com:jweboy/node-server.git',
      path: '/home/jweboy/www/production/node-server',
      ssh_options: "StrictHostKeyChecking=no",
      'pre-setup': "apt-get install git",
      "post-setup": "ls -la",
      "pre-deploy-local": "echo '本地发布测试'",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js --env production",
      "env": {
        "NODE_ENV": "production"
      }
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
