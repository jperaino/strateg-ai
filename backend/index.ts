import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Strateg-ai app listening on port ${PORT}`);
});
