import 'dotenv/config';

export default {
  development: {
    username: process.env.USERNAME_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE_MYSQL,
    host: process.env.HOST_MYSQL,
    port: process.env.PORT_MYSQL,
    dialect: 'mysql',
  },
};
