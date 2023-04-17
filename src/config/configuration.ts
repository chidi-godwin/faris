export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  api: {
    URL: process.env.API_URL,
  },
});
