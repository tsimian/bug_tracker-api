import express, { Express } from "express";
import "dotenv/config";
const PORT: any = process.env.PORT || 5000;

const app: Express = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
