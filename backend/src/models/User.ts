import { Model  } from 'objection';

export default class User extends Model {
    id!: number;
    email!: string;
    password!: string;
    verified!: boolean;
  
    static tableName = 'users';
  }

  
