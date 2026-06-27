import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Async Thunks
export const fetchQuestions = createAsyncThunk(
  'questions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.questions.getAll();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch questions');
    }
  }
);

export const createQuestion = createAsyncThunk(
  'questions/create',
  async (questionData, { rejectWithValue }) => {
    try {
      const data = await api.questions.create(questionData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create question');
    }
  }
);

export const updateQuestion = createAsyncThunk(
  'questions/update',
  async ({ id, questionData }, { rejectWithValue }) => {
    try {
      const data = await api.questions.update(id, questionData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update question');
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  'questions/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.questions.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete question');
    }
  }
);

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    clearQuestionError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch questions
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create question
      .addCase(createQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions.unshift(action.payload);
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update question
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.questions.findIndex(q => q.id === action.payload.id);
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete question
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = state.questions.filter(q => q.id !== action.payload);
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearQuestionError } = questionSlice.actions;
export default questionSlice.reducer;
