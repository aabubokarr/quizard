import React from 'react';

export const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col gap-3 animate-pulse shadow-sm">
        <div className="flex justify-between items-center">
          <div className="h-4 w-24 bg-slate-200 dark:bg-zinc-800 rounded"></div>
          <div className="h-8 w-8 bg-slate-200 dark:bg-zinc-800 rounded-lg"></div>
        </div>
        <div className="h-8 w-16 bg-slate-200 dark:bg-zinc-800 rounded"></div>
        <div className="h-3 w-32 bg-slate-100 dark:bg-zinc-800/50 rounded"></div>
      </div>
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="w-full border border-slate-100 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <div className="h-6 w-36 bg-slate-200 dark:bg-zinc-800 rounded animate-pulse"></div>
      <div className="h-9 w-24 bg-slate-200 dark:bg-zinc-800 rounded-xl animate-pulse"></div>
    </div>
    <div className="flex flex-col gap-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50 dark:border-zinc-800 last:border-0 animate-pulse">
          <div className="flex items-center gap-3 w-1/3">
            <div className="h-10 w-10 bg-slate-200 dark:bg-zinc-800 rounded-xl"></div>
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 w-3/4 bg-slate-200 dark:bg-zinc-800 rounded"></div>
              <div className="h-3 w-1/2 bg-slate-100 dark:bg-zinc-800/50 rounded"></div>
            </div>
          </div>
          <div className="h-4 w-24 bg-slate-200 dark:bg-zinc-800 rounded"></div>
          <div className="h-4 w-16 bg-slate-200 dark:bg-zinc-800 rounded"></div>
          <div className="h-6 w-12 bg-slate-200 dark:bg-zinc-800 rounded-full"></div>
        </div>
      ))}
    </div>
  </div>
);

export const QuestionSkeleton = () => (
  <div className="flex flex-col gap-6">
    {[1, 2].map((i) => (
      <div key={i} className="rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col gap-4 animate-pulse shadow-sm">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-2 w-3/4">
            <div className="h-4 w-16 bg-slate-200 dark:bg-zinc-800 rounded-full"></div>
            <div className="h-6 w-full bg-slate-200 dark:bg-zinc-800 rounded mt-1"></div>
            <div className="h-6 w-1/2 bg-slate-200 dark:bg-zinc-800 rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-slate-200 dark:bg-zinc-800 rounded-lg"></div>
            <div className="h-8 w-8 bg-slate-200 dark:bg-zinc-800 rounded-lg"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="h-12 bg-slate-100 dark:bg-zinc-800/50 rounded-xl"></div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const ChartSkeleton = () => (
  <div className="rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col gap-4 animate-pulse shadow-sm h-80 justify-between">
    <div className="h-4 w-40 bg-slate-200 dark:bg-zinc-800 rounded"></div>
    <div className="flex items-end justify-between px-4 h-48">
      {[40, 75, 50, 90, 60, 85, 30, 70].map((h, i) => (
        <div
          key={i}
          style={{ height: `${h}%` }}
          className="w-8 bg-slate-100 dark:bg-zinc-800/50 rounded-t"
        ></div>
      ))}
    </div>
    <div className="h-3 w-full bg-slate-100 dark:bg-zinc-800/50 rounded"></div>
  </div>
);
