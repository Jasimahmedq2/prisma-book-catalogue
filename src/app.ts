import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import routes from "./app/routes";
const app = express();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("postgres server is running");
});

app.use("/api/v1/", routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
