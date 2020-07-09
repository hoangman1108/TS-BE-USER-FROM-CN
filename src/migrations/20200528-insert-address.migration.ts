// import {QueryInterface} from 'sequelize';
import sequelize from '../models/sequelize';

import fs = require('fs');


const migration = {
  up: (): Promise<[any, number]> => new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/insert-address-script.sql`, (err: NodeJS.ErrnoException|null, content: Buffer): void => {
      if (err) reject(err);
      else resolve(sequelize.query(content.toString()));
    });
  }),
  // down: (queryInterface: QueryInterface): Promise<void> => queryInterface.dropTable('actions'),
};

export default migration;
