import express, {Router, Request, Response} from 'express';
import {pool} from '../../database/db';
import { postSignInSql } from '../../models/sign/postSignInSql';

const router:Router = express.Router();

export const postSignInRouter = router.post('/', async (req:Request, res:Response) => {
    try{
        let sql = req.body;
        console.log('응 들어왔네')
        await pool.query(postSignInSql, sql)
        .then((value:any) => {
            console.log('너 에러 아니야')

            console.log(res.statusCode);
            if(res.status(200)){
                return res.status(200).json(value[0][0])
            } else {
                return res.status(201).json({msg:'회원정보가 없습니다. 회원가입 해주세요.'})
            }
        })
        .catch((err:Error) => {
            console.log('응 맞아 나 에러')
            return res.json({msg:err});
        })
    } catch(err) {
        console.log('응 맞아 나 에러'); 
        res.json(err)}
})