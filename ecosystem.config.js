module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'node-api-server',
      script: 'dist/main.js',
      error: './logs/error.log',
      log_type: 'json',
      log_date_format: 'YYYY-MM-DD HH:mm',
      // exec_mode: 'cluster',
      // instances: 'max',
      watch: true,
      ignore_watch: [
        'node_modules'
      ],
      env_production: {
        PORT: 3000,
        NODE_ENV: 'production',
        HOST: '118.24.155.105'
      },
      // env: {
      //   PORT: 3000,
      //   NODE_ENV: 'development',
      //   HOST: '127.0.0.1',
      //   COMMON_VARIABLE: true
      // },
    }
  ],
  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      key: '~/.ssh',
      user: 'root',
      host: ['118.24.155.105'],
      ref: 'origin/master',
      repo: 'https://github.com/jweboy/node-RESTful-API-server.git',
      path: '/home/www/node-api-server',
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-setup':'echo "pm2 deploy"',
      'pre-deploy': 'git fetch && git pull origin master',
      'post-deploy': 'npm install && pm2 startOrRestart',
      'env': {
        'NODE_ENV': 'production'
      }
    }
  }
}
