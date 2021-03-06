module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'node-api-server',
      script: 'npm',
      args: 'run start:prod',
      error: './logs/error.log',
      log_type: 'json',
      log_date_format: 'YYYY-MM-DD HH:mm',
      // exec_mode: 'cluster',
      // instances: 4,
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
      user: 'root',
      host: ['118.24.155.105'],
      ref: 'origin/master',
      repo: 'https://github.com/jweboy/node-RESTful-API-server.git',
      path: '/home/www/node-api-server',
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-setup': 'apt-get install git ; ls -la',
      'post-setup': 'ls -la',
      'pre-deploy-local': 'echo "This is a local executed command"',
      'pre-deploy': 'git fetch && git pull origin master',
      'post-deploy': 'yarn install && pm2 startOrRestart ecosystem.config.js',
      'env': {
        'NODE_ENV': 'production'
      }
    }
  }
}
