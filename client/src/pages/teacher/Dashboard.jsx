import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import api from '../../services/api';
import { setBreadcrumbs } from '../../redux/uiSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { StatsSkeleton, ChartSkeleton } from '../../components/common/Skeletons';
import Avatar from '../../components/common/Avatar';
import {
  FiBookOpen,
  FiFileText,
  FiUsers,
  FiTrendingUp,
  FiPlus,
  FiArrowRight,
  FiCheckCircle,
  FiAward
} from 'react-icons/fi';

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setBreadcrumbs(['Teacher', 'Dashboard']));
    
    const loadDashboardStats = async () => {
      try {
        setLoading(true);
        const data = await api.dashboard.getTeacherStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardStats();
  }, [dispatch]);

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

  const { metrics, recentExams, recentQuestions, leaderboard, charts } = stats;

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-[-5%] top-[-20%] w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10 flex flex-col gap-2 max-w-xl">
          <span className="text-xs md:text-sm font-semibold tracking-wider text-brand-100 uppercase">
            Instructor Console
          </span>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            Hello, Prof. Jenkins
          </h1>
          <p className="text-sm md:text-base text-brand-100/90 leading-relaxed">
            Configure automated tests, update questions, and track grades for your classrooms live.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <FiBookOpen size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Questions</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-zinc-200">{metrics.totalQuestions}</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <FiFileText size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Exams</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
              {metrics.publishedExams} <span className="text-xs text-slate-400 font-normal">/ {metrics.totalExams} total</span>
            </span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <FiUsers size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Enrolled Students</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-zinc-200">{metrics.totalStudents}</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <FiTrendingUp size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Class Average</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-zinc-200">{metrics.avgScore}%</span>
          </div>
        </Card>
      </div>

      {/* Quick Actions & Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart Card */}
        <Card className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-zinc-200">Class Averages by Exam</h3>
            <span className="text-xs text-slate-400">Live submission records</span>
          </div>
          
          {/* Animated SVG Bar/Line Chart */}
          <div className="h-64 w-full flex items-end justify-between relative pt-6 border-b border-l border-slate-100 dark:border-zinc-800 px-4">
            {charts.examPerformance.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">No exams taken yet.</div>
            ) : (
              charts.examPerformance.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 group relative">
                  {/* Tooltip */}
                  <div className="absolute bottom-[105%] bg-slate-900 text-white dark:bg-zinc-800 text-[10px] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                    Avg: {item.average}% ({item.submissions} takes)
                  </div>
                  
                  {/* Bar */}
                  <div 
                    style={{ height: `${item.average * 1.8}px` }}
                    className="w-8 sm:w-12 bg-gradient-to-t from-brand-600 to-indigo-500 rounded-t-lg transition-all duration-500 hover:from-brand-500 hover:to-indigo-400 cursor-pointer"
                  />
                  
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 mt-2 text-center w-full truncate px-1">
                    {item.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Quick Actions Card */}
        <Card className="flex flex-col justify-between gap-4">
          <h3 className="font-bold text-slate-800 dark:text-zinc-200">Instructor Tasks</h3>
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full text-left justify-start"
              icon={FiPlus}
              onClick={() => navigate('/teacher/questions')}
            >
              Create Question
            </Button>
            <Button
              variant="secondary"
              className="w-full text-left justify-start"
              icon={FiPlus}
              onClick={() => navigate('/teacher/exams')}
            >
              Create Exam
            </Button>
            <Button
              variant="ghost"
              className="w-full text-left justify-start border border-slate-100 dark:border-zinc-800"
              icon={FiBookOpen}
              onClick={() => navigate('/teacher/questions')}
            >
              Manage Questions
            </Button>
            <Button
              variant="ghost"
              className="w-full text-left justify-start border border-slate-100 dark:border-zinc-800"
              icon={FiFileText}
              onClick={() => navigate('/teacher/exams')}
            >
              Manage Exams
            </Button>
          </div>
          
          <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl text-xs text-indigo-600 dark:text-indigo-400">
            Tip: Register questions in the Question Bank first, then select them to bundle into online exams.
          </div>
        </Card>
      </div>

      {/* Recent Exams & Class Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Exams List */}
        <Card className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-50 dark:border-zinc-800/40 pb-3">
            <h3 className="font-bold text-slate-800 dark:text-zinc-200">Recent Exam Campaigns</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/exams')} className="text-xs">
              All Exams <FiArrowRight size={12} />
            </Button>
          </div>

          <div className="flex flex-col divide-y divide-slate-50 dark:divide-zinc-800/40">
            {recentExams.map((exam) => (
              <div key={exam.id} className="py-3 flex justify-between items-center first:pt-0 last:pb-0 gap-4">
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200 truncate">{exam.title}</span>
                  <span className="text-xs text-slate-400">{exam.questionsCount} questions • {exam.duration} mins</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    exam.published 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {exam.published ? 'Published' : 'Draft'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs border border-slate-100 dark:border-zinc-800"
                    disabled={exam.submissionsCount === 0}
                    onClick={() => navigate(`/teacher/exams/results/${exam.id}`)}
                  >
                    Results ({exam.submissionsCount})
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Performing Students */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-slate-50 dark:border-zinc-800/40 pb-3">
            <FiAward className="text-amber-500" />
            <h3 className="font-bold text-slate-800 dark:text-zinc-200">Top Students</h3>
          </div>

          <div className="flex flex-col gap-3">
            {leaderboard.length === 0 ? (
              <div className="text-center text-slate-400 text-xs py-6">No scores logged yet.</div>
            ) : (
              leaderboard.map((student, idx) => (
                <div key={student.id} className="flex justify-between items-center">
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
                    <span className="text-[10px] text-slate-400">{student.examsTaken} tests</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
