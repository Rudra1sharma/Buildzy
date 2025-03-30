import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    Members: [{
        memberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],

    teamName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        maxlength: 500
    },

    invitations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invitation"
    }],

    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      }
    ],
 
},
    {
        timestamps: true
    }
);

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;