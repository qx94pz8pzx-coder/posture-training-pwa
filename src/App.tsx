import { useEffect, useMemo, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { getPlanByPeriod } from './data/schedule';
import { defaultPeriodRecord } from './data/period';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { CheckinPage } from './pages/CheckinPage';
import { HabitsPage } from './pages/HabitsPage';
import { LibraryPage } from './pages/LibraryPage';
import { ReviewPage } from './pages/ReviewPage';
import { TodayPage } from './pages/TodayPage';
import type { CheckRecords, CustomLinks, EightWeekCheckins, PeriodRecord, ProgramSettings, TabId, WeeklyReview } from './types';
import { getPeriodStatus, startOfWeekKey, toDateKey } from './utils/dateUtils';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('today');
  const [todayKey, setTodayKey] = useState(() => toDateKey());
  const [checkRecords, setCheckRecords] = useLocalStorageState<CheckRecords>('posture.checkRecords', {});
  const [customLinks, setCustomLinks] = useLocalStorageState<CustomLinks>('posture.customLinks', {});
  const [eightWeekCheckins, setEightWeekCheckins] = useLocalStorageState<EightWeekCheckins>('posture.eightWeekCheckins', {});
  const [programSettings, setProgramSettings] = useLocalStorageState<ProgramSettings>('posture.programSettings', {
    startDate: startOfWeekKey(todayKey),
  });
  const [periodRecord, setPeriodRecord] = useLocalStorageState<PeriodRecord>('posture.periodRecord', defaultPeriodRecord);
  const [weeklyReviews, setWeeklyReviews] = useLocalStorageState<Record<string, WeeklyReview>>('posture.weeklyReviews', {});

  useEffect(() => {
    const timer = window.setInterval(() => {
      const current = toDateKey();
      setTodayKey((previous) => (previous === current ? previous : current));
    }, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const normalizedStart = startOfWeekKey(programSettings.startDate || todayKey);
    if (programSettings.startDate !== normalizedStart) {
      setProgramSettings({ startDate: normalizedStart });
    }
  }, [programSettings.startDate, setProgramSettings, todayKey]);

  const periodStatus = useMemo(() => getPeriodStatus(periodRecord, todayKey), [periodRecord, todayKey]);
  const todayPlan = useMemo(() => getPlanByPeriod(todayKey, periodStatus), [todayKey, periodStatus]);

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">女性体态训练 + 上镜状态</p>
          <h1>体态训练打卡</h1>
        </div>
        <span className={`mode-pill ${periodStatus.mode}`}>{periodStatus.mode === 'normal' ? '普通计划' : periodStatus.suggestion}</span>
      </header>

      <main>
        {activeTab === 'today' && (
          <TodayPage
            dateKey={todayKey}
            setDateKey={setTodayKey}
            plan={todayPlan}
            periodStatus={periodStatus}
            checkRecords={checkRecords}
            setCheckRecords={setCheckRecords}
            customLinks={customLinks}
          />
        )}
        {activeTab === 'actions' && (
          <LibraryPage
            dateKey={todayKey}
            todayPlan={todayPlan}
            checkRecords={checkRecords}
            setCheckRecords={setCheckRecords}
            customLinks={customLinks}
            setCustomLinks={setCustomLinks}
          />
        )}
        {activeTab === 'habits' && <HabitsPage dateKey={todayKey} checkRecords={checkRecords} setCheckRecords={setCheckRecords} />}
        {activeTab === 'checkin' && (
          <CheckinPage
            checkins={eightWeekCheckins}
            setCheckins={setEightWeekCheckins}
            checkRecords={checkRecords}
            setCheckRecords={setCheckRecords}
            settings={programSettings}
            setSettings={setProgramSettings}
            todayKey={todayKey}
          />
        )}
        {activeTab === 'review' && (
          <ReviewPage
            reviews={weeklyReviews}
            setReviews={setWeeklyReviews}
            checkins={eightWeekCheckins}
            settings={programSettings}
            todayKey={todayKey}
            periodRecord={periodRecord}
            setPeriodRecord={setPeriodRecord}
            periodStatus={periodStatus}
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
