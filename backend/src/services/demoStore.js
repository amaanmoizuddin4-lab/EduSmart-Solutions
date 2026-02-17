// In-memory demo storage (for testing without MongoDB)
export const demoStore = {
  students: [],
  queries: [],
  materials: [],
};

// Demo student for quick testing
const demoStudent = {
  _id: 'demo-student-123',
  id: 'demo-student-123',
  name: 'Demo Student',
  email: 'demo@edusmart.com',
  password: '$2a$10$demo', // Pre-hashed demo password
  grade: '10',
  subjects: ['Mathematics', 'Physics'],
  learningStyle: 'Visual',
  totalQueriesAnswered: 5,
  averagePerformanceScore: 78,
  weakAreas: ['Calculus'],
  strongAreas: ['Algebra'],
  feedbackScore: 4.2,
  createdAt: new Date(),
};

// Add demo student for quick sign-in
if (!demoStore.students.find(s => s.email === 'demo@edusmart.com')) {
  demoStore.students.push(demoStudent);
}

export default demoStore;
