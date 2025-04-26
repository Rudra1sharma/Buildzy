import mongoose from "mongoose";
import { stringify } from "querystring";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    owner:{
      type: String,
      required: true
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String
    },
    create_at:{
      type: Date
    },
    full_name:{
      type: String,
      trim: true
    },
    github_id:{
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;

