const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema(
    {
        userId: { type: String, required: true },
        title: {
            type: String,
            trim: true,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        isPinned: { type: Boolean, default: false },
    },
    { timestamp: true }
)

// INSTANTIATE MODEL
const Note = mongoose.model('Note', noteSchema)

module.exports = Note
