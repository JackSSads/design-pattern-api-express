const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT

// conexão com o banco de dados
const connection = require("./db/connection");

// import das rotas
const { auth_router } = require("./routes");

// import dos middleweres
const { cors, logger } = require("./middleweres");

// import logs de erros
const errorHandler = require('./logs/errorHandle');

// configuração do express
app.use(
    express.urlencoded({
        extends: true,
    }),
);
app.use(express.json());

// Middleweres
app.use(cors);
app.use(logger);
app.use(errorHandler);

// endpoits
app.use("/auth", auth_router);

// Servindo API se o db estiver conectado
connection
    .then(() => {
        app.listen(PORT, () => {
            console.log(`[RUNNIG] - Servindo na porta ${PORT}`);
        });
    })
    .catch((error) => console.log(`[ERROR] - ${error}`));