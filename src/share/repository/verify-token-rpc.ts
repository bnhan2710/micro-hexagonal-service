import axios from "axios";
import { ITokenIntrospect, TokenIntrospectResult } from "../interface";

export class TokenIntrospectRPCClient implements ITokenIntrospect {
    constructor(private readonly rpcUrl: string) {}

    async instropect(token: string): Promise<TokenIntrospectResult> {
        try {
            const { data } = await axios.post(`${this.rpcUrl}/introspect`, { token });
            const {sub, role} = data.data;

            return {
                payload: { sub, role },
                isOk: true
            };
        } catch (error) {
            return {
                payload: null,
                error: error as Error,
                isOk: false
            };
        }
    }
}