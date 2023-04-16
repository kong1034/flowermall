import express, {Router, Request, Response} from 'express';
import * as bcrypt from 'bcrypt';
import webtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {pool} from '../../database/db';
import { postSignInSql } from '../../models/sign/postSignInSql';
import { checkPw } from '../../common/middleware/checkPw';

const router:Router = express.Router();
dotenv.config();

export const postSignInRouter = router.post('/', async (req:Request, res:Response) => {
    try{
        let sql = [req.body.user_id, req.body.user_pw];
        console.log(sql);
        let SECRETKEY:any = process.env.SECRETKEY;
        let info = await checkPw(req.body.user_id, req.body.user_pw);
        console.log('check info => ', info[0][0]);
        if(info[0][0] == null) {
            return res.status(404).json({msg:'입력하신 정보가 맞지 않습니다.'});
        } else {
            let check = await bcrypt.compare(req.body.user_pw, info[0][0].user_pw)
            if(check) {

                let tokenSecret = req.body.user_pw+SECRETKEY;
                let checkToken = webtoken.verify(info[0][0].token,tokenSecret);
                if(checkToken === null) {
                    return res.status(404).json({msg:'입력하신 정보가 맞지 않습니다.'})
                } else {
                    return res.status(200).json({msg:'로그인 성공', token:info[0][0].token})
                }
            }
        }

        await pool.query(postSignInSql, sql)
        .then((value:any) => {
            if(value[0][0] == null){
                return res.status(404).json({msg:'회원정보가 맞지않습니다.'})
            } else {
                
                return res.status(200).json(value[0][0])
            }
        })
        .catch((err:Error) => {
            return res.status(404).json({msg:err});
        })
    } catch(err) {
        res.status(500).json(err)}
})