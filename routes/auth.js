import express from 'express';
import verifyEmail  from '../middleware/verifyEmail.js';

const router = express.Router();

router.post("/sendCode", async (req, res)=>{
    const {email} = req.body;
    
    await verifyEmail.authSendCode(email);
    
    res.status(200).json({Message : "Code sent"});
})

router.post("/verifyCode", async(req, res)=>{

    const {email, code} = req.body;
    const result = await verifyEmail.authVerifyCode(email, code);
    res.status(201).json({Message: result});
})
export default router;