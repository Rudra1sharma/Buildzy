import mongoose, { Mongoose } from "mongoose";

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    message: {
        type: String,
        required: true
    },

    read:{
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);

const Notification = mongoose.models.notification || mongoose.model("notification", notificationSchema);

export default Notification;