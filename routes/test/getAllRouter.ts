import express, { Router, Request, Response } from 'express'
import {getAll} from '../../interface/getAllType';
import {pool} from '../../database/db';
import {getAllSql} from '../../models/test/getAllSql'; 

const router:Router = express.Router();

//url 주소 '/' 입력 했을때 실행되는 로직
export const getAllRouter = router.get('/', async (req:Request, res:Response) => {
    try {
        let sql = ["a","a","a","a","a","a","a","a"]
        await pool.query(getAllSql, )
        .then((value:getAll[][]) => {
            return res.json(value[0][0]);
        })
        .catch((err:Error) => {
            return console.log(err);
        })
    } catch (err) {
        console.log('router catch in')
        return res.json(err);
    }
})