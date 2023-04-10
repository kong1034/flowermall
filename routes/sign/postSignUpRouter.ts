import express, { Router, Request, Response } from 'express'
import {pool} from '../../database/db';
import {postSignUpSql} from '../../models/sign/postSignUpSql';
import { postSignInSql } from '../../models/sign/postSignInSql';
import { jwt } from '../../common/middleware/jwt';
import dotenv from 'dotenv';

const router:Router = express.Router();
dotenv.config();

//url 주소 '/' 입력 했을때 실행되는 로직
export const postSignUpRouter = router.post('/', async (req:Request, res:Response) => {
    try {
        //req.body.toekn = jwt(req.body.user_id, req.body.user_pw);
        console.log('check req => ', req.body.user_id);
        let check = await pool.query('select * from user where user_id = ?', [req.body.user_id])
        console.log(check[0]);
        let sql = req.body;
    } catch (err) {return res.json(err);}
})