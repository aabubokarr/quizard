import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Async Thunks
export const fetchExams = createAsyncThunk(
  'exams/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await api.exams.getAll();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch exams');
    }
  }
);

export const fetchAvailableExams = createAsyncThunk(
  'exams/fetchAvailable',
  async (_, { rejectWithValue }) => {
    try {
      return await api.exams.getAvailable();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch available exams');
    }
  }
);

export const createExam = createAsyncThunk(
  'exams/create',
  async (examData, { rejectWithValue }) => {
    try {
      return await api.exams.create(examData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create exam');
    }
  }
);

export const updateExam = createAsyncThunk(
  'exams/update',
  async ({ id, examData }, { rejectWithValue }) => {
    try {
      return await api.exams.update(id, examData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update exam');
    }
  }
);

export const publishExam = createAsyncThunk(
  'exams/publish',
  async (id, { rejectWithValue }) => {
    try {
      return await api.exams.publish(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to publish exam');
    }
  }
);

export const deleteExam = createAsyncThunk(
  'exams/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.exams.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete exam');
    }
  }
);

export const submitExam = createAsyncThunk(
  'exams/submit',
  async ({ examId, answers, durationTaken }, { rejectWithValue }) => {
    try {
      return await api.exams.submit(examId, answers, durationTaken);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to submit exam');
    }
  }
);

export const fetchResultsList = createAsyncThunk(
  'exams/fetchResults',
  async (_, { rejectWithValue }) => {
    try {
      return await api.exams.getResultsList();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch results');
    }
  }
);

const initialState = {
  exams: [],
  availableExams: [],
  resultsList: [],
  loading: false,
  submitting: false,
  error: null,
  
  // Active Exam Taking Engine State
  activeExam: null,
  activeQuestionIndex: 0,
  studentAnswers: {}, // questionId -> answerText
  flaggedQuestions: [], // array of questionIds
  elapsedTime: 0, // seconds taken
  examTimerActive: false,
  autosavedAt: null,
  submissionResult: null,
};

const examSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    // Exam Taking Actions
    startExamSession: (state, action) => {
      const exam = action.payload;
      state.activeExam = exam;
      state.activeQuestionIndex = 0;
      state.flaggedQuestions = [];
      state.elapsedTime = 0;
      state.examTimerActive = true;
      state.submissionResult = null;
      state.error = null;
      
      // Load saved progress from localStorage if it matches this exam session
      const savedProgress = localStorage.getItem(`quizard_progress_${exam.id}`);
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress);
          state.studentAnswers = parsed.answers || {};
          state.flaggedQuestions = parsed.flagged || [];
          state.elapsedTime = parsed.elapsedTime || 0;
        } catch (e) {
          state.studentAnswers = {};
        }
      } else {
        state.studentAnswers = {};
      }
    },
    updateAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.studentAnswers[questionId] = answer;
      
      // Auto save to localStorage
      if (state.activeExam) {
        localStorage.setItem(
          `quizard_progress_${state.activeExam.id}`,
          JSON.stringify({
            answers: state.studentAnswers,
            flagged: state.flaggedQuestions,
            elapsedTime: state.elapsedTime,
          })
        );
        state.autosavedAt = new Date().toLocaleTimeString();
      }
    },
    toggleFlagQuestion: (state, action) => {
      const questionId = action.payload;
      const index = state.flaggedQuestions.indexOf(questionId);
      if (index === -1) {
        state.flaggedQuestions.push(questionId);
      } else {
        state.flaggedQuestions.splice(index, 1);
      }
      
      if (state.activeExam) {
        localStorage.setItem(
          `quizard_progress_${state.activeExam.id}`,
          JSON.stringify({
            answers: state.studentAnswers,
            flagged: state.flaggedQuestions,
            elapsedTime: state.elapsedTime,
          })
        );
      }
    },
    setActiveQuestionIndex: (state, action) => {
      state.activeQuestionIndex = action.payload;
    },
    incrementTimer: (state) => {
      state.elapsedTime += 1;
      
      // Periodic save every 10 seconds
      if (state.activeExam && state.elapsedTime % 10 === 0) {
        localStorage.setItem(
          `quizard_progress_${state.activeExam.id}`,
          JSON.stringify({
            answers: state.studentAnswers,
            flagged: state.flaggedQuestions,
            elapsedTime: state.elapsedTime,
          })
        );
        state.autosavedAt = new Date().toLocaleTimeString();
      }
    },
    stopExamTimer: (state) => {
      state.examTimerActive = false;
    },
    endExamSession: (state) => {
      if (state.activeExam) {
        localStorage.removeItem(`quizard_progress_${state.activeExam.id}`);
      }
      state.activeExam = null;
      state.studentAnswers = {};
      state.flaggedQuestions = [];
      state.elapsedTime = 0;
      state.examTimerActive = false;
      state.autosavedAt = null;
    },
    clearExamError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all exams (Teacher dashboard)
      .addCase(fetchExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch available exams (Student dashboard)
      .addCase(fetchAvailableExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableExams.fulfilled, (state, action) => {
        state.loading = false;
        state.availableExams = action.payload;
      })
      .addCase(fetchAvailableExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create exam
      .addCase(createExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exams.unshift(action.payload);
      })
      .addCase(createExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update exam
      .addCase(updateExam.fulfilled, (state, action) => {
        const index = state.exams.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.exams[index] = action.payload;
        }
      })
      // Publish exam
      .addCase(publishExam.fulfilled, (state, action) => {
        const index = state.exams.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.exams[index].published = true;
        }
      })
      // Delete exam
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.exams = state.exams.filter(e => e.id !== action.payload);
      })
      // Submit exam
      .addCase(submitExam.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.submitting = false;
        state.submissionResult = action.payload;
        state.examTimerActive = false;
        if (state.activeExam) {
          localStorage.removeItem(`quizard_progress_${state.activeExam.id}`);
        }
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })
      // Fetch results
      .addCase(fetchResultsList.fulfilled, (state, action) => {
        state.resultsList = action.payload;
      });
  }
});

export const {
  startExamSession,
  updateAnswer,
  toggleFlagQuestion,
  setActiveQuestionIndex,
  incrementTimer,
  stopExamTimer,
  endExamSession,
  clearExamError
} = examSlice.actions;

export default examSlice.reducer;
