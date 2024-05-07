import { Model as ObjectionModel, QueryBuilderBase } from 'objection';

declare module 'objection' {
    interface Model {
      QueryBuilder: typeof QueryBuilderBase;
    }
  }
  
  export class Model extends ObjectionModel {
    static QueryBuilder: typeof QueryBuilderBase;
  }