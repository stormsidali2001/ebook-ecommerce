import { jwtPayload } from "./tokens.interface";

export type  JwtPayloadWithRefreshToken = jwtPayload & {
    refresh_token:string;
}
