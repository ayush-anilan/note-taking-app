import { Model } from 'objection';
import { Knex } from 'knex';
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
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