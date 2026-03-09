import express from "express";
import cors from "cors";

import urls from "./urls/urls.routes";

import config from "./config/config";

import { logErrors } from "./middlewares/logError";
import { clientErrorHandler } from "./middlewares/clientErrorHandler";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: `${config.nodeEnv === "development" ? "http" : "https"}://${config.webDomain}`,
        credentials: true,
        exposedHeaders: ["Location"],
    }),
);

app.get("/hello-world", (req, res) => {
    res.send("Hello World!");
});

app.use("/", urls);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

export default app;
