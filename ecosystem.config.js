module.exports = {
  apps: [{
    name: 'mikroerp-rapor',
    script: './dist/app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/pm2/error.log',
    out_file: './logs/pm2/output.log',
    log_file: './logs/pm2/combined.log',
    merge_logs: true,
    time: true
  }]
}; 