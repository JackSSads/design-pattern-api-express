const express = require("express");
const app = express();
const session = require("express-session");
const FileStore = require("session-file-store")(session);
require("dotenv").config();
const PORT = process.env.PORT

// conexão com o banco de dados
const connection = require("./db/connection");

// import das rotas
//const { auth_router } = require("./routes");

// import dos middleweres
const { conf_cors, logger } = require("./middleweres");

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
app.use(conf_cors);
app.use(logger);
app.use(errorHandler);

// endpoits
//app.use("/auth", auth_router);

// Servindo API se o db estiver conectado
connection
    .sync()
    .then(() => {
        app.listen(PORT, () => console.log("[RUNNING] - Conectado ao bando de dados."));
    })
    .catch((error) => console.log(error));