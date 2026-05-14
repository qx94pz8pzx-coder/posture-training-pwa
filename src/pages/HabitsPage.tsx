import type { Dispatch, SetStateAction } from 'react';
import { HabitCard } from '../components/HabitCard';
import { habits } from '../data/habits';
import type { CheckRecords } from '../types';
import { habitCheckKey } from '../utils/dateUtils';

interface HabitsPageProps {
  dateKey: string;
  checkRecords: CheckRecords;
  setCheckRecords: Dispatch<SetStateAction<CheckRecords>>;
}

export function HabitsPage({ dateKey, checkRecords, setCheckRecords }: HabitsPageProps) {
  function toggleHabit(id: string) {
    const key = habitCheckKey(dateKey, id);
    setCheckRecords((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <div className="tab-panel">
      <section className="plain-header">
        <p className="eyebrow">习惯</p>
        <h2>日常体态调整</h2>
        <p>训练是一部分，刷手机、坐姿、站姿和吃饭也会影响肩颈、骨盆、腿线和上镜状态。</p>
      </section>

      <div className="habit-list">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            completed={checkRecords[habitCheckKey(dateKey, habit.id)] ?? false}
            onToggle={() => toggleHabit(habit.id)}
          />
        ))}
      </div>
    </div>
  );
}
