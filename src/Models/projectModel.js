import mongoose, { Mongoose } from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },

    description: {
        type: String
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