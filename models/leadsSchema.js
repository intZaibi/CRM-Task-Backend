import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ["New", "Contacted", "Qualified", "Lost", "Closed"],
        default: "New"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Lead', leadSchema);