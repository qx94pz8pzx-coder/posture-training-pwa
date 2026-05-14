import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { ExerciseCard } from '../components/ExerciseCard';
import { exerciseById, visibleExercises } from '../data/exercises';
import { exerciseLibraryCategories, type CheckRecords, type CustomLinks, type ExerciseLibraryCategory, type TodayPlan } from '../types';
import { exerciseCheckKey } from '../utils/dateUtils';

interface LibraryPageProps {
  dateKey: string;
  todayPlan: TodayPlan;
  checkRecords: CheckRecords;
  setCheckRecords: Dispatch<SetStateAction<CheckRecords>>;
  customLinks: CustomLinks;
  setCustomLinks: Dispatch<SetStateAction<CustomLinks>>;
}

export function LibraryPage({ dateKey, todayPlan, checkRecords, setCheckRecords, customLinks, setCustomLinks }: LibraryPageProps) {
  const [openCategory, setOpenCategory] = useState<ExerciseLibraryCategory>('今日必做');
  const todayExercises = useMemo(
    () =>
      todayPlan.exerciseIds.flatMap((id) => {
        const exercise = exerciseById[id];
        return exercise ? [exercise] : [];
      }),
    [todayPlan.exerciseIds],
  );

  function exercisesFor(category: ExerciseLibraryCategory) {
    if (category === '今日必做') return todayExercises;
    return visibleExercises.filter((exercise) => exercise.category === category);
  }

  function updateCustomLink(id: string, url: string) {
    setCustomLinks((current) => ({
      ...current,
      [id]: url,
    }));
  }

  function toggleExercise(id: string) {
    const key = exerciseCheckKey(dateKey, id);
    setCheckRecords((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <div className="tab-panel">
      <section className="plain-header">
        <p className="eyebrow">动作</p>
        <h2>动作库</h2>
        <p>默认只展开今日必做。没有核验过的具体视频不乱放链接，先提供中文 B站搜索关键词和自定义替换入口。</p>
      </section>

      <div className="accordion-list">
        {exerciseLibraryCategories.map((category) => {
          const exercises = exercisesFor(category);
          const isOpen = openCategory === category;
          return (
            <section key={category} className="accordion-section">
              <button type="button" className="accordion-trigger" onClick={() => setOpenCategory(isOpen ? '今日必做' : category)}>
                <span>{category}</span>
                <strong>{exercises.length}</strong>
              </button>
              {isOpen && (
                <div className="exercise-list compact-list">
                  {exercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      completed={checkRecords[exerciseCheckKey(dateKey, exercise.id)] ?? false}
                      customUrl={customLinks[exercise.id] ?? ''}
                      onCustomUrlChange={(url) => updateCustomLink(exercise.id, url)}
                      onToggleComplete={() => toggleExercise(exercise.id)}
                      libraryMode
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
