import mongoose, { Mongoose } from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },

    canvas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Canvas'
    }],
},
    {
        timestamps: true
    }
);

const Project = mongoose.models.project || mongoose.model("project", projectSchema);

export default Project;