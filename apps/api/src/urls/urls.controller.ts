import { Request, Response } from "express";
import { urlParamsSchema, UrlParamsSchema } from "./schemas/urls-params.schema";
import { CreateUrlDTO, createUrlSchema } from "./dto/create-urls.dto";
import { createShortUrlService, getUrlByCodeService } from "./urls.service";

export const createShortUrl = async (
    req: Request<object, object, CreateUrlDTO>,
    res: Response,
) => {
    const body = createUrlSchema.safeParse(req.body);
    if (!body.success) return res.status(400).json({ message: "Invalid Data" });

    const urlCode = await createShortUrlService(body.data.long_url);

    return res
        .status(200)
        .header({ Location: `/${urlCode}` })
        .send();
};

export const getUrlByCode = async (
    req: Request<UrlParamsSchema>,
    res: Response,
) => {
    const params = urlParamsSchema.safeParse(req.params);
    if (!params.success)
        return res.status(400).json({ message: "Invalid Params" });

    const longUrl = await getUrlByCodeService(params.data.code);
    if (!longUrl) return res.sendStatus(404);

    return res.redirect(longUrl);
};

