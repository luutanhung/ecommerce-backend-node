module.exports = {
  apps: [
    {
      name: "worker",
      script: "./dist/workers/index.js",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
