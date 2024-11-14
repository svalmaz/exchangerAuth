const redisClient = require("../utils/redisClient");

//Время жизни кода который мы отправляем, потом надо бы добавить функцию проверки email перед отправлением
const ttl = 600; 


//При надобности перенесем сюда создание кода 
async function saveCode(email, code){
    await redisClient.setAsync(email, code, "EX", ttl);
}

async function verifyCode(email, code){
    const storedCode = await redisClient.getAsync(email);
    if (storedCode === code){
        await redisClient.delAsync(email);
        return true;
    }
    return false;
}
module.exports = {
    saveCode,
    verifyCode,
};