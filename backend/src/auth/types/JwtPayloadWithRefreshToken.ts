import { jwtPayload } from "./tokens.interface";

export type  RequestWithUser = jwtPayload & {
    refresh_token:string;
}