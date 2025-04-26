// import mongoose, { Mongoose } from "mongoose";

// const projectSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },

//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },

//     teamId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Team'
//     },

//     description: {
//         type: String
//     },
    
//     canvas: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Canvas'
//     }],
// },
//     {
//         timestamps: true,
//     }
// );

// const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

// export default Project;

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
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

    // GitHub Repo URL
    repo: {
      type: String,
      required: true
    },

    // Number of team members (default to 1)
    members: {
      type: Number,
      default: 1
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;

