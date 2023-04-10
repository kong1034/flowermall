import express, { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import {getAllRouter} from './routes/test/getAllRouter';
import { postSignUpRouter } from './routes/sign/postSignUpRouter';
import { postSignInRouter } from './routes/sign/postSignInRouter';

//.env 경로 설정
dotenv.config();

const app:Application = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//라우터 코드 가져오는 부분 
app.use('/', getAllRouter);
app.use('/signup', postSignUpRouter);
app.use('/signin', postSignInRouter);

//서버 실행하는 부분
app.listen(process.env.PORT, () => {
    console.log('====== 서버 시작 ======')
})