import type { CSSProperties, Dispatch, SetStateAction } from 'react';
import { ExerciseCard } from '../components/ExerciseCard';
import { HabitCard } from '../components/HabitCard';
import { SafetyNote } from '../components/SafetyNote';
import { exerciseById } from '../data/exercises';
import { habits } from '../data/habits';
import { weekdayLabels } from '../data/schedule';
import type { CheckRecords, CustomLinks, PeriodStatus, TodayPlan } from '../types';
import { dateFromKey, deterministicIndexes, exerciseCheckKey, formatDateCN, habitCheckKey, toDateKey } from '../utils/dateUtils';

interface TodayPageProps {
  dateKey: string;
  setDateKey: Dispatch<SetStateAction<string>>;
  plan: TodayPlan;
  periodStatus: PeriodStatus;
  checkRecords: CheckRecords;
  setCheckRecords: Dispatch<SetStateAction<CheckRecords>>;
  customLinks: CustomLinks;
}

export function TodayPage({ dateKey, setDateKey, plan, periodStatus, checkRecords, setCheckRecords, customLinks }: TodayPageProps) {
  const weekday = weekdayLabels[dateFromKey(dateKey).getDay()];
  const planExercises = plan.exerciseIds.flatMap((id) => {
    const exercise = exerciseById[id];
    return exercise ? [exercise] : [];
  });
  const todayHabitIndexes = deterministicIndexes(dateKey, habits.length, 1, 3);
  const todayHabits = todayHabitIndexes.map((index) => habits[index]);
  const doneExerciseCount = planExercises.filter((exercise) => checkRecords[exerciseCheckKey(dateKey, exercise.id)]).length;
  const doneHabitCount = habits.filter((habit) => checkRecords[habitCheckKey(dateKey, habit.id)]).length;
  const totalCount = planExercises.length + habits.length;
  const progress = totalCount === 0 ? 0 : Math.round(((doneExerciseCount + doneHabitCount) / totalCount) * 100);

  function toggleKey(key: string) {
    setCheckRecords((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  return (
    <div className="tab-panel">
      <section className="today-status-card">
        <div className="status-topline">
          <p className="eyebrow">
            {formatDateCN(dateKey)} · {weekday}
          </p>
          <button type="button" className="tiny-button" onClick={() => setDateKey(toDateKey())}>
            刷新为今天任务
          </button>
        </div>
        <h2>{plan.title}</h2>
        <div className="status-meta">
          <span>{plan.trainingType}</span>
          <strong>{plan.estimatedTime}</strong>
        </div>
        <p className="focus-copy">{plan.focus}</p>
        <div className={`period-inline ${periodStatus.mode}`}>
          <span>今日状态：{periodStatus.label}</span>
          <strong>建议模式：{periodStatus.suggestion}</strong>
        </div>
        {(periodStatus.avoid.length > 0 || plan.avoid.length > 0) && (
          <div className="status-list">
            <h3>今日避免</h3>
            <p>{(periodStatus.avoid.length ? periodStatus.avoid : plan.avoid).join('、')}</p>
          </div>
        )}
        <div className="status-list">
          <h3>今日建议</h3>
          <p>{(periodStatus.advice.length ? periodStatus.advice : plan.advice).join('、')}</p>
        </div>
      </section>

      <section className="progress-card">
        <div>
          <p className="eyebrow">今日完成进度</p>
          <h3>{progress}%</h3>
          <p>
            动作 {doneExerciseCount}/{planExercises.length} · 习惯 {doneHabitCount}/{habits.length}
          </p>
        </div>
        <div className="progress-ring" style={{ '--progress': `${progress}%` } as CSSProperties}>
          {progress}%
        </div>
      </section>

      {plan.note && <p className="soft-note">{plan.note}</p>}

      <div className="section-title">
        <h3>今日训练任务</h3>
        <span>按日期单独保存</span>
      </div>
      <div className="exercise-list">
        {planExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            completed={checkRecords[exerciseCheckKey(dateKey, exercise.id)] ?? false}
            customUrl={customLinks[exercise.id]}
            onToggleComplete={() => toggleKey(exerciseCheckKey(dateKey, exercise.id))}
          />
        ))}
      </div>

      <div className="section-title">
        <h3>今日体态小提醒</h3>
        <span>每天 1-3 条</span>
      </div>
      <div className="habit-reminder-grid">
        {todayHabits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            compact
            completed={checkRecords[habitCheckKey(dateKey, habit.id)] ?? false}
            onToggle={() => toggleKey(habitCheckKey(dateKey, habit.id))}
          />
        ))}
      </div>

      <SafetyNote />
    </div>
  );
}
