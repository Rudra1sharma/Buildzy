import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        Project: {
            type: String,
            required: true
        },
        owner_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        filepath: {
            type: String, required: true, unique: true
        },
        content: {
            type: String
        },
    },
    {
        timestamps: true,
    }
);

const File = mongoose.models.File || mongoose.model("File", fileSchema);

export default File;

