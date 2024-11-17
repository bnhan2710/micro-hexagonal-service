import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/base-model";
import { CreateCommand, IBrandRepository} from "../interface";
import { BrandCreateSchema } from "../model/dto";
import { ErrDupliateBrandName } from "../model/errors";
import { ICommandHandler } from "../../../share/interface";

export class CreateNewBrandHandler implements ICommandHandler<CreateCommand,string>{
    constructor(private readonly repository: IBrandRepository) {}
    async execute(command: CreateCommand): Promise<string> {
        const {success,data:parsedData,error} = BrandCreateSchema.safeParse(command.cmd);

        if(!success){
            throw new Error('Invalid data');
        }

        const isExist = await this.repository.findByCond({name:parsedData.name});
        if(isExist){
            throw  ErrDupliateBrandName;
        }

        const newId = v7();
        const newBrand = {
            ...parsedData,
            id: newId,
            status: ModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await this.repository.insert(newBrand);
        return newId;
    }
}