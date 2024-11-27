import redisClient from '../extensions/redisClient.js';
import axios from 'axios';
import https from 'https';
async function authSendCode(email){
    const agent = new https.Agent({  
        rejectUnauthorized: false
      });
    const code = Math.floor(100000 + Math.random() * 900000); 
    
    try {
        const response = await axios.post('http://svalmazchecks1-001-site1.ntempurl.com/api/email/send', {
            
                "recipientEmail": "almaz.0.saparbaev@gmail.com",
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
        return "Ok";
    }
    else{
        return "Invalid code";
    }
}
export default {authSendCode, authVerifyCode};