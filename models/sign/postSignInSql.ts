import fs from 'fs';
import path from 'path';

export const postSignInSql = fs.readFileSync(path.join(__dirname,'../../database/sql','postSignIn.sql'),'utf8');