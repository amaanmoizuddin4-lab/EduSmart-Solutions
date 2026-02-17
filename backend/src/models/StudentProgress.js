import mongoose from 'mongoose';

const studentProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      enum: ['Mathematics', 'English', 'Science', 'History', 'Chemistry', 'Physics', 'Biology'],
      required: true,
    },
    topicScore: {
      type: Map,
      of: {
        score: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        questionsAnswered: {
          type: Number,
          default: 0,
        },
        correctAnswers: {
          type: Number,
          default: 0,
        },
      },
      default: new Map(),
    },
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    improvementTrend: {
      type: String,
      enum: ['Improving', 'Stable', 'Declining'],
      default: 'Stable',
    },
    recommendedTopics: {
      type: [String],
      default: [],
    },
    learningPaceScore: {
      type: Number,
      min: 0,
      max: 5,
      default: 3,
    },
  },
  { timestamps: true }
);

export default mongoose.model('StudentProgress', studentProgressSchema);
