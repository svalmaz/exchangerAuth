import redisClient from '../extensions/redisClient.js';
 
async function authSendCode(email){
    
    const code = Math.floor(100000 + Math.random() * 900000); 
    redisClient.redisSet(email, code);
    console.log("Code sent to "+email+" : "+code+"");
}
async function authVerifyCode(email, code){
    const storedCode = await redisClient.redisGet(email);
    if(!storedCode){
        return "Expired code";
    }
    else if (storedCode == code){
        await redisClient.redisDel(email);
        return "Ok";
    }
    else{
        return "Invalid code";
    }
}
export default {authSendCode, authVerifyCode};