import mongoose, { mongoose } from "mongoose";

const canvasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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

const Canvas = mongoose.models.Canvas || mongoose.model("Canvas", canvasSchema);

export default Canvas;