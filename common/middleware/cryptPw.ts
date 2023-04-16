import dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config();

export const cryptPw = async (pw:string) => {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        let hashedPassword = await bcrypt.hashSync(pw, salt);
        return hashedPassword;
    } catch (error) {
        console.error(error);
    }
}