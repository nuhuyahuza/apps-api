//signJWT.ts
import jwt from "jsonwebtoken";
import config from "@src/config/config";
import User from "@src/models/user.model";
import UserInterface from "@src/intefaces/user";

const NAMESPACE: string = 'auth';

const signJWT = (user: UserInterface, callback: (error: Error | null, token: string | null) => void) : void => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(config.token.expireTime) * 100000;
    const expirationTimeSeconds = Math.floor(expirationTime / 1000);

    try {
        jwt.sign({
            username: user.email,

        }, config.token.secret,
            {
            issuer:config.token.issuer,
                algorithm: "HS256",
            expiresIn:expirationTimeSeconds
            }, (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null,token)
                }
        });
    } catch (error:any) {
        callback(error, null);
    }
}

export default signJWT;