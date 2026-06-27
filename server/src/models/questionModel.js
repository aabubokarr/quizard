import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    questionType: {
        type: String,
        enum: ['MCQ', 'FillBlank', 'TrueFalse'],
        required: true,
    },
    options: {
        type: [String],
        required: function() {
            return this.questionType === 'MCQ';
        },
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Question = mongoose.model('Question', questionSchema);

export default Question;