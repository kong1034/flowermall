import webtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const jwt = (id:string, pw:string) => {
    let SECRETKEY:any = process.env.SECRETKEY;
    let ALGO:any = process.env.JWT_ALGO;
    let EXPIRE:any = process.env.JWT_EXPIRE;
    let ISSUER:any = process.env.JWT_ISSUER
    let secretKey = pw+SECRETKEY;

    return webtoken.sign({
        type: "JWT",
        user_id: id,
        user_pw: pw,
      },
      secretKey,
      {
        algorithm: ALGO,
        expiresIn: EXPIRE,
        issuer: ISSUER
      })
}