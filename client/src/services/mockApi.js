// Persistent localStorage Client-Side Mock Database for Quizard

const DB_KEY = 'quizard_db_store';

const initialQuestions = [
  {
    id: 'q_1',
    questionText: 'What is the correct time complexity of searching in a balanced Binary Search Tree?',
    questionType: 'MCQ',
    options: ['O(N)', 'O(log N)', 'O(N log N)', 'O(1)'],
    correctAnswer: 'O(log N)',
    createdAt: new Date('2026-06-25T08:00:00Z').toISOString(),
  },
  {
    id: 'q_2',
    questionText: 'The ________ pattern is a software design pattern that restricts the instantiation of a class to one single instance.',
    questionType: 'FillBlank',
    options: [],
    correctAnswer: 'Singleton',
    createdAt: new Date('2026-06-25T08:15:00Z').toISOString(),
  },
  {
    id: 'q_3',
    questionText: 'HTTP is a stateless protocol.',
    questionType: 'TrueFalse',
    options: [],
    correctAnswer: 'True',
    createdAt: new Date('2026-06-25T08:30:00Z').toISOString(),
  },
  {
    id: 'q_4',
    questionText: 'Which of the following is NOT a native React hook?',
    questionType: 'MCQ',
    options: ['useState', 'useEffect', 'useFetcher', 'useContext'],
    correctAnswer: 'useFetcher',
    createdAt: new Date('2026-06-26T09:00:00Z').toISOString(),
  },
  {
    id: 'q_5',
    questionText: 'CSS Grid is a one-dimensional layout system, while Flexbox is a two-dimensional layout system.',
    questionType: 'TrueFalse',
    options: [],
    correctAnswer: 'False',
    createdAt: new Date('2026-06-26T09:10:00Z').toISOString(),
  },
  {
    id: 'q_6',
    questionText: 'Which database type uses a schema-on-write approach, checking integrity constraints during insertion?',
    questionType: 'MCQ',
    options: ['Relational Database', 'Key-Value Database', 'Document Database', 'Graph Database'],
    correctAnswer: 'Relational Database',
    createdAt: new Date('2026-06-26T09:20:00Z').toISOString(),
  },
  {
    id: 'q_7',
    questionText: 'In JavaScript, a ________ is a combination of a function and its lexical environment, allowing access to outer scopes.',
    questionType: 'FillBlank',
    options: [],
    correctAnswer: 'closure',
    createdAt: new Date('2026-06-26T09:30:00Z').toISOString(),
  }
];

const initialExams = [
  {
    id: 'e_1',
    title: 'Data Structures & Algorithms Basics',
    description: 'Test your fundamental knowledge of BSTs, Big O complexity, and basic data layouts.',
    questions: ['q_1', 'q_2', 'q_3'],
    duration: 15, // in minutes
    startTime: '2026-06-25T10:00:00Z',
    endTime: '2026-07-15T18:00:00Z',
    totalMarks: 30,
    published: true,
    createdAt: new Date('2026-06-25T09:00:00Z').toISOString(),
  },
  {
    id: 'e_2',
    title: 'Advanced React & Frontend Architectures',
    description: 'Covers hooks, rendering cycles, performance optimization, and styling constraints.',
    questions: ['q_4', 'q_5', 'q_7'],
    duration: 20, // in minutes
    startTime: '2026-06-26T09:00:00Z',
    endTime: '2026-07-20T22:00:00Z',
    totalMarks: 30,
    published: true,
    createdAt: new Date('2026-06-26T10:00:00Z').toISOString(),
  },
  {
    id: 'e_3',
    title: 'Database Systems & Design Patterns (Draft)',
    description: 'Covers relational database normal forms, transaction ACID properties, and structural design patterns.',
    questions: ['q_2', 'q_6'],
    duration: 10, // in minutes
    startTime: '2026-06-29T10:00:00Z',
    endTime: '2026-07-30T18:00:00Z',
    totalMarks: 20,
    published: false,
    createdAt: new Date('2026-06-27T10:00:00Z').toISOString(),
  }
];

