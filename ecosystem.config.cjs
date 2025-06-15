module.exports = {
  apps: [
    {
      name: 'NuxtPocketstoreDocs',
      port: '5000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}