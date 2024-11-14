const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const authRoutes = require('../ExchangerAuth/routes/auth');

const PORT = process.env.PORT || 3005;
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);

});