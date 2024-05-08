import { Model } from 'objection';
import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'ayushpsql',
    database: 'notes'
  },
  migrations: {
    directory: './src/database/migrations'
  },
  seeds: {
    directory: './src/database/seeds'
  }
};

const knex = require('knex')(config);

Model.knex(knex);

export = knex;