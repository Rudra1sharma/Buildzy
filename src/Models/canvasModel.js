import mongoose, { mongoose } from "mongoose";

const canvasSchema = new mongoose.Schema({
    name: {
        type: String
    },

    image: {
        type: String
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    
},
    {
        timestamps: true
    }
);

const Canvas = mongoose.models.canvas || mongoose.model("canvas", canvasSchema);

export default Canvas;