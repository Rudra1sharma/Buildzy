const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],

    canvas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'canvas'
    }],

    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'project'
    }],

    invitations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'invitation'
    }],

    notification: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'notification'
    }],
},
    {
        timestamps: true
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;