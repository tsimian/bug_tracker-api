import { Router } from "express";
import {
  getProjects,
  setProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController";

const projectRouter: Router = Router();

projectRouter.get("/", getProjects);
projectRouter.post("/", setProject);
projectRouter.patch("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;