const initialUsers = [
  {
    id: 'u_1',
    name: 'Sarah Jenkins',
    email: 'teacher@quizard.com',
    password: 'password',
    role: 'Teacher',
    institution: 'Stanford University',
    profileImage: 'teacher',
    createdAt: new Date('2026-06-20T10:00:00Z').toISOString(),
  },
  {
    id: 'u_2',
    name: 'Alex Rivers',
    email: 'student@quizard.com',
    password: 'password',
    role: 'Student',
    institution: 'Stanford University',
    profileImage: 'student',
    createdAt: new Date('2026-06-21T10:00:00Z').toISOString(),
  },
  {
    id: 'u_3',
    name: 'Emily Chen',
    email: 'emily@quizard.com',
    password: 'password',
    role: 'Student',
    institution: 'MIT',
    profileImage: 'student2',
    createdAt: new Date('2026-06-22T10:00:00Z').toISOString(),
  },
  {
    id: 'u_4',
    name: 'Marcus Vance',
    email: 'marcus@quizard.com',
    password: 'password',
    role: 'Student',
    institution: 'Caltech',
    profileImage: 'student3',
    createdAt: new Date('2026-06-23T10:00:00Z').toISOString(),
  }
];

const initialSubmissions = [
  {
    id: 's_1',
    userId: 'u_3',
    examId: 'e_1',
    score: 20,
    percentage: 66.6,
    passed: true,
    correctAnswersCount: 2,
    wrongAnswersCount: 1,
    answers: {
      'q_1': 'O(log N)',
      'q_2': 'Singleton',
      'q_3': 'False'
    },
    durationTaken: 480, // 8 minutes in seconds
    completedAt: '2026-06-27T14:30:00Z',
  },
  {
    id: 's_2',
    userId: 'u_4',
    examId: 'e_1',
    score: 30,
    percentage: 100,
    passed: true,
    correctAnswersCount: 3,
    wrongAnswersCount: 0,
    answers: {
      'q_1': 'O(log N)',
      'q_2': 'Singleton',
      'q_3': 'True'
    },
    durationTaken: 360, // 6 minutes
    completedAt: '2026-06-27T15:10:00Z',
  },
  {
    id: 's_3',
    userId: 'u_2',
    examId: 'e_1',
    score: 20,
    percentage: 66.6,
    passed: true,
    correctAnswersCount: 2,
    wrongAnswersCount: 1,
    answers: {
      'q_1': 'O(log N)',
      'q_2': 'Singleton',
      'q_3': 'False'
    },
    durationTaken: 540, // 9 minutes
    completedAt: '2026-06-27T16:00:00Z',
  },
  {
    id: 's_4',
    userId: 'u_3',
    examId: 'e_2',
    score: 10,
    percentage: 33.3,
    passed: false,
    correctAnswersCount: 1,
    wrongAnswersCount: 2,
    answers: {
      'q_4': 'useState',
      'q_5': 'False',
      'q_7': 'context'
    },
    durationTaken: 900,
    completedAt: '2026-06-27T17:20:00Z',
  }
];

// Initialize database in localStorage
export const initMockDb = () => {
  if (!localStorage.getItem(DB_KEY)) {
    const db = {
      questions: initialQuestions,
      exams: initialExams,
      users: initialUsers,
      submissions: initialSubmissions,
    };
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }
};

const getDb = () => {
  initMockDb();
  return JSON.parse(localStorage.getItem(DB_KEY));
};

