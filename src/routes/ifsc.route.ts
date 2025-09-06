import { Router } from "express";
import { getIfscByCode } from "../controllers/ifsc.controller";

const router = Router();

router.get("/:code",getIfscByCode);

export default router;
