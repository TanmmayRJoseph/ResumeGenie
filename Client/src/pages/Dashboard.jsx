import React from "react";
import {useForm} from "react-hook-form";
import {motion} from "framer-motion";

const Dashboard = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        // Convert comma-separated skills to array
        const skillsArray = data.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);

        const formattedData = {...data, skills: skillsArray};

        console.log("Formatted Data to Submit:", formattedData);
        // You can send `formattedData` to the backend (matches Mongoose model)
    };

    return (
        <motion.div
            className="p-6 md:p-10 min-h-screen bg-gray-100"
            initial={{opacity: 0, y: -30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
        >
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-blue-600">Welcome, User 👋</h1>
                <p className="text-lg text-gray-700">
                    Let's build your awesome resume!
                </p>
            </div>

            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-xl shadow-md p-6 space-y-4 max-w-7xl mx-auto"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.3}}
            >
                <h2 className="text-2xl font-semibold mb-4 text-black">Resume Info</h2>

                {/* Name */}
                <div>
                    <label className="block text-black font-medium">Name</label>
                    <input
                        {...register("name", {
                            required: "Name is required",
                            minLength: {value: 2, message: "Minimum 2 characters required"},
                            maxLength: {
                                value: 100,
                                message: "Maximum 100 characters allowed",
                            },
                        })}
                        className="w-full text-black border px-3 py-2 rounded"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

                {/* Title */}
                <div>
                    <label className="block text-black font-medium">Title</label>
                    <input
                        {...register("title", {
                            required: "Title is required",
                            minLength: {value: 2, message: "Minimum 2 characters required"},
                            maxLength: {
                                value: 100,
                                message: "Maximum 100 characters allowed",
                            },
                        })}
                        className="w-full text-black border px-3 py-2 rounded"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                </div>

                {/* Skills */}
                <div>
                    <label className="block text-black font-medium">
                        Skills (comma separated)
                    </label>
                    <input
                        {...register("skills", {
                            required: "At least one skill is required",
                            validate: (value) => {
                                const skillArray = value
                                    .split(",")
                                    .map((s) => s.trim())
                                    .filter(Boolean);
                                return (
                                    skillArray.length > 0 ||
                                    "Please enter at least one valid skill"
                                );
                            },
                        })}
                        placeholder="e.g., HTML, CSS, JavaScript"
                        className="w-full text-black border px-3 py-2 rounded"
                    />
                    {errors.skills && (
                        <p className="text-red-500 text-sm">{errors.skills.message}</p>
                    )}
                </div>

                {/* Experience */}
                <div>
                    <label className="block text-black font-medium">Experience</label>
                    <textarea
                        {...register("experience", {
                            required: "Experience is required",
                            minLength: {
                                value: 10,
                                message: "Minimum 10 characters required",
                            },
                            maxLength: {
                                value: 1000,
                                message: "Maximum 1000 characters allowed",
                            },
                        })}
                        rows={4}
                        className="w-full text-black border px-3 py-2 rounded"
                    />
                    {errors.experience && (
                        <p className="text-red-500 text-sm">{errors.experience.message}</p>
                    )}
                </div>

                {/* Education */}
                <div>
                    <label className="block text-black font-medium">Education</label>
                    <textarea
                        {...register("education", {
                            required: "Education is required",
                            minLength: {
                                value: 5,
                                message: "Minimum 5 characters required",
                            },
                            maxLength: {
                                value: 1000,
                                message: "Maximum 1000 characters allowed",
                            },
                        })}
                        rows={3}
                        className="w-full text-black border px-3 py-2 rounded"
                    />
                    {errors.education && (
                        <p className="text-red-500 text-sm">{errors.education.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 px-6 text-black py-2 rounded hover:bg-blue-600"
                >
                    Generate with AI ✨
                </button>
            </motion.form>

            {/* GPT Output Placeholder */}
            <motion.div
                className="mt-10 bg-white rounded-xl shadow p-6 max-w-7xl mx-auto min-h-[200px] flex items-center justify-center text-gray-400 italic"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.5}}
            >
                GPT output will be displayed here after form submission...
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;

// ! RULES
// Field | Frontend Validation
// name | Required, min 2, max 100
// title | Required, min 2, max 100
// skills | Required, comma-separated, at least one skill
// experience | Required, min 10, max 1000
// education | Required, min 5, max 1000
