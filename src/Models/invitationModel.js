const mongoose = require('mongoose')

const invitationSchema = new mongoose.Schema({

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    inviter: {
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
        timestamps: true
    }
);

const Invitation = mongoose.models.Invitation || mongoose.model("Invitation", invitationSchema);

export default Invitation;

