import { Request, Response } from "express";
import { IProject } from "../types/projectTypes";
import Project from "../models/projectModel";

// @desc    Get projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects: IProject[] = await Project.find();
    res.status(200).json(projects);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Set project
// @route   POST /api/projects
// @access  Public
const setProject = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body;
  try {
    const project: IProject = new Project({
      title,
      description,
    });

    const newProject: IProject = await project.save();

    res.status(201).json(newProject);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Update project
// @route   PATCH /api/projects/:id
// @access  Public
const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project: IProject | null = await Project.findById(req.params.id);

    if (!project) {
      res.status(400);
      throw new Error("Project not found");
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedProject);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Public
const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProject: IProject | null = await Project.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProject) {
      res.status(400);
      throw new Error("Project not found");
    }

    res.status(200).json(deletedProject);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export { getProjects, setProject, updateProject, deleteProject };
