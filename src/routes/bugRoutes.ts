import { Router } from "express";
import {
  getBugs,
  setBug,
  updateBug,
  deleteBug,
} from "../controllers/bugController";

const bugRouter: Router = Router();

bugRouter.get("/", getBugs);
bugRouter.post("/", setBug);
bugRouter.patch("/:id", updateBug);
bugRouter.delete("/:id", deleteBug);

export default bugRouter;
