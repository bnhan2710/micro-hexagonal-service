import { Category } from "../model/model";
import { PagingDTO } from "../../../share/model/paging";
import { CategoryCondDTO, CategoryUpdateDTO,CategoryCreateDTO } from "../model/dto";

export interface ICategoryUseCase{
    createANewCategory(data:CategoryCreateDTO): Promise<string>;
    getDetailCategory(id:string): Promise<Category | null>;
    listCategory(cond: CategoryCondDTO, paging: PagingDTO): Promise<Category[]>;
    updateCategory(id:string, data:CategoryUpdateDTO): Promise<boolean>;
    deleteCategory(id:string): Promise<boolean>;
}

export interface IRepository extends ICommandRepository, IQuerryRepository{}

export interface IQuerryRepository{
    get(id:string): Promise<Category | null>;
    list(cond: CategoryCondDTO ,paging: PagingDTO): Promise<Category[]>;
}


export interface ICommandRepository{
    insert(data:Category): Promise<Boolean>;
    update(id:string, data:CategoryUpdateDTO): Promise<boolean>;
    delete(id:string, isHard:boolean): Promise<boolean>;    
}
