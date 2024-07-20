import { User } from "./type";

declare global {
    interface CustomJwtSessionClaims extends User {}
}