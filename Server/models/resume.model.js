import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
      validate: {
        validator: function (skills) {
          return (
            skills.length > 0 &&
            skills.every(
              (skill) => typeof skill === "string" && skill.trim() !== ""
            )
          );
        },
        message: "Skills must be a non-empty array of non-empty strings",
      },
    },

    experience: {
      type: String,
      required: [true, "Experience is required"],
      trim: true,
      minlength: [10, "Experience description must be at least 10 characters"],
      maxlength: [1000, "Experience description is too long"],
    },

    education: {
      type: String,
      required: [true, "Education is required"],
      trim: true,
      minlength: [5, "Education details must be at least 5 characters"],
      maxlength: [1000, "Education details is too long"],
    },
  },
  {
    timestamps: true, // optional: adds createdAt and updatedAt
  }
);

// Prevent model overwrite in development
const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export default Resume;
