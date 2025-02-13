const mongoose = require('mongoose');

const udhariSchema = new mongoose.Schema({
    customer: {
        type: String,

        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'overdue'],
        default: 'pending',
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UdhariModel = mongoose.model('Udhari', udhariSchema);
module.exports = UdhariModel;
