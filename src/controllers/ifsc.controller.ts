import { Request, Response } from "express";
import { IfscService } from "../services/ifsc.service";

export const getIfscByCode = async (req: Request, res: Response) => {
  try {
    const result = await IfscService.findByCode(req.params.code);

    if (!result) {
      return res.status(404).json({ error: "IFSC not found" });
    }
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};