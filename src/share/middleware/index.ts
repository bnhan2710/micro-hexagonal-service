import { ITokenIntrospect } from "../interface";
import { MdlFactory } from "../interface/service-context";
import { authMiddleware } from "./auth";
import { allowRoles } from "./check-role";

export const setupMiddleware = (introspector: ITokenIntrospect): MdlFactory => {
    const auth = authMiddleware(introspector);
    
    return {
        auth,
        allowRoles
    };
}