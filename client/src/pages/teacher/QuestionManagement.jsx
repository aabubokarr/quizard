import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { fetchQuestions, createQuestion, updateQuestion, deleteQuestion } from '../../redux/questionSlice';
import { setBreadcrumbs } from '../../redux/uiSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { QuestionSkeleton } from '../../components/common/Skeletons';
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCheck,
  FiInfo,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const QuestionManagement = () => {
  const dispatch = useDispatch();
  const { questions, loading } = useSelector((state) => state.questions);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [previewingQuestion, setPreviewingQuestion] = useState(null);
  const [deletingQuestionId, setDeletingQuestionId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questionText: '',
      questionType: 'MCQ',
      correctAnswer: '',
      options: ['', '', '', ''],
    }
  });

  const watchType = watch('questionType');
  const watchOptions = watch('options');

  useEffect(() => {
    dispatch(setBreadcrumbs(['Teacher', 'Question Bank']));
    dispatch(fetchQuestions());
  }, [dispatch]);

  // Handle open create/edit form
  const handleOpenForm = (q = null) => {
    setEditingQuestion(q);
    if (q) {
      reset({
        questionText: q.questionText,
        questionType: q.questionType,
        correctAnswer: q.correctAnswer,
        options: q.options || ['', '', '', ''],
      });
    } else {
      reset({
        questionText: '',
        questionType: 'MCQ',
        correctAnswer: '',
        options: ['', '', '', ''],
      });
    }
    setIsFormOpen(true);
  };

  const handleOpenPreview = (q) => {
    setPreviewingQuestion(q);
    setIsPreviewOpen(true);
  };

  const handleOpenDelete = (id) => {
    setDeletingQuestionId(id);
    setIsDeleteOpen(true);
  };

  // Submit create/edit form
  const onSubmitForm = async (data) => {
    try {
      // Validate correct answer matches options for MCQ
      if (data.questionType === 'MCQ') {
        const optionExists = data.options.some(opt => opt.trim() === data.correctAnswer.trim());
        if (!optionExists) {
          toast.error('Correct answer must exactly match one of the options.');
          return;
        }
      }

      const questionData = {
        questionText: data.questionText,
        questionType: data.questionType,
        correctAnswer: data.correctAnswer,
        options: data.questionType === 'MCQ' ? data.options.filter(Boolean) : [],
      };

      if (editingQuestion) {
        await dispatch(updateQuestion({ id: editingQuestion.id, questionData })).unwrap();
        toast.success('Question updated successfully!');
      } else {
        await dispatch(createQuestion(questionData)).unwrap();
        toast.success('Question added to Bank!');
      }
      setIsFormOpen(false);
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    }
  };

  // Delete Question handler
  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      await dispatch(deleteQuestion(deletingQuestionId)).unwrap();
      toast.success('Question deleted successfully.');
      setIsDeleteOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to delete question');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filter & Search Logic
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.questionText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || q.questionType === filterType;
    return matchesSearch && matchesType;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold dark:text-zinc-100">Question Bank</h1>
          <p className="text-sm text-slate-400">Add, edit, and organize test questions of multiple formats.</p>
        </div>
        <Button onClick={() => handleOpenForm()} icon={FiPlus}>
          Add Question
        </Button>
      </div>

      {/* Filters Card */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions by text..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 dark:bg-zinc-800 border-0 rounded-xl pl-10 pr-4 py-2.5 text-sm md:text-base focus:ring-2 focus:ring-brand-500/20 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-zinc-500"
          />
        </div>

        {/* Filters Tabs */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
          {['All', 'MCQ', 'TrueFalse', 'FillBlank'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilterType(type);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                filterType === type
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/60 text-slate-500 dark:text-zinc-400'
              }`}
            >
              {type === 'TrueFalse' ? 'True / False' : type === 'FillBlank' ? 'Fill Blank' : type}
            </button>
          ))}
        </div>
      </Card>

      {/* Questions list */}
      {loading ? (
        <QuestionSkeleton />
      ) : paginatedQuestions.length === 0 ? (
        <Card className="text-center py-16 flex flex-col items-center gap-4">
          <FiInfo size={48} className="text-slate-300 dark:text-zinc-700" />
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-slate-800 dark:text-zinc-200">No questions found</h3>
            <p className="text-sm text-slate-400 max-w-sm">
              Try adjusting your search criteria or click "Add Question" to start building your database.
            </p>
          </div>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {paginatedQuestions.map((q) => (
            <Card key={q.id} hoverable className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-2 min-w-0">
                <div className="flex gap-2 items-center">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    q.questionType === 'MCQ' 
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                      : q.questionType === 'TrueFalse' 
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {q.questionType === 'MCQ' ? 'MCQ' : q.questionType === 'TrueFalse' ? 'True/False' : 'Fill Blank'}
                  </span>
                  <span className="text-xs text-slate-400">Added {new Date(q.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="font-bold text-slate-800 dark:text-zinc-200 text-sm md:text-base leading-snug">
                  {q.questionText}
                </h3>
                
                {q.questionType === 'MCQ' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    {q.options?.map((opt, i) => (
                      <span 
                        key={i} 
                        className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                          opt === q.correctAnswer 
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-500/20' 
                            : 'bg-slate-50 dark:bg-zinc-800/40 text-slate-500 border border-transparent'
                        }`}
                      >
                        {opt === q.correctAnswer && <FiCheck size={12} />}
                        {opt}
                      </span>
                    ))}
                  </div>
                )}
                {q.questionType !== 'MCQ' && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-max mt-1">
                    Correct: {q.correctAnswer}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1">
                <button
                  onClick={() => handleOpenPreview(q)}
                  className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                  title="Preview Question"
                >
                  <FiEye size={18} />
                </button>
                <button
                  onClick={() => handleOpenForm(q)}
                  className="p-2 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                  title="Edit Question"
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  onClick={() => handleOpenDelete(q.id)}
                  className="p-2 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                  title="Delete Question"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </Card>
          ))}
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-slate-400">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredQuestions.length)} of {filteredQuestions.length}
              </span>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handlePrevPage} 
                  disabled={currentPage === 1}
                  className="border border-slate-100 dark:border-zinc-800"
                >
                  <FiChevronLeft size={16} /> Previous
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleNextPage} 
                  disabled={currentPage === totalPages}
                  className="border border-slate-100 dark:border-zinc-800"
                >
                  Next <FiChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Creation Modal */}
      <Modal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        title={editingQuestion ? 'Edit Question' : 'Add Question'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4">
          <Input
            label="Question Text"
            type="text"
            textarea
            placeholder="Write the question prompt here..."
            error={errors.questionText}
            {...register('questionText', { required: 'Question prompt is required' })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Question Type"
              type="select"
              options={[
                { label: 'Multiple Choice (MCQ)', value: 'MCQ' },
                { label: 'True / False', value: 'TrueFalse' },
                { label: 'Fill in the Blank', value: 'FillBlank' }
              ]}
              {...register('questionType')}
            />

            {watchType === 'TrueFalse' && (
              <Input
                label="Correct Answer"
                type="select"
                options={[
                  { label: 'True', value: 'True' },
                  { label: 'False', value: 'False' }
                ]}
                {...register('correctAnswer')}
              />
            )}

            {watchType === 'FillBlank' && (
              <Input
                label="Correct Word / Phrase"
                type="text"
                placeholder="Enter exact correct matching text"
                error={errors.correctAnswer}
                {...register('correctAnswer', { required: 'Correct answer text is required' })}
              />
            )}
          </div>

          {watchType === 'MCQ' && (
            <div className="flex flex-col gap-3 mt-2 border-t border-slate-50 dark:border-zinc-800/40 pt-4">
              <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                MCQ Options (Fill at least 2)
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((idx) => (
                  <Input
                    key={idx}
                    label={`Option ${idx + 1}`}
                    type="text"
                    placeholder={`Answer option ${idx + 1}`}
                    error={errors.options?.[idx]}
                    {...register(`options.${idx}`, {
                      required: idx < 2 ? `Option ${idx + 1} is required` : false
                    })}
                  />
                ))}
              </div>

              <div className="mt-2">
                <Input
                  label="Assign Correct MCQ Option"
                  type="select"
                  options={
                    (watchOptions || ['', '', '', ''])
                      .map((val) => ({ label: val || '(Empty option)', value: val }))
                      .filter(opt => opt.value !== '')
                  }
                  {...register('correctAnswer', { required: 'Assigning a correct answer is required' })}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-end mt-6">
            <Button variant="ghost" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingQuestion ? 'Update Question' : 'Save Question'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Preview Modal */}
      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} title="Question Preview" size="md">
        {previewingQuestion && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <span className="text-[10px] font-bold bg-brand-500/10 text-brand-600 px-2 py-0.5 rounded-full uppercase">
                {previewingQuestion.questionType}
              </span>
            </div>
            
            <p className="text-base font-bold text-slate-800 dark:text-zinc-100 leading-snug">
              {previewingQuestion.questionText}
            </p>

            <div className="flex flex-col gap-2 mt-2">
              {previewingQuestion.questionType === 'MCQ' ? (
                previewingQuestion.options.map((opt, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-xl border flex items-center justify-between text-sm ${
                      opt === previewingQuestion.correctAnswer
                        ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-medium'
                        : 'border-slate-100 dark:border-zinc-800 text-slate-600 dark:text-zinc-400'
                    }`}
                  >
                    <span>{opt}</span>
                    {opt === previewingQuestion.correctAnswer && <FiCheck size={16} />}
                  </div>
                ))
              ) : (
                <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-zinc-400">Correct Answer:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{previewingQuestion.correctAnswer}</span>
                </div>
              )}
            </div>

            <Button onClick={() => setIsPreviewOpen(false)} className="w-full mt-4">
              Close Preview
            </Button>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
        title="Delete Question?"
        message="This question will be removed from the bank. If it belongs to an exam draft, it will be removed. You cannot delete questions used in published exams."
      />
    </div>
  );
};

export default QuestionManagement;
