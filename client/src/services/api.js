import axios from 'axios';
import { mockApi, initMockDb } from './mockApi';

// Toggle to switch between mock client-side database and actual server backend API
const USE_MOCK = true;

// Initialize mock DB in case it's the first visit
if (USE_MOCK && typeof window !== 'undefined') {
  initMockDb();
}

// Create Axios Instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Axios Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('quizard_token') || sessionStorage.getItem('quizard_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios Response Interceptor: Handle Global Errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('quizard_token');
      sessionStorage.removeItem('quizard_token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API Service Wrapper
// If USE_MOCK is true, it intercepts calls and routes to mockApi (with localStorage)
// If USE_MOCK is false, it uses apiClient (axios) to hit the Node.js Express server
const api = {
  auth: {
    login: async (credentials) => {
      if (USE_MOCK) return mockApi.login(credentials);
      const res = await apiClient.post('/auth/login', credentials);
      return res.data.data;
    },
    register: async (userData) => {
      if (USE_MOCK) return mockApi.register(userData);
      const res = await apiClient.post('/auth/register', userData);
      return res.data.data;
    },
    getCurrentUser: async () => {
      const token = localStorage.getItem('quizard_token') || sessionStorage.getItem('quizard_token');
      if (!token) throw new Error('No auth token found');
      if (USE_MOCK) return mockApi.getCurrentUser(token);
      const res = await apiClient.get('/auth/current-user');
      return res.data.data;
    },
  },

  profile: {
    get: async () => {
      const token = localStorage.getItem('quizard_token') || sessionStorage.getItem('quizard_token');
      if (USE_MOCK) return mockApi.getCurrentUser(token);
      const res = await apiClient.get('/profile/profile');
      return res.data.data;
    },
    update: async (profileData) => {
      const token = localStorage.getItem('quizard_token') || sessionStorage.getItem('quizard_token');
      if (USE_MOCK) return mockApi.updateProfile(token, profileData);
      const res = await apiClient.put('/profile/profile', profileData);
      return res.data.data;
    },
    changePassword: async (passwordData) => {
      const token = localStorage.getItem('quizard_token') || sessionStorage.getItem('quizard_token');
      if (USE_MOCK) return mockApi.changePassword(token, passwordData);
      const res = await apiClient.put('/profile/profile/change-password', passwordData);
      return res.data;
    },
    uploadAvatar: async (avatarName) => {
      const token = localStorage.getItem('quizard_token') || sessionStorage.getItem('quizard_token');
      if (USE_MOCK) return mockApi.uploadAvatar(token, avatarName);
      // For real backend: multipart file upload
      const res = await apiClient.put('/profile/profile/upload-image', { avatar: avatarName });
      return res.data.data;
    }
  },

  questions: {
    getAll: async () => {
      if (USE_MOCK) return mockApi.getQuestions();
      const res = await apiClient.get('/questions');
      return res.data.data;
    },
    create: async (questionData) => {
      if (USE_MOCK) return mockApi.createQuestion(questionData);
      const res = await apiClient.post('/questions', questionData);
      return res.data.data;
    },
    update: async (id, questionData) => {
      if (USE_MOCK) return mockApi.updateQuestion(id, questionData);
      const res = await apiClient.put(`/questions/${id}`, questionData);
      return res.data.data;
    },
    delete: async (id) => {
      if (USE_MOCK) return mockApi.deleteQuestion(id);
      const res = await apiClient.delete(`/questions/${id}`);
      return res.data;
    }
  },

  exams: {
    getAll: async () => {
      if (USE_MOCK) return mockApi.getExams();
      const res = await apiClient.get('/exams/available'); // teacher view or admin
      return res.data.data;
    },
    create: async (examData) => {
      if (USE_MOCK) return mockApi.createExam(examData);
      const res = await apiClient.post('/exams/create', examData);
      return res.data.data;
    },
    update: async (id, examData) => {
      if (USE_MOCK) return mockApi.updateExam(id, examData);
      const res = await apiClient.put(`/exams/update/${id}`, examData);
      return res.data.data;
    },
    publish: async (id) => {
      if (USE_MOCK) return mockApi.publishExam(id);
      const res = await apiClient.post(`/exams/publish/${id}`);
      return res.data.data;
    },
    delete: async (id) => {
      if (USE_MOCK) return mockApi.deleteExam(id);
      const res = await apiClient.delete(`/exams/delete/${id}`);
      return res.data;
    },
    getAvailable: async () => {
      const token = localStorage.getItem('quizard_token') || sessionStorage.getItem('quizard_token');
      const userId = token ? token.split('-')[4] : null;
      if (USE_MOCK) return mockApi.getAvailableExams(userId);
      const res = await apiClient.get('/exams/available');
      return res.data.data;
    },
    submit: async (examId, answers, durationTaken) => {
      const token = localStorage.getItem('quizard_token') || sessionStorage.getItem('quizard_token');
      const userId = token ? token.split('-')[4] : null;
      if (USE_MOCK) return mockApi.submitExam(userId, examId, answers, durationTaken);
      const res = await apiClient.post(`/exams/submit/${examId}`, { answers, durationTaken });
      return res.data.data;
    },
    getResultsList: async () => {
      const token = localStorage.getItem('quizard_token') || sessionStorage.getItem('quizard_token');
      const userId = token ? token.split('-')[4] : null;
      if (USE_MOCK) return mockApi.getStudentResults(userId);
      const res = await apiClient.get(`/exams/results-list`); // Custom student endpoint
      return res.data.data;
    },
    getResultDetail: async (submissionId) => {
      if (USE_MOCK) return mockApi.getExamResultDetail(submissionId);
      const res = await apiClient.get(`/exams/results/${submissionId}`);
      return res.data.data;
    },
    getParticipants: async (examId) => {
      if (USE_MOCK) return mockApi.getExamParticipants(examId);
      const res = await apiClient.get(`/exams/participants/${examId}`); // Custom teacher endpoint
      return res.data.data;
    }
  },

  dashboard: {
    getTeacherStats: async () => {
      if (USE_MOCK) return mockApi.getTeacherDashboardStats();
      const res = await apiClient.get('/dashboard/teacher-stats');
      return res.data.data;
    },
    getStudentStats: async () => {
      const token = localStorage.getItem('quizard_token') || sessionStorage.getItem('quizard_token');
      const userId = token ? token.split('-')[4] : null;
      if (USE_MOCK) return mockApi.getStudentDashboardStats(userId);
      const res = await apiClient.get('/dashboard/student-stats');
      return res.data.data;
    }
  }
};

export default api;
export { apiClient };
