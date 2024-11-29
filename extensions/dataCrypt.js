import bcrypt from 'bcrypt';

class PasswordService{
    constructor (saltRounds = 10){
        this.saltRounds = saltRounds;
    }
    async hashPassword(password){
        if(!password){
            return new Error("Password cannot be empty!");
        }
        return await bcrypt.hash(password, this.saltRounds);

    }
    async verifyTokens(password, hash){
        if (!password || !hash){
            return Error("Password and hash are required");
        }
        return await bcrypt.compare(password, hash);
    }
}