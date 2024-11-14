const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition:{
        openapi : "3.0.0",
        info:{
            title: "AuthAPI",
            version: "1.0.0",
            description: "Desc for Swagger",
        },
        servers: [
            {
                url: "https://localhost:3002",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpecs = swaggerJsdoc(options);
module.exports = swaggerSpecs;