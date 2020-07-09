import Umzug from 'umzug';
import { Sequelize } from 'sequelize';

export const migrateDB = (sequelize: Sequelize, path: string) => new Umzug({
  migrations: {
    path,
    pattern: /\.migration.ts$/,
    params: [
      sequelize.getQueryInterface(),
      sequelize.constructor,
      (): void => {
        throw new Error(`Migration tried to use old style "done" callback.
          Please upgrade to "umzug" and return a promise instead.`);
      },
    ],
  },
  storage: 'sequelize',
  storageOptions: { sequelize },
}).up();
