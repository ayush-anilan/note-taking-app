import { Model } from 'objection';
import Knex from 'knex';
import knexConfig from './knexfile';

const knexInstance = Knex(knexConfig);

Model.knex(knexInstance);

export default knexInstance;