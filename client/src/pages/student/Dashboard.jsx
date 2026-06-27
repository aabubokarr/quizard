import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import api from '../../services/api';
import { setBreadcrumbs } from '../../redux/uiSlice';
import { startExamSession } from '../../redux/examSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { StatsSkeleton, ChartSkeleton } from '../../components/common/Skeletons';
import Avatar from '../../components/common/Avatar';
import {
  FiBookOpen,
  FiFileText,
  FiAward,
  FiTrendingUp,
  FiChevronRight,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiInfo
} from 'react-icons/fi';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await api.dashboard.getStudentStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setBreadcrumbs(['Student', 'Dashboard']));
    loadDashboardStats();
  }, [dispatch]);

  const handleStartExamConfirm = (exam) => {
    setSelectedExam(exam);
    setIsConfirmOpen(true);
  };

  const handleStartExam = () => {
    if (selectedExam) {
      // Trigger Redux store initializing the session
      dispatch(startExamSession(selectedExam));
      setIsConfirmOpen(false);
      navigate('/student/exam/taking');
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex flex-col gap-6">
        <StatsSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><ChartSkeleton /></div>
          <div><ChartSkeleton /></div>
        </div>
      </div>
    );
  }

  const { metrics, upcomingExams, completedExams, leaderboard, charts } = stats;

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-brand-600 to-purple-600 p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-[-5%] top-[-20%] w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10 flex flex-col gap-2 max-w-xl">
          <span className="text-xs md:text-sm font-semibold tracking-wider text-brand-100 uppercase">
            Student Dashboard
          </span>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            Welcome back, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-sm md:text-base text-brand-100/90 leading-relaxed">
            Take scheduled exams, track your score logs, and review detailed answer sheets.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <FiBookOpen size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Exams Completed</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-zinc-200">{metrics.examsTaken}</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <FiTrendingUp size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Average Mark</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-zinc-200">{metrics.averageMark}%</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <FiAward size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Highest Score</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-zinc-200">{metrics.highestMark}%</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <FiFileText size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Pending Exams</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-zinc-200">{metrics.upcomingCount}</span>
          </div>
        </Card>
      </div>

      {/* Available Exams & Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Exams */}
        <Card className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="font-bold text-slate-800 dark:text-zinc-200">Available Exams</h3>
          
          {upcomingExams.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center gap-3">
              <FiInfo className="text-slate-300 dark:text-zinc-700" size={32} />
              <p className="text-xs text-slate-400">No new exams assigned. Check back later!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {upcomingExams.map((exam) => (
                <div 
                  key={exam.id} 
                  className="p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-200"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-sm font-bold text-slate-800 dark:text-zinc-200 truncate">{exam.title}</span>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><FiClock size={12} /> {exam.duration} mins</span>
                      <span>{exam.questionsCount} questions</span>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => handleStartExamConfirm(exam)}>
                    Start Exam
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Dynamic SVG Line/Curve performance chart */}
        <Card className="flex flex-col gap-4">
          <h3 className="font-bold text-slate-800 dark:text-zinc-200">Performance Trend</h3>
          
          <div className="h-44 w-full flex items-end justify-between relative pt-6 border-b border-l border-slate-100 dark:border-zinc-800 px-2 mt-4">
            {charts.performanceOverTime.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">No exam metrics logged.</div>
            ) : (
              charts.performanceOverTime.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 group relative">
                  {/* Tooltip */}
                  <div className="absolute bottom-[105%] bg-slate-900 text-white dark:bg-zinc-800 text-[10px] px-1.5 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                    Score: {item.percentage}%
                  </div>
                  
                  {/* Floating Dot Representation */}
                  <div 
                    style={{ bottom: `${item.percentage * 1.2}px` }} 
                    className="w-2.5 h-2.5 rounded-full bg-brand-500 absolute cursor-pointer hover:scale-125 transition-transform" 
                  />
                  
                  {/* Bar connector */}
                  <div 
                    style={{ height: `${item.percentage * 1.2}px` }} 
                    className="w-0.5 bg-brand-500/20" 
                  />
                  
                  <span className="text-[9px] text-slate-400 truncate w-full text-center mt-2">
                    {item.label}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Completed Exam Attempts & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completed Attempts */}
        <Card className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="font-bold text-slate-800 dark:text-zinc-200">Exam History</h3>
          
          {completedExams.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">You have not completed any exams yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 px-4">Exam Title</th>
                    <th className="pb-3 px-4">Grade</th>
                    <th className="pb-3 px-4">Percentage</th>
                    <th className="pb-3 px-4">Result</th>
                    <th className="pb-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-zinc-800/40 text-xs sm:text-sm">
                  {completedExams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-slate-50/40 dark:hover:bg-zinc-800/10">
                      <td className="py-3 px-4 font-semibold text-slate-800 dark:text-zinc-200">{exam.title}</td>
                      <td className="py-3 px-4 font-medium text-slate-500">
                        {exam.score} <span className="text-slate-400">/ {exam.totalMarks}</span>
                      </td>
                      <td className="py-3 px-4 font-bold text-brand-600 dark:text-brand-400">{exam.percentage}%</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          exam.passed 
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400' 
                            : 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400'
                        }`}>
                          {exam.passed ? <FiCheckCircle size={10} /> : <FiXCircle size={10} />}
                          {exam.passed ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs border border-slate-100 dark:border-zinc-800"
                          onClick={() => navigate(`/student/exam/result/${exam.id}`)}
                        >
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Global Standings Leaderboard */}
        <Card className="flex flex-col gap-4">
          <h3 className="font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-2">
            <FiAward className="text-amber-500" /> Leaderboard
          </h3>

          <div className="flex flex-col gap-3">
            {leaderboard.map((student, idx) => (
              <div 
                key={student.id} 
                className={`flex justify-between items-center p-2 rounded-xl border ${
                  student.isSelf 
                    ? 'border-brand-500/20 bg-brand-500/5' 
                    : 'border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xs font-semibold text-slate-400 w-4">#{idx+1}</span>
                  <Avatar name={student.name} image={student.profileImage} size="sm" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200 truncate">{student.name}</span>
                    <span className="text-[10px] text-slate-400 truncate">{student.institution}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{student.average}%</span>
                  <span className="text-[10px] text-slate-400">{student.examsTaken} completed</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Start Exam Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleStartExam}
        title="Ready to Start Exam?"
        message={`You are about to begin "${selectedExam?.title}". Once you begin, the timer of ${selectedExam?.duration} minutes will start counting. Ensure your connection is stable.`}
        confirmText="Yes, Start Test"
        variant="primary"
      />
    </div>
  );
};

export default StudentDashboard;
