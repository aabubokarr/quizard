import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { fetchExams, createExam, updateExam, publishExam, deleteExam } from '../../redux/examSlice';
import { fetchQuestions } from '../../redux/questionSlice';
import { setBreadcrumbs } from '../../redux/uiSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { TableSkeleton } from '../../components/common/Skeletons';
import { useNavigate } from 'react-router';
import {
  FiCalendar,
  FiClock,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiUsers,
  FiCheck,
  FiPlusCircle,
  FiMinusCircle,
  FiInfo
} from 'react-icons/fi';

const ExamManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { exams, loading } = useSelector((state) => state.exams);
  const { questions } = useSelector((state) => state.questions);

  // Modal controls
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [deletingExamId, setDeletingExamId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Selected questions IDs for the active exam creation
  const [assignedQuestions, setAssignedQuestions] = useState([]);

  // Form hooks
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      duration: 15,
      startTime: '',
      endTime: '',
      totalMarks: 30,
    }
  });

  useEffect(() => {
    dispatch(setBreadcrumbs(['Teacher', 'Exams']));
    dispatch(fetchExams());
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleOpenForm = (exam = null) => {
    setSelectedExam(exam);
    if (exam) {
      reset({
        title: exam.title,
        description: exam.description,
        duration: exam.duration,
        startTime: exam.startTime ? new Date(exam.startTime).toISOString().slice(0, 16) : '',
        endTime: exam.endTime ? new Date(exam.endTime).toISOString().slice(0, 16) : '',
        totalMarks: exam.totalMarks,
      });
      setAssignedQuestions(exam.questions || []);
    } else {
      reset({
        title: '',
        description: '',
        duration: 15,
        startTime: new Date().toISOString().slice(0, 16),
        endTime: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 16), // 7 days later
        totalMarks: 30,
      });
      setAssignedQuestions([]);
    }
    setIsFormOpen(true);
  };

  const handleOpenDelete = (id) => {
    setDeletingExamId(id);
    setIsDeleteOpen(true);
  };

  const toggleQuestionAssignment = (qid) => {
    const idx = assignedQuestions.indexOf(qid);
    if (idx === -1) {
      setAssignedQuestions([...assignedQuestions, qid]);
    } else {
      setAssignedQuestions(assignedQuestions.filter(id => id !== qid));
    }
  };

  const handlePublish = async (examId) => {
    try {
      await dispatch(publishExam(examId)).unwrap();
      toast.success('Exam published successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to publish exam');
    }
  };

  const onSubmitForm = async (data) => {
    if (assignedQuestions.length === 0) {
      toast.error('Please assign at least one question to the exam.');
      return;
    }

    const examPayload = {
      ...data,
      questions: assignedQuestions,
      totalMarks: parseInt(data.totalMarks, 10),
      duration: parseInt(data.duration, 10),
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
    };

    try {
      if (selectedExam) {
        await dispatch(updateExam({ id: selectedExam.id, examData: examPayload })).unwrap();
        toast.success('Exam updated successfully!');
      } else {
        await dispatch(createExam(examPayload)).unwrap();
        toast.success('Exam campaign created!');
      }
      setIsFormOpen(false);
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      await dispatch(deleteExam(deletingExamId)).unwrap();
      toast.success('Exam deleted.');
      setIsDeleteOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to delete');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold dark:text-zinc-100">Exam Campaigns</h1>
          <p className="text-sm text-slate-400">Bundle questions into timed, graded exams and publish them for students.</p>
        </div>
        <Button onClick={() => handleOpenForm()} icon={FiPlus}>
          Create Exam
        </Button>
      </div>

      {/* Main Table */}
      {loading ? (
        <TableSkeleton />
      ) : exams.length === 0 ? (
        <Card className="text-center py-16 flex flex-col items-center gap-4">
          <FiInfo size={48} className="text-slate-300 dark:text-zinc-700" />
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-slate-800 dark:text-zinc-200">No exams configured</h3>
            <p className="text-sm text-slate-400 max-w-sm">
              Publish timed exam worksheets by combining questions from your question library.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <Card key={exam.id} className="flex flex-col justify-between gap-5 relative overflow-hidden group">
              {/* Top Details */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    exam.published
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                    {exam.published ? 'Published' : 'Draft'}
                  </span>
                  
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <FiClock size={12} /> {exam.duration} mins
                  </span>
                </div>
                
                <h3 className="font-bold text-lg text-slate-800 dark:text-zinc-200 line-clamp-1 leading-snug">
                  {exam.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {exam.description}
                </p>
              </div>

              {/* Stats and Scheduling */}
              <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-2xl flex flex-col gap-2 text-xs text-slate-500 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Questions assigned:</span>
                  <span className="font-bold text-slate-700 dark:text-zinc-300">{exam.questions?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total marks:</span>
                  <span className="font-bold text-slate-700 dark:text-zinc-300">{exam.totalMarks} pts</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-zinc-500 mt-1 border-t border-slate-100 dark:border-zinc-800 pt-2">
                  <FiCalendar /> {new Date(exam.startTime).toLocaleDateString()} - {new Date(exam.endTime).toLocaleDateString()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {!exam.published ? (
                  <Button
                    variant="glass"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => handlePublish(exam.id)}
                    icon={FiCheckCircle}
                  >
                    Publish
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs border border-slate-100 dark:border-zinc-800/60"
                    onClick={() => navigate(`/teacher/exams/results/${exam.id}`)}
                    icon={FiUsers}
                  >
                    Scores
                  </Button>
                )}
                
                <button
                  onClick={() => handleOpenForm(exam)}
                  className="p-2 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                  title="Edit Exam"
                >
                  <FiEdit size={16} />
                </button>

                <button
                  onClick={() => handleOpenDelete(exam.id)}
                  disabled={exam.published}
                  className="p-2 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title={exam.published ? "Cannot delete published exam" : "Delete Exam"}
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Slide-over Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedExam ? 'Edit Exam Campaign' : 'Configure New Exam'}
        size="xl"
      >
        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Input
                label="Exam Title"
                type="text"
                placeholder="e.g. CS101 Final Exam"
                error={errors.title}
                {...register('title', { required: 'Title is required' })}
              />

              <Input
                label="Campaign Description"
                type="text"
                textarea
                rows={3}
                placeholder="Brief guidelines or curriculum scope..."
                error={errors.description}
                {...register('description', { required: 'Description is required' })}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Duration (minutes)"
                  type="number"
                  error={errors.duration}
                  {...register('duration', { required: 'Duration is required', min: 1 })}
                />
                <Input
                  label="Total marks"
                  type="number"
                  error={errors.totalMarks}
                  {...register('totalMarks', { required: 'Total marks is required', min: 1 })}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Start Window (UTC)"
                  type="datetime-local"
                  error={errors.startTime}
                  {...register('startTime', { required: 'Start time is required' })}
                />
                <Input
                  label="End Window (UTC)"
                  type="datetime-local"
                  error={errors.endTime}
                  {...register('endTime', { required: 'End time is required' })}
                />
              </div>
            </div>

            {/* Questions Selection Column */}
            <div className="flex flex-col border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 bg-slate-50/30 dark:bg-zinc-950/20 max-h-[500px]">
              <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-1 block">
                Assign Questions ({assignedQuestions.length} selected)
              </span>
              <span className="text-xs text-slate-400 mb-4 block">Select entries from the Question Bank library to add.</span>
              
              <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
                {questions.map((q) => {
                  const isChecked = assignedQuestions.includes(q.id);
                  return (
                    <div 
                      key={q.id}
                      onClick={() => toggleQuestionAssignment(q.id)}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                        isChecked 
                          ? 'border-brand-500 bg-brand-500/5 dark:bg-brand-950/10' 
                          : 'border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-200'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isChecked ? (
                          <FiCheckCircle className="text-brand-500" size={16} />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-zinc-700" />
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                          {q.questionType}
                        </span>
                        <p className="text-xs font-semibold text-slate-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                          {q.questionText}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end border-t border-slate-100 dark:border-zinc-800 pt-4">
            <Button variant="ghost" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {selectedExam ? 'Update Exam' : 'Save Campaign'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Exam Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
        title="Delete Exam Campaign?"
        message="This action will delete this exam layout and remove all logs of previous scores. This cannot be undone."
      />
    </div>
  );
};

export default ExamManagement;
