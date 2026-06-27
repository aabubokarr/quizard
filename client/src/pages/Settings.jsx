import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/uiSlice';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import {
  FiSun,
  FiMoon,
  FiBell,
  FiShield,
  FiCheckCircle,
  FiGlobe
} from 'react-icons/fi';

const Settings = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  
  // Notification switches
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [examReminders, setExamReminders] = useState(true);
  const [browserNotice, setBrowserNotice] = useState(false);

  // Security switches
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionLock, setSessionLock] = useState(true);

  const handleSaveSettings = () => {
    toast.success('Settings preferences saved successfully!');
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold dark:text-zinc-100">Workspace Settings</h1>
        <p className="text-sm text-slate-400">Configure theme aesthetics, alerts, and account safety toggles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Visual Theme */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <Card className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-widest flex items-center gap-2">
              {theme === 'dark' ? <FiMoon /> : <FiSun />} Styling Theme
            </h3>
            <p className="text-xs text-slate-400">Select standard light mode or a premium SaaS dark mode dashboard theme.</p>
            
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                onClick={() => theme === 'dark' && dispatch(toggleTheme())}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  theme === 'light'
                    ? 'border-brand-500 bg-brand-500/5 text-brand-600 font-bold'
                    : 'border-slate-100 dark:border-zinc-800 text-slate-400'
                }`}
              >
                <FiSun size={20} />
                <span className="text-xs">Light Mode</span>
              </button>

              <button
                onClick={() => theme === 'light' && dispatch(toggleTheme())}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'border-brand-500 bg-brand-500/5 text-brand-400 font-bold'
                    : 'border-slate-100 dark:border-zinc-800 text-slate-400'
                }`}
              >
                <FiMoon size={20} />
                <span className="text-xs">Dark Mode</span>
              </button>
            </div>
          </Card>

          <Card className="flex flex-col gap-3 p-4 bg-brand-500/5 border border-brand-500/10 text-xs text-slate-500 dark:text-zinc-400">
            <span className="font-bold text-slate-700 dark:text-zinc-300">System Info:</span>
            <span>Version: Quizard v2.4.0</span>
            <span>Locale: en-US (UTC)</span>
            <span>Status: Connected to MockDB</span>
          </Card>
        </div>

        {/* Right Columns: Notifications and Security */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Notifications Card */}
          <Card className="flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-slate-50 dark:border-zinc-800/40 pb-3">
              <FiBell className="text-brand-500" />
              <h3 className="font-bold text-slate-800 dark:text-zinc-200">Alerts & Notifications</h3>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex items-start justify-between cursor-pointer select-none">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Email Notifications</span>
                  <span className="text-xs text-slate-400">Receive exam schedules and test reminders in your inbox.</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-350 dark:border-zinc-800 text-brand-600 focus:ring-brand-500/20 mt-1 cursor-pointer"
                />
              </label>

              <label className="flex items-start justify-between cursor-pointer select-none border-t border-slate-50 dark:border-zinc-800/20 pt-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Exam Results Publish</span>
                  <span className="text-xs text-slate-400">Get notified immediately once exam responses are graded.</span>
                </div>
                <input
                  type="checkbox"
                  checked={examReminders}
                  onChange={(e) => setExamReminders(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-350 dark:border-zinc-800 text-brand-600 focus:ring-brand-500/20 mt-1 cursor-pointer"
                />
              </label>

              <label className="flex items-start justify-between cursor-pointer select-none border-t border-slate-50 dark:border-zinc-800/20 pt-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Browser Sound Alerts</span>
                  <span className="text-xs text-slate-400">Trigger warnings during tests if countdown is under 2 minutes.</span>
                </div>
                <input
                  type="checkbox"
                  checked={browserNotice}
                  onChange={(e) => setBrowserNotice(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-350 dark:border-zinc-800 text-brand-600 focus:ring-brand-500/20 mt-1 cursor-pointer"
                />
              </label>
            </div>
          </Card>

          {/* Security Rules Card */}
          <Card className="flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-slate-50 dark:border-zinc-800/40 pb-3">
              <FiShield className="text-indigo-500" />
              <h3 className="font-bold text-slate-800 dark:text-zinc-200">Session and Security</h3>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex items-start justify-between cursor-pointer select-none">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Two-Factor Authentication</span>
                  <span className="text-xs text-slate-400">Require email codes on new browser session login.</span>
                </div>
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-350 dark:border-zinc-800 text-brand-600 focus:ring-brand-500/20 mt-1 cursor-pointer"
                />
              </label>

              <label className="flex items-start justify-between cursor-pointer select-none border-t border-slate-50 dark:border-zinc-800/20 pt-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Autosave Local Backup</span>
                  <span className="text-xs text-slate-400">Autosave answers inside browser cache storage to prevent packet dropouts.</span>
                </div>
                <input
                  type="checkbox"
                  checked={sessionLock}
                  onChange={(e) => setSessionLock(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-350 dark:border-zinc-800 text-brand-600 focus:ring-brand-500/20 mt-1 cursor-pointer"
                />
              </label>
            </div>

            <div className="flex justify-end border-t border-slate-100 dark:border-zinc-800/80 pt-4">
              <Button onClick={handleSaveSettings}>
                Save Settings
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Settings;
