import mongoose from 'mongoose';

const querySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student ID is required'],
    },
    subject: {
      type: String,
      enum: ['Mathematics', 'English', 'Science', 'History', 'Chemistry', 'Physics', 'Biology'],
      required: true,
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
    },
    question: {
      type: String,
      required: [true, 'Question is required'],
      minlength: 10,
      maxlength: 5000,
    },
    aiResponse: {
      type: String,
      default: null,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    studentFeedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null,
      },
      comment: {
        type: String,
        maxlength: 1000,
      },
      helpful: {
        type: Boolean,
        default: null,
      },
    },
    responseTime: {
      type: Number, // in milliseconds
      default: 0,
    },
    resolutionStatus: {
      type: String,
      enum: ['Pending', 'Resolved', 'Needs Clarification'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

// Index for faster queries
querySchema.index({ studentId: 1, createdAt: -1 });
querySchema.index({ subject: 1, topic: 1 });

export default mongoose.model('Query', querySchema);
