
const config = {
  env: process.env.ENV || 'development',
  port: process.env.PORT || '7000',
  database: {
    name: 'userdb',
    username: process.env.DB_USERNAME || 'postgres',
    host: 'user-db',
    port: 5432,
    password: process.env.DB_PASSWORD || 'postgres',
  },
  jwtToken: process.env.JWT_TOKEN || 'jwt'
};

export default config;
