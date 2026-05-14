import { useEffect, useRef, useState } from 'react';
import type { Exercise } from '../types';
import { MotionGuide } from './MotionGuide';

interface ExerciseCardProps {
  exercise: Exercise;
  completed?: boolean;
  customUrl?: string;
  onToggleComplete?: () => void;
  onCustomUrlChange?: (url: string) => void;
  libraryMode?: boolean;
}

function biliSearchUrl(keyword: string) {
  const clean = keyword.replace(/^B站\s*/, '');
  return `https://search.bilibili.com/all?keyword=${encodeURIComponent(clean)}`;
}

function openExternal(url: string) {
  if (!url.trim()) return;
  window.open(url.trim(), '_blank', 'noopener,noreferrer');
}

function useCardInView() {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '160px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);

  return { ref, inView };
}

export function ExerciseCard({
  exercise,
  completed = false,
  customUrl = '',
  onToggleComplete,
  onCustomUrlChange,
  libraryMode = false,
}: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useCardInView();
  const followUrl = customUrl.trim() || exercise.customVideoUrl.trim() || exercise.primaryVideoUrl || exercise.backupVideoUrl || biliSearchUrl(exercise.searchKeyword);
  const shouldRenderMotion = inView || expanded || !libraryMode;

  return (
    <article ref={ref} className={`exercise-card ${completed ? 'is-done' : ''}`}>
      <div className="exercise-head">
        <div>
          <p className="eyebrow">{exercise.category}</p>
          <h3>{exercise.name}</h3>
          <p className="duration">{exercise.duration}</p>
        </div>
        {shouldRenderMotion ? (
          <MotionGuide type={exercise.motionType} labels={exercise.motionLabels} compact />
        ) : (
          <div className="motion-placeholder">线稿</div>
        )}
      </div>

      <div className="chips" aria-label="针对问题">
        {exercise.targetProblems.slice(0, libraryMode && !expanded ? 3 : undefined).map((problem) => (
          <span key={problem}>{problem}</span>
        ))}
      </div>

      {expanded && (
        <div className="expanded-motion">
          <MotionGuide type={exercise.motionType} labels={exercise.motionLabels} />
        </div>
      )}

      {expanded && (
        <div className="card-grid">
          <section>
            <h4>动作要点</h4>
            <ul>
              {exercise.cues.map((cue) => (
                <li key={cue}>{cue}</li>
              ))}
            </ul>
          </section>
          <section>
            <h4>常见错误</h4>
            <ul>
              {exercise.mistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </section>
          <section className="why-card">
            <h4>为什么做</h4>
            <p>{exercise.why}</p>
          </section>
        </div>
      )}

      {libraryMode && expanded && (
        <div className="library-controls">
          <label>
            用户自定义替换链接
            <input
              type="url"
              value={customUrl}
              onChange={(event) => onCustomUrlChange?.(event.target.value)}
              placeholder="粘贴 B站 / Keep / 小红书 / 抖音链接"
            />
          </label>
          <div className="video-note">
            <strong>视频说明</strong>
            <span>{exercise.videoNote}</span>
          </div>
          <div className="button-row">
            <button type="button" className="ghost-button" disabled={!exercise.primaryVideoUrl} onClick={() => openExternal(exercise.primaryVideoUrl)}>
              主推荐{exercise.primaryVideoUrl ? '' : ' TODO'}
            </button>
            <button type="button" className="ghost-button" disabled={!exercise.backupVideoUrl} onClick={() => openExternal(exercise.backupVideoUrl)}>
              备用{exercise.backupVideoUrl ? '' : ' TODO'}
            </button>
            <button type="button" className="ghost-button" onClick={() => openExternal(biliSearchUrl(exercise.searchKeyword))}>
              B站搜索
            </button>
          </div>
          <p className="search-keyword">{exercise.searchKeyword}</p>
        </div>
      )}

      <div className="card-actions">
        <button type="button" className="primary-button" onClick={() => openExternal(followUrl)}>
          打开跟练
        </button>
        <button type="button" className="ghost-button" onClick={() => setExpanded((value) => !value)}>
          {expanded ? '收起' : '展开'}
        </button>
        {onToggleComplete && (
          <button
            type="button"
            className={`check-button ${completed ? 'checked' : ''}`}
            onClick={onToggleComplete}
            aria-pressed={completed}
          >
            {completed ? '已完成' : '完成'}
          </button>
        )}
      </div>
    </article>
  );
}
