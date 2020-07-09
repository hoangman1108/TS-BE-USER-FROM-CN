import { Sequelize } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password, {
    dialect: 'postgres',
    host: config.database.host,
    port: Number(config.database.port),
    logging: config.env === 'development' ? console.log : false,
    define: {
      underscored: true,
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    // TODO: add logger
    console.log(error);
  });

export default sequelize;
