const express = require('express');
const codeService = require("../services/codeService");

const router = express.Router();

/**
 * @swagger
 * /auth/sendСode:
 *   post:
 *     summary: Отправить код подтверждения на email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Код успешно отправлен.
 *       400:
 *         description: Ошибка запроса.
 */
router.post("/sendCode", async (req, res)=>{
    const {email} = req.body;
    const code = Math.floor(100000 + Math.random() * 900000);
    await codeService.saveCode(email, code);
    console.log(`Code sent to ${email}, ${code}`);
    res.status(200).json({message: "Code sent"});
})
router.get('/', async (req, res) => {
    console.log("start");
    const code = Math.floor(100000 + Math.random() * 900000);
    console.log("log codec");

    await codeService.saveCode("email", code);

    console.log(`Code sent to ${"email"}, ${code}`);
    res.status(200).json({message: "Code sent"});
  });
module.exports = router;