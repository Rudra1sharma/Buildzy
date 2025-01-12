import mongoose, { mongoose } from "mongoose";

const invitationSchema = new mongoose.Schema({

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    },
},
    {
        timestamp: true
    }
);

const Invitation = mongoose.models.invitation || mongoose.model("invitation", invitationSchema);

export default Invitation;

