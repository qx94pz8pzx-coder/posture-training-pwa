import type { Dispatch, SetStateAction } from 'react';
import { habits } from '../data/habits';
import { shortDayLabels, weeklyGoals } from '../data/schedule';
import type { CheckRecords, EightWeekCheckins, ProgramSettings } from '../types';
import { addDays, formatDateCN, getProgramWeek, habitCheckKey, startOfWeekKey } from '../utils/dateUtils';

interface CheckinPageProps {
  checkins: EightWeekCheckins;
  setCheckins: Dispatch<SetStateAction<EightWeekCheckins>>;
  checkRecords: CheckRecords;
  setCheckRecords: Dispatch<SetStateAction<CheckRecords>>;
  settings: ProgramSettings;
  setSettings: Dispatch<SetStateAction<ProgramSettings>>;
  todayKey: string;
}

export function CheckinPage({ checkins, setCheckins, checkRecords, setCheckRecords, settings, setSettings, todayKey }: CheckinPageProps) {
  const currentWeek = getProgramWeek(settings.startDate, todayKey);
  const todayHabitDone = habits.filter((habit) => checkRecords[habitCheckKey(todayKey, habit.id)]).length;

  function toggleDay(week: number, day: number) {
    const key = `week_${week}_day_${day}`;
    setCheckins((current) => ({ ...current, [key]: !current[key] }));
  }

  function weekCount(week: number) {
    return shortDayLabels.filter((_, index) => checkins[`week_${week}_day_${index}`]).length;
  }

  function weekHabitDays(week: number) {
    return shortDayLabels.filter((_, index) => {
      const date = addDays(settings.startDate, (week - 1) * 7 + index);
      return habits.some((habit) => checkRecords[habitCheckKey(date, habit.id)]);
    }).length;
  }

  function toggleHabit(id: string) {
    const key = habitCheckKey(todayKey, id);
    setCheckRecords((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <div className="tab-panel">
      <section className="plain-header">
        <p className="eyebrow">打卡</p>
        <h2>8周训练与习惯记录</h2>
        <p>这里专注记录，不放长动作说明。今天做了什么，就给今天打卡。</p>
      </section>

      <section className="settings-card">
        <label>
          计划第1周周一
          <input
            type="date"
            value={settings.startDate}
            onChange={(event) => setSettings({ startDate: startOfWeekKey(event.target.value || todayKey) })}
          />
        </label>
        <p>当前是第 {currentWeek} 周</p>
      </section>

      <section className="goal-card">
        <h3>每周目标</h3>
        <div className="goal-grid">
          {weeklyGoals.map((goal) => (
            <span key={goal}>{goal}</span>
          ))}
        </div>
      </section>

      <div className="week-list">
        {Array.from({ length: 8 }, (_, weekIndex) => {
          const week = weekIndex + 1;
          const count = weekCount(week);
          const habitDays = weekHabitDays(week);
          const reached = count >= 5 && habitDays >= 5;
          return (
            <section key={week} className={`week-card ${week === currentWeek ? 'current' : ''}`}>
              <div className="week-head">
                <div>
                  <p className="eyebrow">第 {week} 周</p>
                  <h3>训练 {count}/7 天 · 习惯 {habitDays}/7 天</h3>
                </div>
                <span className={`current-badge ${reached ? 'ok' : ''}`}>{reached ? '目标稳定' : week === currentWeek ? '本周' : '记录中'}</span>
              </div>
              <div className="day-grid">
                {shortDayLabels.map((label, dayIndex) => {
                  const dateLabel = formatDateCN(addDays(settings.startDate, weekIndex * 7 + dayIndex));
                  const key = `week_${week}_day_${dayIndex}`;
                  return (
                    <button type="button" key={label} className={checkins[key] ? 'done' : ''} onClick={() => toggleDay(week, dayIndex)}>
                      <strong>{label}</strong>
                      <span>{dateLabel}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <section className="form-card">
        <div className="section-title inline">
          <h3>今日习惯打卡</h3>
          <span>{todayHabitDone}/{habits.length}</span>
        </div>
        <div className="check-list">
          {habits.map((habit) => {
            const key = habitCheckKey(todayKey, habit.id);
            return (
              <button type="button" key={habit.id} className={checkRecords[key] ? 'done' : ''} onClick={() => toggleHabit(habit.id)}>
                {habit.checklistLabel}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
