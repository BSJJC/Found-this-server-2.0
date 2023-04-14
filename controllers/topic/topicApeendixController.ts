import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

/**
 * @description                             Upload new topic appendixs
 * @route                                         POST /api/topic/appendix
 * @access                                      Public
 */
const uploadTopicAppendix = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).send("user appendixs uploaded");
  }
);

/**
 * @description                 Download topic appendixs
 * @route                            GET  /api/topic/appendix
 * @access                         Public
 */
const downloadTopicAppendix = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).send("user appendixs downloaded");
  }
);

export { uploadTopicAppendix, downloadTopicAppendix };
