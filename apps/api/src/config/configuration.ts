export default () => ({
  PORT: parseInt(process.env.PORT) || 8081,
  JWT_SECRET: process.env.JWT_SECRET
});