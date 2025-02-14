module.exports = {
  apps: [{
    name: 'mikroerp-rapor',
    script: './dist/app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      TZ: 'Europe/Istanbul'
    },
    env_file: '.env',
    error_file: './logs/error.log',
    out_file: './logs/output.log',
    log_file: './logs/combined.log',
    merge_logs: true,
    time: true
  }]
}; 