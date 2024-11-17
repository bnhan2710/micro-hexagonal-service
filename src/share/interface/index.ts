import { PagingDTO } from "../model/paging";

export interface IRepository<Entity, Cond, UpdateDTO>
  extends ICommandRepository<Entity, UpdateDTO>,
    IQueryRepository<Entity, Cond> {}

export interface IQueryRepository<Entity, Cond> {
  get(id: string): Promise<Entity | null>;
  findByCond(cond: Cond): Promise<Entity | null>;
  list(cond: Cond, paging: PagingDTO): Promise<Entity[]>;
}

export interface ICommandRepository<Entity, UpdateDTO> {
  insert(data: Entity): Promise<boolean>;
  update(id: string, data: UpdateDTO): Promise<boolean>;
  delete(id: string, isHard: boolean): Promise<boolean>;
}

export interface ICommandHandler<Cmd, Result>{
  //Command is a DTO 
  execute(command:Cmd):Promise<Result>
}
export interface IQueryHandler<Query, Result>{

  query(query:Query):Promise<Result>
}