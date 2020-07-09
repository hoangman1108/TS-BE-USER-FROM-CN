import app from './app';
import config from './config';
import { migrateDB } from './components/migration';
import db from './models';

const pathToMigration = `${__dirname}/migrations/`;
migrateDB(db.sequelize, pathToMigration).catch((e) => console.error(e, 'migrateDB error'));

app.listen(config.port, () => {
  console.log(`Express started.\nListening on port ${config.port}`);
});
