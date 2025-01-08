import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string): Promise<string> => {

    console.log(password);


    return await bcrypt.hash(password, 10);
}

export const comparedPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
        return bcrypt.compare(password, hashedPassword);
}