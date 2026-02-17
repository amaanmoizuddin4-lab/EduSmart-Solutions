import LearningMaterial from '../models/LearningMaterial.js';

// Get recommended learning materials
export const getLearningMaterials = async (req, res) => {
  try {
    const { subject, difficulty, grade, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (subject) filter.subject = subject;
    if (difficulty) filter.difficulty = difficulty;
    if (grade) filter.grade = grade;
    filter.isActive = true;

    const materials = await LearningMaterial.find(filter)
      .sort({ rating: -1, usageCount: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await LearningMaterial.countDocuments(filter);

    res.json({
      success: true,
      materials,
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

// Get learning material by ID
export const getLearningMaterialById = async (req, res) => {
  try {
    const { id } = req.params;

    const material = await LearningMaterial.findByIdAndUpdate(
      id,
      { $inc: { usageCount: 1 } },
      { new: true }
    );

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Learning material not found',
      });
    }

    res.json({
      success: true,
      material,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Create learning material
export const createLearningMaterial = async (req, res) => {
  try {
    const { title, subject, topic, description, content, difficulty, grade, learningStyle, resourceUrl, tags } = req.body;

    // Validation
    if (!title || !subject || !topic || !content || !difficulty || !grade) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const material = await LearningMaterial.create({
      title,
      subject,
      topic,
      description,
      content,
      difficulty,
      grade: Array.isArray(grade) ? grade : [grade],
      learningStyle: learningStyle || ['Visual', 'Reading/Writing'],
      resourceUrl,
      tags: tags || [],
    });

    res.status(201).json({
      success: true,
      message: 'Learning material created successfully',
      material,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Update learning material
export const updateLearningMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const material = await LearningMaterial.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Learning material not found',
      });
    }

    res.json({
      success: true,
      message: 'Learning material updated successfully',
      material,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Delete learning material
export const deleteLearningMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    const material = await LearningMaterial.findByIdAndDelete(id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Learning material not found',
      });
    }

    res.json({
      success: true,
      message: 'Learning material deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
