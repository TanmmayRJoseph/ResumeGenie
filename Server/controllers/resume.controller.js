import { createResumeService } from "../services/resume.service.js";

export const createResumeController = async (req, res) => {
  try {
    const { name, title, skills, experience, education } = req.body;
    const resume = await createResumeService({
      userId: req.user._id,
      name,
      title,
      skills,
      experience,
      education,
    });
    res.status(200).json({ message: "Resume created successfully", resume });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error creating resume", error: error.message });
  }
};
