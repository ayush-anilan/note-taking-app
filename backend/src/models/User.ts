import { Model  } from 'objection';

export default class User extends Model {
    id!: number;
    email!: string;
    password!: string;
    verified!: boolean;
    verificationToken!: string | null;
  
    static tableName = 'users';

  }

  
