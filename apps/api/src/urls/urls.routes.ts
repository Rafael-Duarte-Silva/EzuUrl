import { Router } from "express";
import { createShortUrl, getUrlByCode } from "./urls.controller";

const router = Router();

router.post("/", createShortUrl);
router.get("/:code", getUrlByCode);

export default router;

