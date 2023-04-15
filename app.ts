import express, { Express } from "express";
import dotenv from "dotenv";
import "colors";
import cors from "cors";
import connectDB from "./config/db";
dotenv.config();

import userAvaterRouter from "./routes/user/userAvaterRoute";
import userRouter from "./routes/user/userRoute";

import topicInfoRouter from "./routes/topic/topicInfoRoute";
import topicAppendixRouter from "./routes/topic/topicAppendixRoute";

connectDB();

const port: number = (process.env.PORT as unknown as number) || 5000;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.use("/api/userAvaters", userAvaterRouter);
app.use("/api/user", userRouter);

app.use("/api/topic/info", topicInfoRouter);
app.use("/api/topic/appendix", topicAppendixRouter);

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port}`.cyan.underline
  );
});
