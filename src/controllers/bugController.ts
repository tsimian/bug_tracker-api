import { Request, Response } from "express";
import { IBug } from "../types/bugTypes";
import Bug from "../models/bugModel";
import { IProject } from "../types/projectTypes";
import Project from "../models/projectModel";

// @desc    Get bugs
// @route   GET /api/bugs
// @access  Public
const getBugs = async (req: Request, res: Response): Promise<void> => {
  try {
    const bugs: IBug[] = await Bug.find();
    res.status(200).json(bugs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Set bug
// @route   POST /api/bugs
// @access  Public
const setBug = async (req: Request, res: Response): Promise<void> => {
  const { name, projectId, summary, status } = req.body;

  try {
    // Check if project exists to add bug to
    const project: IProject | null = await Project.findById(projectId);

    if (!project) {
      res.status(400);
      throw new Error("Project not found");
    }

    const bug: IBug = new Bug({
      name,
      projectId,
      summary,
      status,
    });

    const newBug: IBug = await bug.save();

    res.status(201).json(newBug);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Update bug
// @route   PATCH /api/bugs/:id
// @access  Public
const updateBug = async (req: Request, res: Response): Promise<void> => {
  try {
    const bug: IBug | null = await Bug.findById(req.params.id);

    if (!bug) {
      res.status(400);
      throw new Error("Bug not found");
    }

    const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedBug);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete bug
// @route   DELETE /api/bugs/:id
// @access  Public
const deleteBug = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBug: IBug | null = await Bug.findByIdAndDelete(req.params.id);

    if (!deletedBug) {
      res.status(400);
      throw new Error("Bug not found");
    }

    res.status(200).json(deletedBug);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export { getBugs, setBug, updateBug, deleteBug };
