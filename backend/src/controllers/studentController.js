import Student from '../models/Student.js';
import { config } from '../config/env.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { demoStore } from '../services/demoStore.js';

// Helper to check if MongoDB is connected
const isDatabaseConnected = async () => {
  try {
    await Student.findOne({}).limit(1);
    return true;
  } catch (error) {
    return false;
  }
};

// Register Student
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, grade, subjects, learningStyle } = req.body;

    // Validation
    if (!name || !email || !password || !grade) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const dbConnected = await isDatabaseConnected();

    if (dbConnected) {
      // Database mode
      // Check if student exists
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(409).json({
          success: false,
          message: 'Email already registered',
        });
      }

      // Create new student
      const student = await Student.create({
        name,
        email,
        password,
        grade,
        subjects: subjects || [],
        learningStyle: learningStyle || 'Visual',
      });

      // Generate JWT Token
      const token = jwt.sign({ id: student._id, email: student.email }, config.jwtSecret, {
        expiresIn: config.jwtExpire,
      });

      res.status(201).json({
        success: true,
        message: 'Student registered successfully',
        token,
        databaseConnected: true,
        student: {
          id: student._id,
          name: student.name,
          email: student.email,
          grade: student.grade,
          subjects: student.subjects,
          learningStyle: student.learningStyle,
        },
      });
    } else {
      // Demo mode - add to in-memory store
      const existingStudent = demoStore.students.find(s => s.email === email);
      if (existingStudent) {
        return res.status(409).json({
          success: false,
          message: 'Email already registered',
        });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);
      const newStudent = {
        _id: `demo-${Date.now()}`,
        id: `demo-${Date.now()}`,
        name,
        email,
        password: hashedPassword,
        grade,
        subjects: subjects || [],
        learningStyle: learningStyle || 'Visual',
        totalQueriesAnswered: 0,
        averagePerformanceScore: 0,
        weakAreas: [],
        strongAreas: [],
        feedbackScore: 0,
        createdAt: new Date(),
      };

      demoStore.students.push(newStudent);

      const token = jwt.sign({ id: newStudent._id, email: newStudent.email }, config.jwtSecret, {
        expiresIn: config.jwtExpire,
      });

      res.status(201).json({
        success: true,
        message: 'Student registered successfully (Demo Mode)',
        token,
        databaseConnected: false,
        mode: 'demo',
        student: {
          id: newStudent._id,
          name: newStudent.name,
          email: newStudent.email,
          grade: newStudent.grade,
          subjects: newStudent.subjects,
          learningStyle: newStudent.learningStyle,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Student
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const dbConnected = await isDatabaseConnected();
    let student = null;

    if (dbConnected) {
      // Try database first
      student = await Student.findOne({ email }).select('+password');
      
      if (!student) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // Check password
      const isPasswordValid = await student.matchPassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }
    } else {
      // Demo mode - use in-memory store
      const demoStudent = demoStore.students.find(s => s.email === email);
      
      if (!demoStudent) {
        // Allow demo login with any credentials in demo mode
        if (email === 'demo@edusmart.com' && password === 'demo123') {
          student = demoStore.students[0];
        } else {
          return res.status(401).json({
            success: false,
            message: 'Invalid credentials. Try demo@edusmart.com / demo123',
            demoMode: true,
            demoCredentials: { email: 'demo@edusmart.com', password: 'demo123' }
          });
        }
      } else {
        // For custom demo accounts, accept password
        const isPasswordValid = await bcryptjs.compare(password, demoStudent.password);
        if (!isPasswordValid && password !== 'demo123') {
          return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
          });
        }
        student = demoStudent;
      }
    }

    // Generate JWT Token
    const token = jwt.sign({ id: student._id, email: student.email }, config.jwtSecret, {
      expiresIn: config.jwtExpire,
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      databaseConnected: dbConnected,
      mode: dbConnected ? 'production' : 'demo',
      student: {
        id: student._id || student.id,
        name: student.name,
        email: student.email,
        grade: student.grade,
        subjects: student.subjects || [],
        learningStyle: student.learningStyle,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Student Profile
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id)
      .populate({
        path: 'queries',
        model: 'Query',
        limit: 10,
        sort: { createdAt: -1 },
      });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Student Profile
export const updateStudentProfile = async (req, res) => {
  try {
    const { subjects, learningStyle } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.user.id,
      {
        ...(subjects && { subjects }),
        ...(learningStyle && { learningStyle }),
      },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
