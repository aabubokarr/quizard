import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import {
  updateAnswer,
  toggleFlagQuestion,
  setActiveQuestionIndex,
  incrementTimer,
  submitExam,
  endExamSession
} from '../../redux/examSlice';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import {
  FiClock,
  FiFlag,
  FiCheckCircle,
  FiMaximize2,
  FiMinimize2,
  FiChevronLeft,
  FiChevronRight,
  FiSave,
  FiAlertTriangle
} from 'react-icons/fi';

const ExamTaking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const {
    activeExam,
    activeQuestionIndex,
    studentAnswers,
    flaggedQuestions,
    elapsedTime,
    autosavedAt,
    submitting
  } = useSelector((state) => state.exams);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // If no active exam session exists, redirect back to student dashboard
  useEffect(() => {
    if (!activeExam) {
      navigate('/student/dashboard');
    }
  }, [activeExam, navigate]);

  // Timer ticker
  useEffect(() => {
    if (activeExam) {
      timerRef.current = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeExam, dispatch]);

  // Fullscreen listeners
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!activeExam) return null;

  const questions = activeExam.questionsList || [];
  const currentQuestion = questions[activeQuestionIndex];
  
  // Calculate remaining time
  const totalSecondsAllowed = activeExam.duration * 60;
  const remainingSeconds = Math.max(totalSecondsAllowed - elapsedTime, 0);

  // Timer format helper
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Warning check when time is ticking down
  useEffect(() => {
    if (remainingSeconds === 300) { // 5 mins
      toast('5 minutes remaining!', { icon: '⚠️', style: { background: '#f59e0b', color: '#fff' } });
    }
    if (remainingSeconds === 60) { // 1 min
      toast('1 minute remaining! Quick, verify your answers.', { icon: '🚨', style: { background: '#ef4444', color: '#fff' } });
    }
    if (remainingSeconds === 0 && activeExam) {
      // Auto submit
      handleAutoSubmit();
    }
  }, [remainingSeconds, activeExam]);

  const handleAutoSubmit = async () => {
    toast.error("Time's up! Automatically submitting your exam...", { duration: 4000 });
    try {
      const res = await dispatch(submitExam({
        examId: activeExam.id,
        answers: studentAnswers,
        durationTaken: elapsedTime
      })).unwrap();
      navigate(`/student/exam/result/${res.id}`);
      dispatch(endExamSession());
    } catch (err) {
      toast.error('Submission failed');
    }
  };

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => toast.error('Fullscreen request rejected'));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false));
    }
  };

  const handleAnswerSelect = (optionValue) => {
    dispatch(updateAnswer({ questionId: currentQuestion.id, answer: optionValue }));
  };

  const handleNext = () => {
    if (activeQuestionIndex < questions.length - 1) {
      dispatch(setActiveQuestionIndex(activeQuestionIndex + 1));
    }
  };

  const handlePrev = () => {
    if (activeQuestionIndex > 0) {
      dispatch(setActiveQuestionIndex(activeQuestionIndex - 1));
    }
  };

  const handleConfirmSubmit = async () => {
    try {
      setIsSubmitOpen(false);
      const res = await dispatch(submitExam({
        examId: activeExam.id,
        answers: studentAnswers,
        durationTaken: elapsedTime
      })).unwrap();
      
      toast.success('Exam submitted successfully!');
      navigate(`/student/exam/result/${res.id}`);
      dispatch(endExamSession());
    } catch (err) {
      toast.error(err.message || 'Failed to submit exam');
    }
  };

  // Progress Bar Details
  const answeredCount = Object.keys(studentAnswers).filter(id => studentAnswers[id]).length;
  const progressPercent = Math.round((answeredCount / (questions.length || 1)) * 100);

  // Check how many are flagged and unanswered
  const flaggedCount = flaggedQuestions.length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-zinc-200 transition-colors duration-300 font-sans flex flex-col relative pb-10">
      
      {/* Top Testing Header Bar */}
      <header className="sticky top-0 z-30 bg-white dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-800/80 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex flex-col gap-1 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Exam session</span>
          <h2 className="text-base md:text-lg font-bold text-slate-800 dark:text-zinc-100 truncate">{activeExam.title}</h2>
        </div>

        {/* Timer, Auto Save Status, Actions */}
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
          {/* Autosaved timestamp */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <FiSave className="animate-pulse" /> 
            <span>{autosavedAt ? `Autosaved: ${autosavedAt}` : 'Saving...'}</span>
          </div>

          {/* Time Countdown clock */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-mono text-sm md:text-base font-bold ${
            remainingSeconds < 120 
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 animate-pulse' 
              : 'bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300'
          }`}>
            <FiClock /> {formatTime(remainingSeconds)}
          </div>

          <div className="flex gap-2">
            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-xl border border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 cursor-pointer text-slate-500"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
            </button>
            <Button variant="success" size="sm" onClick={() => setIsSubmitOpen(true)}>
              Submit Exam
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-zinc-900 h-1.5 relative overflow-hidden">
        <div 
          style={{ width: `${progressPercent}%` }} 
          className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 transition-all duration-300"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Navigator & Info */}
        <div className="lg:col-span-1 flex flex-col gap-6 order-2 lg:order-1">
          {/* Question Grid Panel */}
          <Card className="p-5 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question Navigator</h3>
            
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q, idx) => {
                const isAnswered = !!studentAnswers[q.id];
                const isFlagged = flaggedQuestions.includes(q.id);
                const isActive = idx === activeQuestionIndex;

                let stateClasses = 'bg-slate-50 dark:bg-zinc-800 text-slate-400 border border-transparent';
                if (isAnswered) stateClasses = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold';
                if (isFlagged) stateClasses = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold';
                if (isActive) stateClasses = 'ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-dark-bg font-extrabold text-brand-600 dark:text-brand-400 border border-brand-500/30';

                return (
                  <button
                    key={q.id}
                    onClick={() => dispatch(setActiveQuestionIndex(idx))}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs transition-all cursor-pointer ${stateClasses}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            
            {/* Color Legend */}
            <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-slate-50 dark:border-zinc-800/40 text-[10px] text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-zinc-800" />
                <span>Unanswered / Unvisited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                <span>Flagged for Review</span>
              </div>
            </div>
          </Card>

          {/* Guidelines info */}
          <Card className="p-4 bg-indigo-500/5 border border-indigo-500/10 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            <span className="font-bold block text-slate-700 dark:text-zinc-300 mb-1">Testing Rules:</span>
            Do not exit Fullscreen mode. Any page transitions or reloads will retain answers via the auto-save utility. Good luck.
          </Card>
        </div>

        {/* Right Column: Question Content */}
        <div className="lg:col-span-3 flex flex-col gap-4 order-1 lg:order-2">
          {currentQuestion && (
            <Card className="p-6 md:p-8 flex flex-col gap-6 relative min-h-[400px] justify-between">
              
              {/* Question Text */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold bg-brand-500/10 text-brand-600 px-2 py-0.5 rounded-full uppercase">
                    Question {activeQuestionIndex + 1} of {questions.length}
                  </span>
                  
                  <button
                    onClick={() => dispatch(toggleFlagQuestion(currentQuestion.id))}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      flaggedQuestions.includes(currentQuestion.id)
                        ? 'bg-amber-500/15 text-amber-600 border-amber-500/20'
                        : 'text-slate-400 hover:text-slate-600 border-slate-100 dark:border-zinc-800'
                    }`}
                  >
                    <FiFlag />
                    {flaggedQuestions.includes(currentQuestion.id) ? 'Flagged' : 'Flag Question'}
                  </button>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-zinc-100 mt-2 leading-snug">
                  {currentQuestion.questionText}
                </h3>
              </div>

              {/* Answers Input Area */}
              <div className="flex-1 flex flex-col justify-center my-6">
                {/* MCQ Mode */}
                {currentQuestion.questionType === 'MCQ' && (
                  <div className="grid grid-cols-1 gap-3.5">
                    {currentQuestion.options?.map((option, idx) => {
                      const isSelected = studentAnswers[currentQuestion.id] === option;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleAnswerSelect(option)}
                          className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer select-none transition-all ${
                            isSelected
                              ? 'border-brand-500 bg-brand-500/5 dark:bg-brand-950/15 text-brand-700 dark:text-brand-400 font-semibold shadow-sm'
                              : 'border-slate-100 dark:border-zinc-850 hover:border-slate-200 text-slate-600 dark:text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                              isSelected 
                                ? 'bg-brand-500 text-white' 
                                : 'bg-slate-50 dark:bg-zinc-800 text-slate-500'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-sm md:text-base">{option}</span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-brand-500 text-brand-500' : 'border-slate-300 dark:border-zinc-700'
                          }`}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* True/False Mode */}
                {currentQuestion.questionType === 'TrueFalse' && (
                  <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto w-full">
                    {['True', 'False'].map((val) => {
                      const isSelected = studentAnswers[currentQuestion.id] === val;
                      return (
                        <div
                          key={val}
                          onClick={() => handleAnswerSelect(val)}
                          className={`p-6 rounded-2xl border text-center cursor-pointer select-none transition-all flex flex-col gap-2 ${
                            isSelected
                              ? 'border-brand-500 bg-brand-500/5 dark:bg-brand-950/15 text-brand-700 dark:text-brand-400 font-bold shadow-sm'
                              : 'border-slate-100 dark:border-zinc-850 hover:border-slate-200 text-slate-600 dark:text-zinc-400'
                          }`}
                        >
                          <span className="text-base md:text-lg">{val}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Fill in the Blank Mode */}
                {currentQuestion.questionType === 'FillBlank' && (
                  <div className="max-w-xl mx-auto w-full flex flex-col gap-3">
                    <span className="text-xs text-slate-400">Type correct answer below:</span>
                    <input
                      type="text"
                      value={studentAnswers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswerSelect(e.target.value)}
                      placeholder="Type answer phrase..."
                      className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-sm md:text-base focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none text-slate-900 dark:text-zinc-100 placeholder:text-slate-400"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Nav Actions */}
              <div className="flex justify-between items-center border-t border-slate-50 dark:border-zinc-800/40 pt-5">
                <Button
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={activeQuestionIndex === 0}
                  icon={FiChevronLeft}
                  className="border border-slate-100 dark:border-zinc-800"
                >
                  Previous
                </Button>
                <span className="text-xs text-slate-400 font-medium font-mono">
                  {activeQuestionIndex + 1} / {questions.length}
                </span>
                <Button
                  variant="ghost"
                  onClick={handleNext}
                  disabled={activeQuestionIndex === questions.length - 1}
                  icon={FiChevronRight}
                  iconPosition="right"
                  className="border border-slate-100 dark:border-zinc-800"
                >
                  Next
                </Button>
              </div>

            </Card>
          )}
        </div>

      </div>

      {/* Manual Submit Confirmation */}
      <ConfirmDialog
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onConfirm={handleConfirmSubmit}
        loading={submitting}
        title="Submit your Exam?"
        message={`Review your submission: You have answered ${answeredCount}/${questions.length} questions, leaving ${unansweredCount} unanswered. There are ${flaggedCount} questions marked with review flags.`}
        confirmText="Yes, Submit Exam"
        variant="success"
      />
    </div>
  );
};

export default ExamTaking;
