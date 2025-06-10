const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const routes = require("@routes/index.routes");
const cookieParser = require("cookie-parser");
const config = require("@config/index.config");
const errorHandlers = require("@middleware/errorHandler.middleware");

const app = express();

//This backend will be behind proxy
app.set("trust proxy", true);

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser(config.cookie.secret));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(routes);
app.get("/", (_, res) => {
  res.status(200).send({
    message: "Endpoint Running",
  });
});

app.use(errorHandlers);

module.exports = app;
