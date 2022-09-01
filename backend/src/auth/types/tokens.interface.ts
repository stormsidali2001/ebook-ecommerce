export type jwtPayload = {
    sub:string;
    email:string;
    fullName:string;
}
export type tokens = {
    access_token:string;
    refresh_token:string;
}