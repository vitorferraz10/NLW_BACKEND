import express, { Request, Response } from "express";

import { SubmitFeedbackUseCase } from "./useCases/submitFeedbackUseCase";
import { PrismaFeedbackRepositories } from "./repositories/prisma/prismaFeedbackRepositories";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailerMailAdapter";

export const routes = express.Router();

routes.post("/feedbacks", async (req: Request, res: Response) => {
  const { comment, type, screenshot } = req.body;
  const prismaFeedbacksRepository = new PrismaFeedbackRepositories();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbacksUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbacksUseCase.execute({
    type,
    comment,
    screenshot,
  });

  /* 
  }); */

  res.status(201).send();
});
