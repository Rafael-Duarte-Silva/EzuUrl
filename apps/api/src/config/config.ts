import dotenv from "dotenv";

dotenv.config();

interface Config {
    port: number;
    urlSecret: string;
    domain: string;
    webDomain: string;
    nodeEnv: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    urlSecret: process.env.URL_SECRET || "",
    domain: process.env.DOMAIN || "",
    webDomain: process.env.WEB_DOMAIN || "",
    nodeEnv: process.env.NODE_ENV || "",
};

export default config;
