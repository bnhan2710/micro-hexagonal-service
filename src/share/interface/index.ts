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

export interface IUsecase<CreateDTO, UpdateDTO, Entity, Cond>{
  create(data:CreateDTO):Promise<string >
  getDetail(id:string):Promise<Entity | null>
  list(cond:Cond, paging:PagingDTO):Promise<Entity[]>
  update(id:string, data:UpdateDTO):Promise<boolean>
  delete(id:string):Promise<boolean>
}

export interface TokenPayload {
  sub: string;
  role: UserRole;
}


export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export type UserToken = {
  accessToken: string;
  refreshToken: string;
}

export interface Requester extends TokenPayload {}

export interface ITokenProvider {
  generateToken(payload: TokenPayload): Promise<string>;
  verifyToken(token: string): Promise<TokenPayload | null>;
}


//Authorization result
export type TokenIntrospectResult = {
  payload: TokenPayload | null;
  error?: Error;
  isOk: boolean;
}