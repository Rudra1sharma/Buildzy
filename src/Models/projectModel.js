import mongoose, { Mongoose } from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "", 
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        canvas: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Canvas",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
