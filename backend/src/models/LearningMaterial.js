import mongoose from 'mongoose';

const learningMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    subject: {
      type: String,
      enum: ['Mathematics', 'English', 'Science', 'History', 'Chemistry', 'Physics', 'Biology'],
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    content: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    grade: {
      type: [String],
      enum: ['9', '10', '11', '12'],
      required: true,
    },
    learningStyle: {
      type: [String],
      enum: ['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic'],
      default: ['Visual', 'Reading/Writing'],
    },
    resourceUrl: {
      type: String,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL'],
    },
    tags: {
      type: [String],
      default: [],
    },
    estimatedReadTime: {
      type: Number, // in minutes
      default: 10,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

learningMaterialSchema.index({ subject: 1, topic: 1, difficulty: 1 });

export default mongoose.model('LearningMaterial', learningMaterialSchema);
