import * as path from 'path';
import fs from 'fs';

//sql 파일 불러오는 부분
export const getAllSql = fs.readFileSync(path.join(__dirname, '../../database/sql', 'getAll.sql'), 'utf8');
