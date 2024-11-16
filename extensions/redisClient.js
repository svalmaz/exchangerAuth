import redis from 'redis';
import dbLog from '../logs/db.js';
let client;
async function redisInit(){
    if(!client){
        client = redis.createClient();
        client.on("error", (err)=>{
            console.log("Redis client error", err);
            dbLog.saveLog("warning", err);
        });
        await client.connect();
        dbLog.saveLog("debug", "redis connected");

        console.log("Redis успешно подключен");
    }
}

async function redisSet(key, value){
    await redisInit();
    await dbLog.saveLog("info", "code saved");
    await client.set(key, value, {EX: 900});
}


async function redisGet(key){
    await redisInit();
    return await client.get(key);
}


async function redisDel(key){
    await redisInit();
    await client.del(key);
}
export default  {redisSet, redisGet, redisDel};