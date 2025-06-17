import { ITokenProvider, TokenPayload } from "../interface";
import jwt from "jsonwebtoken";
import { config } from "./config";

class JwtTokenService implements ITokenProvider  {
    private readonly secretKey: string;
    private readonly expiresIn: string | number;

    constructor(secretKey: string, expiresIn: string | number) {
        this.secretKey = secretKey;
        this.expiresIn = expiresIn;
    }

   async generateToken(payload: TokenPayload , expries?: string): Promise<string> {
        // const payload = {userId}
        return jwt.sign(payload, this.secretKey, { expiresIn: expries ? expries : this.expiresIn });
    }

   async verifyToken(token: string): Promise<TokenPayload> {
        const decoded = jwt.verify(token, this.secretKey) as TokenPayload;
        return decoded;
   }
}

export const jwtProvider = new JwtTokenService(
    config.accessToken.secretKey,
    config.accessToken.expiresIn
);