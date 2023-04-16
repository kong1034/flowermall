import express, { Router, Request, Response } from 'express'
import {pool} from '../../database/db';
import {postSignUpSql} from '../../models/sign/postSignUpSql';
import {checkIdSql} from '../../models/sign/checkIdSql';
import { jwt } from '../../common/middleware/jwt';
import dotenv from 'dotenv';
import { checkReqParam } from '../../common/util/checkReqParam';
import { cryptPw } from '../../common/middleware/cryptPw';

const router:Router = express.Router();
dotenv.config();

//회원가입
export const postSignUpRouter = router.post('/', async (req:Request, res:Response) => {
    try {
        let sql = req.body;
        //파라미터값이 있는지 체크
        if(checkReqParam(sql)) {
            //가입 전 중복 아이디 체크
            let check = await pool.query(checkIdSql, req.body.user_id);

            if(check[0].length === 0) {
                // const salt = await bcrypt.genSalt(200);
                // let password = await bcrypt.hash(req.body.user_pw, salt);
                let password = await cryptPw(req.body.user_pw);
                console.log('check signup password ',password)
                let token = jwt(req.body.user_id, req.body.user_pw);
                console.log('check token => ', token);
                sql = [
                    req.body.user_num,
                    req.body.name,
                    req.body.user_id,
                    password,
                    req.body.nickname,
                    req.body.address,
                    req.body.phone_num,
                    token,
                    req.body.use_yn,
                    req.body.user_grade,
                    req.body.created_date
                ];
                await pool.query(postSignUpSql, sql)
                .then((value:any) => {
                    res.status(200).json({msg:'회원가입을 축하합니다.'});
                })
            } else {
                res.status(404).json({msg:'중복된 아이디가 있습니다.'})
            }
        } else {
            res.status(404).json({msg:'회원정보가 맞지 않습니다.'});
        }
        //req.body.toekn = jwt(req.body.user_id, req.body.user_pw);
    } catch (err) {return res.json(err);}
})