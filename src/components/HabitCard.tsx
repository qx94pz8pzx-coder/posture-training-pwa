import type { Habit } from '../types';
import { HabitIllustration } from './HabitIllustration';

interface HabitCardProps {
  habit: Habit;
  completed?: boolean;
  onToggle?: () => void;
  compact?: boolean;
}

export function HabitCard({ habit, completed = false, onToggle, compact = false }: HabitCardProps) {
  return (
    <article className={`habit-card ${completed ? 'is-done' : ''} ${compact ? 'compact' : ''}`}>
      <div className="habit-head">
        <div>
          <p className="eyebrow">生活场景简笔画提醒卡</p>
          <h3>{habit.title}</h3>
        </div>
        <HabitIllustration type={habit.illustrationType} compact />
      </div>
      <div className="chips">
        {habit.targetProblems.map((problem) => (
          <span key={problem}>{problem}</span>
        ))}
      </div>
      {!compact && (
        <div className="habit-copy">
          <section>
            <h4>今天这样做</h4>
            <p>{habit.doThis}</p>
          </section>
          <section>
            <h4>不要这样做</h4>
            <p>{habit.avoidThis}</p>
          </section>
        </div>
      )}
      {compact && <p className="habit-reminder">{habit.reminder}</p>}
      {onToggle && (
        <button type="button" className={`check-button ${completed ? 'checked' : ''}`} onClick={onToggle} aria-pressed={completed}>
          {completed ? '今天做到了' : '今日打卡'}
        </button>
      )}
    </article>
  );
}
