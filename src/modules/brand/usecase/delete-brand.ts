import { ICommandHandler} from "../../../share/interface";
import { ModelStatus } from "../../../share/model/base-model";
import { DeleteCommand, IBrandRepository } from "../interface";

export class DeleteBrandHandler implements ICommandHandler<DeleteCommand,void>{
    constructor(private readonly repository: IBrandRepository){}
    async execute(command: DeleteCommand): Promise<void> {
        const isExist = await this.repository.get(command.id);
        if(!isExist || isExist.status === ModelStatus.DELETED ){
            throw new Error('Data not found');
        }
        await this.repository.delete(command.id,command.isHard);
        return;
    }
}
