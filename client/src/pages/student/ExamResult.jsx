import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useSearchParams } from 'react-router';
import api from '../../services/api';
import { setBreadcrumbs } from '../../redux/uiSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { TableSkeleton } from '../../components/common/Skeletons';
import {
  FiArrowLeft,
  FiCheck,
  FiX,
  FiPrinter,
  FiClock,
  FiAward,
  FiTrendingUp,
  FiFileText
} from 'react-icons/fi';

const ExamResult = () => {
  const { submissionId } = useParams(); // It could be examId for students reviewing their own result, or direct submissionId
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const viewMode = searchParams.get('viewMode'); // 'teacher' or undefined

  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    dispatch(setBreadcrumbs(['Student', 'Exam', 'Result Review']));

    const loadResultDetails = async () => {
      try {
        setLoading(true);
        
        let subId = submissionId;
        
        // If it's a student and we only have the examId, we need to locate the submissionId first
        if (!submissionId.startsWith('s_')) {
          const results = await api.exams.getResultsList();
          const match = results.find(r => r.examId === submissionId);
          if (match) {
            subId = match.id;
          } else {
            throw new Error('Result not found for this exam');
          }
        }

        const data = await api.exams.getResultDetail(subId);
        setResult(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadResultDetails();
  }, [submissionId, dispatch]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !result) {
    return <TableSkeleton rows={4} />;
  }

  const { submission, exam, questionsList, user: studentInfo } = result;

  const totalQuestions = questionsList.length;
  
  // Format duration taken (seconds to mm:ss)
  const formatDuration = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top action header */}
      <div className="flex justify-between items-center no-print">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(viewMode === 'teacher' ? `/teacher/exams/results/${exam.id}` : '/student/dashboard')}
          className="border border-slate-100 dark:border-zinc-800"
          icon={FiArrowLeft}
        >
          {viewMode === 'teacher' ? 'Back to Roster' : 'Back to Dashboard'}
        </Button>

        <Button
          variant="glass"
          size="sm"
          onClick={handlePrint}
          icon={FiPrinter}
        >
          Print Report (PDF)
        </Button>
      </div>

      {/* Main Print Layout Card */}
      <Card className="print-card flex flex-col gap-8 p-6 md:p-8">
        
        {/* Printable Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-zinc-800/80 pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">Assessment Report</span>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-zinc-100">{exam.title}</h1>
            <span className="text-xs text-slate-400">Completed on {new Date(submission.completedAt).toLocaleString()}</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-zinc-800/20 border border-slate-100 dark:border-zinc-800 rounded-2xl flex flex-col text-xs text-slate-500 dark:text-zinc-400 gap-1.5 min-w-[200px]">
            <span className="font-bold text-slate-800 dark:text-zinc-200">Examinee Details:</span>
            <span>Name: {studentInfo.name}</span>
            <span>Email: {studentInfo.email}</span>
            <span>Institution: {studentInfo.institution}</span>
          </div>
        </div>

        {/* Score metrics & Radial Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Radial percentage gauge */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-zinc-950/10 border border-slate-100/50 dark:border-zinc-800/60 rounded-3xl h-56 relative">
            <svg className="w-32 h-32" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-zinc-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={submission.passed ? 'text-emerald-500' : 'text-rose-500'}
                strokeDasharray={`${submission.percentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-800 dark:text-zinc-100">{submission.percentage}%</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Score</span>
            </div>
          </div>

          {/* Stats details */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-slate-100 dark:border-zinc-800 rounded-2xl flex flex-col gap-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Status</span>
                <span className={`text-lg font-bold ${submission.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {submission.passed ? 'Passed' : 'Failed'}
                </span>
              </div>

              <div className="p-4 border border-slate-100 dark:border-zinc-800 rounded-2xl flex flex-col gap-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Final Mark</span>
                <span className="text-lg font-bold text-slate-700 dark:text-zinc-300">
                  {submission.score} <span className="text-sm text-slate-400 font-normal">/ {exam.totalMarks} pts</span>
                </span>
              </div>

              <div className="p-4 border border-slate-100 dark:border-zinc-800 rounded-2xl flex flex-col gap-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Duration Taken</span>
                <span className="text-lg font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <FiClock className="text-slate-400" /> {formatDuration(submission.durationTaken)}
                </span>
              </div>

              <div className="p-4 border border-slate-100 dark:border-zinc-800 rounded-2xl flex flex-col gap-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Correct Answers</span>
                <span className="text-lg font-bold text-slate-700 dark:text-zinc-300">
                  {submission.correctAnswersCount} <span className="text-sm text-slate-400 font-normal">/ {totalQuestions} keys</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Question Review Sheets */}
        <div className="flex flex-col gap-4 border-t border-slate-100 dark:border-zinc-800/80 pt-6">
          <h3 className="font-bold text-slate-800 dark:text-zinc-200">Question-by-Question Review</h3>
          
          <div className="flex flex-col gap-4">
            {questionsList.map((q, idx) => {
              const studentAnswer = submission.answers[q.id] || '(No Answer)';
              const correctAnswer = q.correctAnswer;
              const isCorrect = studentAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

              return (
                <div 
                  key={q.id}
                  className={`p-5 rounded-2xl border ${
                    isCorrect 
                      ? 'border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/5' 
                      : 'border-rose-500/20 bg-rose-500/5 dark:bg-rose-950/5'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Question {idx + 1} • {q.questionType}
                    </span>
                    <span className={`p-1.5 rounded-full ${
                      isCorrect ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                    }`}>
                      {isCorrect ? <FiCheck size={14} /> : <FiX size={14} />}
                    </span>
                  </div>

                  <p className="text-sm md:text-base font-semibold text-slate-850 dark:text-zinc-250 mt-2">
                    {q.questionText}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs md:text-sm">
                    <div className="p-3 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-0.5">Your Answer</span>
                      <span className={isCorrect ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-600 dark:text-rose-400 font-bold'}>
                        {studentAnswer}
                      </span>
                    </div>

                    {!isCorrect && (
                      <div className="p-3 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-0.5">Correct Keys</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          {correctAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </Card>
    </div>
  );
};

export default ExamResult;
