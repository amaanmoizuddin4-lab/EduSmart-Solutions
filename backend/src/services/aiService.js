import Anthropic from '@anthropic-ai/sdk';
import LearningMaterial from '../models/LearningMaterial.js';
import Query from '../models/Query.js';
import { config } from '../config/env.js';

const client = new Anthropic();

// Get AI response for homework questions
export const getAIResponse = async (subject, topic, question) => {
  try {
    const systemPrompt = `You are an expert educational tutor for high school students. Your role is to:
1. Understand student questions related to their homework
2. Provide clear, accurate, and helpful explanations
3. Break down complex concepts into simpler parts
4. Offer step-by-step solutions when needed
5. Encourage critical thinking by asking guiding questions when appropriate
6. Be encouraging and supportive in your tone

When answering questions, make sure to:
- Be concise but thorough
- Use examples when helpful
- Explain the "why" behind concepts
- Avoid simply giving answers; help students understand the material
- Tailor your response to high school level

Subject: ${subject}
Topic: ${topic}`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: question,
        },
      ],
    });

    const response = message.content[0];
    if (response.type === 'text') {
      return response.text;
    }

    throw new Error('Unexpected response type from Claude API');
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error(`Failed to get AI response: ${error.message}`);
  }
};

// Get personalized learning recommendations
export const getPersonalizedRecommendations = async (student) => {
  try {
    // Get student's recent queries to understand weak areas
    const recentQueries = await Query.find({ studentId: student._id })
      .sort({ createdAt: -1 })
      .limit(10);

    const queryData = recentQueries.map(q => ({
      subject: q.subject,
      topic: q.topic,
      rating: q.studentFeedback?.rating || 3,
    }));

    const recommendationPrompt = `Based on the following student learning data, provide personalized study recommendations:

Student Profile:
- Grade: ${student.grade}
- Subjects: ${student.subjects.join(', ')}
- Learning Style: ${student.learningStyle}
- Total Queries Answered: ${student.totalQueriesAnswered}

Recent Query Topics:
${queryData.map(q => `- ${q.subject}: ${q.topic} (Rating: ${q.rating}/5)`).join('\n')}

Please provide:
1. Top 3 priority topics to focus on based on performance
2. 2-3 specific study tips tailored to their learning style
3. Recommended learning sequence for next week
4. Motivational message

Format your response as a structured recommendation.`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      system: 'You are an educational advisor helping high school students improve their academic performance. Provide personalized, actionable recommendations.',
      messages: [
        {
          role: 'user',
          content: recommendationPrompt,
        },
      ],
    });

    const recommendationText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Find relevant learning materials
    const relevantMaterials = await LearningMaterial.find({
      subject: { $in: student.subjects },
      grade: { $in: [student.grade] },
      difficulty: { $in: ['Intermediate', 'Advanced'] },
      isActive: true,
    })
      .limit(5)
      .sort({ rating: -1 });

    return {
      studentId: student._id,
      recommendations: recommendationText,
      suggestedMaterials: relevantMaterials,
      generatedAt: new Date(),
    };
  } catch (error) {
    console.error('Recommendation Generation Error:', error);
    throw new Error(`Failed to generate recommendations: ${error.message}`);
  }
};

// Analyze student performance and identify weak areas
export const analyzeStudentPerformance = async (studentId) => {
  try {
    const queries = await Query.find({ studentId }).limit(20);

    if (queries.length === 0) {
      return {
        analysis: 'Not enough data for analysis yet. Please answer more questions.',
        weakAreas: [],
        strongAreas: [],
      };
    }

    const performanceData = {
      totalQueries: queries.length,
      averageRating: (
        queries.reduce((sum, q) => sum + (q.studentFeedback?.rating || 0), 0) / queries.length
      ).toFixed(2),
      subjectPerformance: {},
    };

    // Calculate performance by subject
    queries.forEach(q => {
      if (!performanceData.subjectPerformance[q.subject]) {
        performanceData.subjectPerformance[q.subject] = [];
      }
      performanceData.subjectPerformance[q.subject].push(q.studentFeedback?.rating || 3);
    });

    const analysisPrompt = `Analyze this student's performance data and identify areas for improvement:

${JSON.stringify(performanceData, null, 2)}

Provide:
1. Overall performance assessment
2. Top 2-3 weak areas that need attention
3. Top 2-3 strong areas to build upon
4. Specific recommendations for improvement

Keep response concise and actionable.`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 800,
      system: 'You are an educational data analyst providing performance insights to help students improve.',
      messages: [
        {
          role: 'user',
          content: analysisPrompt,
        },
      ],
    });

    return {
      performanceMetrics: performanceData,
      analysis: message.content[0].type === 'text' ? message.content[0].text : '',
    };
  } catch (error) {
    console.error('Performance Analysis Error:', error);
    throw new Error(`Failed to analyze performance: ${error.message}`);
  }
};
