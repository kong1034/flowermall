import fs from 'fs';
import path from 'path';

export const checkIdSql = fs.readFileSync(path.join(__dirname,'../../database/sql', 'checkId.sql'),'utf8')