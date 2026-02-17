import { getAIResponse, getPersonalizedRecommendations } from '../services/aiService.js';

import Query from '../models/Query.js';
import Student from '../models/Student.js';

// Submit a new query
export const submitQuery = async (req, res) => {
  try {
    const { subject, topic, question, difficulty } = req.body;
    const startTime = Date.now();

    // Validation
    if (!subject || !topic || !question) {
      return res.status(400).json({
        success: false,
        message: 'Please provide subject, topic, and question',
      });
    }

    // Get AI response
    const aiResponse = await getAIResponse(subject, topic, question);

    const responseTime = Date.now() - startTime;

    // Create query record
    const query = await Query.create({
      studentId: req.user.id,
      subject,
      topic,
      question,
      aiResponse,
      difficulty: difficulty || 'Intermediate',
      responseTime,
      resolutionStatus: 'Resolved',
    });

    // Update student stats
    await Student.findByIdAndUpdate(req.user.id, {
      $inc: { totalQueriesAnswered: 1 },
    });

    res.status(201).json({
      success: true,
      message: 'Query processed successfully',
      query,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get student's queries
export const getStudentQueries = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const queries = await Query.find({ studentId: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Query.countDocuments({ studentId: req.user.id });

    res.json({
      success: true,
      queries,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Submit feedback for a query
export const submitQueryFeedback = async (req, res) => {
  try {
    const { queryId } = req.params;
    const { rating, comment, helpful } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a rating between 1 and 5',
      });
    }

    const query = await Query.findByIdAndUpdate(
      queryId,
      {
        studentFeedback: {
          rating,
          comment: comment || '',
          helpful: helpful !== undefined ? helpful : null,
        },
      },
      { new: true }
    );

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found',
      });
    }

    res.json({
      success: true,
      message: 'Feedback submitted successfully',
      query,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get personalized recommendations
export const getRecommendations = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    const recommendations = await getPersonalizedRecommendations(student);

    res.json({
      success: true,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get query statistics
export const getQueryStatistics = async (req, res) => {
  try {
    const queries = await Query.find({ studentId: req.user.id });

    const stats = {
      totalQueries: queries.length,
      averageRating: 
        queries.filter(q => q.studentFeedback.rating).length > 0
          ? (queries.reduce((acc, q) => acc + (q.studentFeedback.rating || 0), 0) / 
             queries.filter(q => q.studentFeedback.rating).length).toFixed(2)
          : 0,
      averageResponseTime: 
        queries.length > 0
          ? (queries.reduce((acc, q) => acc + q.responseTime, 0) / queries.length).toFixed(2)
          : 0,
      helpfulCount: queries.filter(q => q.studentFeedback.helpful === true).length,
      subjectDistribution: {},
    };

    queries.forEach(q => {
      stats.subjectDistribution[q.subject] = (stats.subjectDistribution[q.subject] || 0) + 1;
    });

    res.json({
      success: true,
      statistics: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
