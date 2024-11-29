import redisClient from '../extensions/redisClient.js';
import axios from 'axios';
import https from 'https';
import  {JwtService}  from './auth/jwtService.js';
async function authSendCode(email){
    const agent = new https.Agent({  
        rejectUnauthorized: false
      });
    const code = Math.floor(1000 + Math.random() * 900); 
    redisClient.redisSet(email, code)
    try {
        const response = await axios.post('http://svalmazchecks1-001-site1.ntempurl.com/api/email/send', {
            
                "recipientEmail": email,
                "subject": "asd",
                "body": code.toString()
              
        }, {
          httpsAgent: agent // Указываем axios использовать агента
        });
        console.log('Verification code sent:', response.data);
      } catch (error) {
        console.error('Error sending verification code:', error);
      }
    console.log("Code sent to "+email+" : "+code+"");
}
async function authVerifyCode(email, code){
    const storedCode = await redisClient.redisGet(email);
    if(!storedCode){
        return "Expired code";
    }
    else if (storedCode == code){
        await redisClient.redisDel(email);
        const jwtService = new JwtService('justCodeForEncode', {expiresIn : '15m'});
        const token = jwtService.generateToken({ userEmail: email });
        return token;
    }
    else{
        return "Invalid code";
    }
}
export default {authSendCode, authVerifyCode};