import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import api from '../../services/api';
import { setBreadcrumbs } from '../../redux/uiSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { TableSkeleton } from '../../components/common/Skeletons';
import { FiArrowLeft, FiCheck, FiX, FiSearch, FiPrinter } from 'react-icons/fi';

const ExamResults = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(setBreadcrumbs(['Teacher', 'Exams', 'Results']));
    
    const loadResults = async () => {
      try {
        setLoading(true);
        const res = await api.exams.getParticipants(examId);
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [examId, dispatch]);

  if (loading || !data) {
    return <TableSkeleton rows={5} />;
  }

  const { exam, participants } = data;

  const filteredParticipants = participants.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header and Back Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/teacher/exams')}
            className="border border-slate-100 dark:border-zinc-800"
          >
            <FiArrowLeft size={16} /> Back
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold dark:text-zinc-100">{exam.title}</h1>
            <p className="text-xs text-slate-400">Class Performance & Submission Roster ({exam.totalMarks} pts maximum)</p>
          </div>
        </div>
      </div>

      {/* Stats Summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-5 flex flex-col gap-1">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Submissions</span>
          <span className="text-3xl font-extrabold text-slate-800 dark:text-zinc-200">{participants.length}</span>
        </Card>
        <Card className="p-5 flex flex-col gap-1">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Average Grade</span>
          <span className="text-3xl font-extrabold text-brand-600 dark:text-brand-400">
            {participants.length > 0 
              ? Math.round(participants.reduce((acc, curr) => acc + curr.percentage, 0) / participants.length)
              : 0}%
          </span>
        </Card>
        <Card className="p-5 flex flex-col gap-1">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Passing Rate</span>
          <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {participants.length > 0
              ? Math.round((participants.filter(p => p.passed).length / participants.length) * 100)
              : 0}%
          </span>
        </Card>
      </div>

      {/* Filter and Roster list */}
      <Card className="p-0 overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-50 dark:border-zinc-800/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800 dark:text-zinc-200 self-start sm:self-center">Participating Students</h3>
          
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search student by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-zinc-850 border-0 rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm focus:ring-2 focus:ring-brand-500/20 focus:outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {filteredParticipants.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">No student submissions match this criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800/80 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Student Name</th>
                  <th className="py-4 px-4">Institution</th>
                  <th className="py-4 px-4">Score</th>
                  <th className="py-4 px-4">Percentage</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Completed At</th>
                  <th className="py-4 px-6 text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-800/40 text-xs sm:text-sm">
                {filteredParticipants.map((p) => (
                  <tr key={p.submissionId} className="hover:bg-slate-50/40 dark:hover:bg-zinc-800/10">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 dark:text-zinc-200">{p.name}</span>
                        <span className="text-[10px] text-slate-400">{p.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500">{p.institution}</td>
                    <td className="py-4 px-4 font-bold text-slate-700 dark:text-zinc-300">
                      {p.score} <span className="text-xs text-slate-400 font-normal">/ {exam.totalMarks}</span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-brand-600 dark:text-brand-400">{p.percentage}%</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.passed 
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400' 
                          : 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400'
                      }`}>
                        {p.passed ? <FiCheck /> : <FiX />}
                        {p.passed ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-xs">
                      {new Date(p.completedAt).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs border border-slate-100 dark:border-zinc-800"
                        onClick={() => navigate(`/student/exam/result/${p.submissionId}?viewMode=teacher`)}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ExamResults;
