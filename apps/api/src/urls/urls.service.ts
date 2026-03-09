import Hashids from "hashids";
import { redisClient } from "../db/redis.database";
import config from "../config/config";
import { createUrlRepository, getUrlByCodeRepository } from "./urls.repository";

const SALT = config.urlSecret;
const MIN_LENGTH = 4;
const ALPHABET =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const hashIds = new Hashids(SALT, MIN_LENGTH, ALPHABET);

export const createShortUrlService = async (
    longUrl: string,
): Promise<string> => {
    const urlCounter = await redisClient.incr("url_counter");
    const urlCode = hashIds.encode(urlCounter);

    await createUrlRepository(urlCode, Date.now(), longUrl);

    return urlCode;
};

export const getUrlByCodeService = async (code: string): Promise<string> => {
    const result = await getUrlByCodeRepository(code);
    if (!result) return result;

    return result.long_url;
};

