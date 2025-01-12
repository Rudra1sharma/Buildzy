import mongoose, { Mongoose } from "mongoose";

const teamSchema = new mongoose.Schema({
    // team members ki array
    // team ka leader
    // team ka naam 
    // desciption 
    // invitations ki array
    
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    Members: [{
        memberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
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
        ref: "invitation"
    }],
    
},
    {
        timestamps: true
    }
);

const Team = mongoose.models.team || mongoose.model("team", teamSchema);

export default Team;