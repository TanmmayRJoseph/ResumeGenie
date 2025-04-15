import Resume from "../models/resume.model.js";

export const createResumeService = async ({
  userId,
  name,
  title,
  skills,
  experience,
  education,
}) => {
  try {
    if (!userId || !name || !title || !skills || !experience || !education) {
      throw new Error("All fields are required");
    }

    const resume = await Resume.create({
      userId,
      name,
      title,
      skills,
      experience,
      education,
    });

    return resume;
  } catch (error) {
    console.error("Resume creation error:", error.message);
    throw error; // Let the controller handle the error response
  }
};
