import { Model } from 'objection';
import { Knex } from 'knex';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config({ path: path.resolve(fileURLToPath(import.meta.url), '../.env') });

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

import knex from 'knex';

const rawKnex = knex(config); // Your Knex instance

// Type assertion (use with caution)
const typedKnex = rawKnex as Knex<any, any[]>;

Model.knex(typedKnex); // Pass the typed Knex instance

export default knex;