const saveDb = (db) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// Delay simulation helper
const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API endpoints implementation
export const mockApi = {
  // Authentication
  login: async ({ email, password }) => {
    await delay(500);
    const db = getDb();
    const user = db.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const token = `mock-jwt-token-for-${user.id}-${Date.now()}`;
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role, institution: user.institution, profileImage: user.profileImage } };
  },

  register: async ({ name, email, password, role, institution }) => {
    await delay(600);
    const db = getDb();
    if (db.users.find(u => u.email === email)) {
      throw new Error('Email is already registered');
    }
    const newUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      password,
      role,
      institution: institution || 'None',
      profileImage: role === 'Teacher' ? 'teacher' : 'student',
      createdAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    saveDb(db);
    const token = `mock-jwt-token-for-${newUser.id}-${Date.now()}`;
    return { token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, institution: newUser.institution, profileImage: newUser.profileImage } };
  },

  getCurrentUser: async (token) => {
    await delay(300);
    const db = getDb();
    const userId = token.split('-')[4]; // Extract ID from mock token
    const user = db.users.find(u => u.id === userId);
    if (!user) {
      throw new Error('Invalid authentication token');
    }
    return { user: { id: user.id, name: user.name, email: user.email, role: user.role, institution: user.institution, profileImage: user.profileImage } };
  },

  // Profile management
  updateProfile: async (token, profileData) => {
    await delay(500);
    const db = getDb();
    const userId = token.split('-')[4];
    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error('User not found');
    
    db.users[userIndex] = {
      ...db.users[userIndex],
      name: profileData.name || db.users[userIndex].name,
      institution: profileData.institution || db.users[userIndex].institution,
    };
    saveDb(db);
    return { user: { id: db.users[userIndex].id, name: db.users[userIndex].name, email: db.users[userIndex].email, role: db.users[userIndex].role, institution: db.users[userIndex].institution, profileImage: db.users[userIndex].profileImage } };
  },

  changePassword: async (token, { currentPassword, newPassword }) => {
    await delay(500);
    const db = getDb();
    const userId = token.split('-')[4];
    const user = db.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    if (user.password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }
    user.password = newPassword;
    saveDb(db);
    return { message: 'Password changed successfully' };
  },

  uploadAvatar: async (token, avatarName) => {
    await delay(400);
    const db = getDb();
    const userId = token.split('-')[4];
    const user = db.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    user.profileImage = avatarName;
    saveDb(db);
    return { user: { id: user.id, name: user.name, email: user.email, role: user.role, institution: user.institution, profileImage: user.profileImage } };
  },

  // Question Management (Teacher)
  getQuestions: async () => {
    await delay(400);
    const db = getDb();
    return db.questions;
  },

  createQuestion: async (questionData) => {
    await delay(500);
    const db = getDb();
    const newQuestion = {
      id: `q_${Date.now()}`,
      ...questionData,
      createdAt: new Date().toISOString()
    };
    db.questions.unshift(newQuestion);
    saveDb(db);
    return newQuestion;
  },

  updateQuestion: async (id, questionData) => {
    await delay(500);
    const db = getDb();
    const index = db.questions.findIndex(q => q.id === id);
    if (index === -1) throw new Error('Question not found');
    db.questions[index] = {
      ...db.questions[index],
      ...questionData,
      updatedAt: new Date().toISOString()
    };
    saveDb(db);
    return db.questions[index];
  },

  deleteQuestion: async (id) => {
    await delay(400);
    const db = getDb();
    
    // Check if the question is in any published exam
    const isInUse = db.exams.some(e => e.questions.includes(id) && e.published);
    if (isInUse) {
      throw new Error('Cannot delete question because it is in a published exam');
    }
    
    db.questions = db.questions.filter(q => q.id !== id);
    // Remove from draft exams as well
    db.exams = db.exams.map(e => ({
      ...e,
      questions: e.questions.filter(qid => qid !== id)
    }));
    
    saveDb(db);
    return { id };
  },

  // Exam Management (Teacher)
  getExams: async () => {
    await delay(400);
    const db = getDb();
    return db.exams.map(exam => {
      // populate questions detail
      const populatedQuestions = exam.questions.map(qid => db.questions.find(q => q.id === qid)).filter(Boolean);
      return { ...exam, questionsList: populatedQuestions };
    });
  },

  createExam: async (examData) => {
    await delay(500);
    const db = getDb();
    const newExam = {
      id: `e_${Date.now()}`,
      title: examData.title,
      description: examData.description,
      questions: examData.questions || [],
      duration: parseInt(examData.duration, 10) || 15,
      startTime: examData.startTime,
      endTime: examData.endTime,
      totalMarks: parseInt(examData.totalMarks, 10) || (examData.questions?.length * 10) || 0,
      published: false,
      createdAt: new Date().toISOString()
    };
    db.exams.unshift(newExam);
    saveDb(db);
    return newExam;
  },

  updateExam: async (id, examData) => {
    await delay(500);
    const db = getDb();
    const index = db.exams.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Exam not found');
    
    db.exams[index] = {
      ...db.exams[index],
      ...examData,
      duration: parseInt(examData.duration, 10) || db.exams[index].duration,
      totalMarks: parseInt(examData.totalMarks, 10) || db.exams[index].totalMarks,
      updatedAt: new Date().toISOString()
    };
    saveDb(db);
    return db.exams[index];
  },

  publishExam: async (id) => {
    await delay(400);
    const db = getDb();
    const exam = db.exams.find(e => e.id === id);
    if (!exam) throw new Error('Exam not found');
    if (exam.questions.length === 0) {
      throw new Error('Cannot publish an exam with no questions assigned.');
    }
    exam.published = true;
    saveDb(db);
    return exam;
  },

  deleteExam: async (id) => {
    await delay(400);
    const db = getDb();
    db.exams = db.exams.filter(e => e.id !== id);
    // clean submissions for deleted exams
    db.submissions = db.submissions.filter(s => s.examId !== id);
    saveDb(db);
    return { id };
  },

  // Student Available Exams
  getAvailableExams: async (userId) => {
    await delay(400);
    const db = getDb();
    
    // Available: Published exams where end time is in the future
    const now = new Date();
    
    // Get submissions by this user
    const userSubmissions = db.submissions.filter(s => s.userId === userId);
    const completedExamIds = userSubmissions.map(s => s.examId);
    
    const available = db.exams.filter(e => {
      if (!e.published) return false;
      const end = new Date(e.endTime);
      return end > now;
    }).map(e => {
      const questionsList = e.questions.map(qid => {
        // Strip correct answer for student list
        const q = db.questions.find(q => q.id === qid);
        if (!q) return null;
        const { correctAnswer, ...studentQuestion } = q;
        return studentQuestion;
      }).filter(Boolean);

      return {
        ...e,
        questionsList,
        completed: completedExamIds.includes(e.id),
      };
    });

    return available;
  },

  // Student Submissions & Grading
  submitExam: async (userId, examId, answers, durationTaken) => {
    await delay(800); // simulate grading process
    const db = getDb();
    
    const exam = db.exams.find(e => e.id === examId);
    if (!exam) throw new Error('Exam not found');
    
    // Check if user already took this exam
    const existing = db.submissions.find(s => s.userId === userId && s.examId === examId);
    if (existing) {
      throw new Error('You have already submitted this exam.');
    }

    // Auto grading
    let correctAnswersCount = 0;
    let wrongAnswersCount = 0;

    exam.questions.forEach(qid => {
      const q = db.questions.find(q => q.id === qid);
      if (!q) return;

      const studentAns = (answers[qid] || '').trim().toLowerCase();
      const correctAns = q.correctAnswer.trim().toLowerCase();

      if (studentAns === correctAns) {
        correctAnswersCount++;
      } else {
        wrongAnswersCount++;
      }
    });

    const totalQuestions = exam.questions.length;
    // calculate score based on total marks distributed evenly or 10 marks per question
    const scorePerQuestion = exam.totalMarks / (totalQuestions || 1);
    const score = Math.round(correctAnswersCount * scorePerQuestion);
    const percentage = Math.round((correctAnswersCount / (totalQuestions || 1)) * 1000) / 10;
    const passed = percentage >= 50; // Pass mark 50%

    const newSubmission = {
      id: `s_${Date.now()}`,
      userId,
      examId,
      score,
      percentage,
      passed,
      correctAnswersCount,
      wrongAnswersCount,
      answers,
      durationTaken, // in seconds
      completedAt: new Date().toISOString()
    };

    db.submissions.push(newSubmission);
    saveDb(db);

    return newSubmission;
  },

  // Results & Dashboard Metrics
  getStudentResults: async (userId) => {
    await delay(300);
    const db = getDb();
    
    const userSubmissions = db.submissions.filter(s => s.userId === userId);
    
    return userSubmissions.map(s => {
      const exam = db.exams.find(e => e.id === s.examId);
      return {
        ...s,
        examTitle: exam ? exam.title : 'Deleted Exam',
        examTotalMarks: exam ? exam.totalMarks : 0,
        examTotalQuestions: exam ? exam.questions.length : 0
      };
    });
  },

  getExamResultDetail: async (submissionId) => {
    await delay(400);
    const db = getDb();
    
    const submission = db.submissions.find(s => s.id === submissionId);
    if (!submission) throw new Error('Result submission not found');
    
    const exam = db.exams.find(e => e.id === submission.examId);
    if (!exam) throw new Error('Exam associated with this result was deleted');
    
    // Retrieve full questions (including correct answers) for result review
    const questionsList = exam.questions.map(qid => db.questions.find(q => q.id === qid)).filter(Boolean);
    
    const user = db.users.find(u => u.id === submission.userId);
    
    return {
      submission,
      exam,
      questionsList,
      user: { name: user.name, email: user.email, institution: user.institution }
    };
  },

  // Dashboard Stats & Analytics
  getTeacherDashboardStats: async () => {
    await delay(500);
    const db = getDb();
    
    const totalQuestions = db.questions.length;
    const totalExams = db.exams.length;
    const publishedExams = db.exams.filter(e => e.published).length;
    const totalStudents = db.users.filter(u => u.role === 'Student').length;
    const totalSubmissions = db.submissions.length;

    // Class average score (in percentage)
    const avgScore = totalSubmissions > 0
      ? Math.round(db.submissions.reduce((acc, curr) => acc + curr.percentage, 0) / totalSubmissions)
      : 0;

    // Recent exams list
    const recentExams = [...db.exams]
      .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(e => ({
        ...e,
        questionsCount: e.questions.length,
        submissionsCount: db.submissions.filter(s => s.examId === e.id).length
      }));

    // Recent questions list
    const recentQuestions = [...db.questions]
      .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    // Leaderboard
    const studentAverages = db.users
      .filter(u => u.role === 'Student')
      .map(stud => {
        const subs = db.submissions.filter(s => s.userId === stud.id);
        const count = subs.length;
        const avg = count > 0 ? Math.round(subs.reduce((acc, curr) => acc + curr.percentage, 0) / count) : 0;
        const max = count > 0 ? Math.max(...subs.map(s => s.percentage)) : 0;
        return {
          id: stud.id,
          name: stud.name,
          institution: stud.institution,
          profileImage: stud.profileImage,
          examsTaken: count,
          average: avg,
          highest: max
        };
      })
      .sort((a, b) => b.average - a.average || b.examsTaken - a.examsTaken)
      .slice(0, 5);

    // Performance Analytics (SVG Chart data): Submissions by Exam
    const examPerformanceData = db.exams
      .filter(e => e.published)
      .map(e => {
        const subs = db.submissions.filter(s => s.examId === e.id);
        const avg = subs.length > 0 ? Math.round(subs.reduce((acc, curr) => acc + curr.percentage, 0) / subs.length) : 0;
        return {
          name: e.title.length > 20 ? e.title.slice(0, 17) + '...' : e.title,
          average: avg,
          submissions: subs.length
        };
      });

    // Question type counts
    const mcqCount = db.questions.filter(q => q.questionType === 'MCQ').length;
    const fbCount = db.questions.filter(q => q.questionType === 'FillBlank').length;
    const tfCount = db.questions.filter(q => q.questionType === 'TrueFalse').length;

    return {
      metrics: {
        totalQuestions,
        totalExams,
        publishedExams,
        totalStudents,
        totalSubmissions,
        avgScore
      },
      recentExams,
      recentQuestions,
      leaderboard: studentAverages,
      charts: {
        examPerformance: examPerformanceData,
        questionTypes: [
          { type: 'MCQ', count: mcqCount },
          { type: 'Fill In Blank', count: fbCount },
          { type: 'True / False', count: tfCount }
        ]
      }
    };
  },

  getStudentDashboardStats: async (userId) => {
    await delay(500);
    const db = getDb();
    
    const subs = db.submissions.filter(s => s.userId === userId);
    const examsTaken = subs.length;
    
    // Average mark (percentage)
    const averageMark = examsTaken > 0
      ? Math.round(subs.reduce((acc, curr) => acc + curr.percentage, 0) / examsTaken * 10) / 10
      : 0;

    // Highest mark (percentage)
    const highestMark = examsTaken > 0
      ? Math.max(...subs.map(s => s.percentage))
      : 0;

    // Upcoming / available exams
    const now = new Date();
    const available = db.exams.filter(e => {
      const end = new Date(e.endTime);
      return e.published && end > now && !subs.some(s => s.examId === e.id);
    });

    const upcomingExams = available.map(e => ({
      id: e.id,
      title: e.title,
      duration: e.duration,
      startTime: e.startTime,
      endTime: e.endTime,
      questionsCount: e.questions.length
    }));

    // Completed exams list
    const completedExams = subs.map(s => {
      const exam = db.exams.find(e => e.id === s.examId);
      return {
        id: s.id,
        examId: s.examId,
        title: exam ? exam.title : 'Deleted Exam',
        score: s.score,
        totalMarks: exam ? exam.totalMarks : 0,
        percentage: s.percentage,
        passed: s.passed,
        completedAt: s.completedAt
      };
    }).sort((a,b) => new Date(b.completedAt) - new Date(a.completedAt));

    // Global Leaderboard
    const leaderboard = db.users
      .filter(u => u.role === 'Student')
      .map(stud => {
        const studentSubs = db.submissions.filter(s => s.userId === stud.id);
        const count = studentSubs.length;
        const avg = count > 0 ? Math.round(studentSubs.reduce((acc, curr) => acc + curr.percentage, 0) / count) : 0;
        return {
          id: stud.id,
          name: stud.name,
          institution: stud.institution || 'None',
          profileImage: stud.profileImage,
          examsTaken: count,
          average: avg,
          isSelf: stud.id === userId
        };
      })
      .sort((a, b) => b.average - a.average || b.examsTaken - a.examsTaken);

    // Student performance over time (chart data)
    const performanceOverTime = subs
      .sort((a,b) => new Date(a.completedAt) - new Date(b.completedAt))
      .map(s => {
        const exam = db.exams.find(e => e.id === s.examId);
        return {
          label: exam ? exam.title.slice(0, 10) + '...' : 'Exam',
          percentage: s.percentage,
          score: s.score
        };
      });

    return {
      metrics: {
        examsTaken,
        averageMark,
        highestMark,
        upcomingCount: upcomingExams.length
      },
      upcomingExams,
      completedExams,
      leaderboard,
      charts: {
        performanceOverTime
      }
    };
  },

  // View exam details & scores for teacher
  getExamParticipants: async (examId) => {
    await delay(400);
    const db = getDb();
    
    const exam = db.exams.find(e => e.id === examId);
    if (!exam) throw new Error('Exam not found');
    
    const submissions = db.submissions.filter(s => s.examId === examId);
    const participants = submissions.map(sub => {
      const student = db.users.find(u => u.id === sub.userId);
      return {
        submissionId: sub.id,
        studentId: student ? student.id : 'deleted',
        name: student ? student.name : 'Unknown Student',
        email: student ? student.email : 'deleted@email.com',
        institution: student ? student.institution : 'None',
        score: sub.score,
        percentage: sub.percentage,
        passed: sub.passed,
        durationTaken: sub.durationTaken,
        completedAt: sub.completedAt
      };
    });

    return {
      exam: { id: exam.id, title: exam.title, totalMarks: exam.totalMarks },
      participants
    };
  }
};
