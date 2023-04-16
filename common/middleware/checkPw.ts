import { checkPwSql } from "../../models/sign/checkPwSql"
import {pool} from '../../database/db';

export const checkPw = (id:string, pw:string) => {
    let checkUserInfo = pool.query(checkPwSql, id);
    return checkUserInfo;
}