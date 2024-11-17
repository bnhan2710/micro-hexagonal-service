import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/base-model";
import { CreateCommand, IBrandRepository, UpdateCommand} from "../interface";
import { BrandCreateSchema, BrandUpdateSchema } from "../model/dto";
import { ErrDupliateBrandName } from "../model/errors";
import { ICommandHandler } from "../../../share/interface";
import { ErrDataNotFound } from "../../../share/model/base-error";

export class UpdateBrandHandler implements ICommandHandler<UpdateCommand,void>{
    constructor(private readonly repository: IBrandRepository) {}
    async execute(command: UpdateCommand): Promise<void> {
        const {success,data:parsedData,error} = BrandUpdateSchema.safeParse(command.dto);

        if(!success){
            throw new Error('Invalid data');
        }

        const isExist = await this.repository.get(command.id);
        if(!isExist || isExist.status === ModelStatus.DELETED){
            throw  ErrDataNotFound;
        }
        this.repository.update(command.id,parsedData);
        return
    }
}