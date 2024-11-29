import jwt from 'jsonwebtoken';

class JwtClient{
    constructor (secretKey, options = {}){
        this.secretKey = secretKey;
        this.options = options
    }
    async generateToken(payload){
        return new Promise((resolve, reject) =>{
            jwt.sign(payload, this.secretKey, this.options, (err, token)=>{
                if (err) reject(err);
                else resolve(token)
            });
        });
    }
    async verifyToken(token){
        return new Promise((resolve, reject)=>{
            jwt.verify(token, this.secretKey, (err, decoded) =>{
                if (err) reject (new Error("Invalid token"));
                else resolve(decoded);
            });
        });
    }

    
}
export {JwtClient}