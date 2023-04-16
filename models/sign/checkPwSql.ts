import fs from 'fs';
import path from 'path';

export const checkPwSql = fs.readFileSync(path.join(__dirname,'../../database/sql','checkPw.sql'),'utf8');