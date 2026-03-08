import { cassandraClient } from "../db/cassandra.database";

export const createUrlRepository = async (
    urlCode: string,
    date: number,
    longUrl: string,
) => {
    const query =
        "INSERT INTO urls (short_code, created_at, long_url) VALUES (?, ?, ?);";
    const params = [urlCode, date, longUrl];

    await cassandraClient.execute(query, params, { prepare: true });
};

export const getUrlByCodeRepository = async (code: string) => {
    const query =
        "SELECT long_url FROM url_shortener.urls WHERE short_code = ?;";
    const params = [code];

    const result = await cassandraClient.execute(query, params, {
        prepare: true,
    });
    if (result.rowLength === 0) return "";

    return result.rows[0];
};

