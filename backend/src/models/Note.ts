import { Model } from 'objection';
import User from './User';

export default class Note extends Model {
  id!: number;
  title!: string;
  content!: string;
  userId!: number;

  static tableName = 'notes';

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'notes.userId',
        to: 'users.id',
      },
    },
  };
}