import webtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const jwt = (id:string, pw:string) => {
    let SECRETKEY:any = process.env.SALT;
        let secretKey = Date.now()+SECRETKEY;
        return webtoken.sign({
            type: "JWT",
            user_id: id,
            user_pw: pw,
          },
          secretKey,
          {
            expiresIn: "15m", // 15분후 만료
            issuer: "gogo",
          })
}