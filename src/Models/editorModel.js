import mongoose from "mongoose";

const editorSchema = new mongoose.Schema(
  {
    filepath: {
      type: String,
      required: true,
      unique: true
    },
    projectData: {
      type: mongoose.Schema.Types.Mixed
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    collaborators: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    lastModified: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Editor = mongoose.models.Editor || mongoose.model("Editor", editorSchema);

export default Editor; 