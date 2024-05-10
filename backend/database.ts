import { Model } from 'objection';
import Knex from 'knex';
const knexConfig = require('./knexfile');

const knexInstance = Knex(knexConfig);

Model.knex(knexInstance);

export default knexInstance;