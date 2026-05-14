import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { collectAppData } from '../utils/storage';
import type { EightWeekCheckins, PeriodRecord, PeriodStatus, ProgramSettings, WeeklyReview } from '../types';
import { getProgramWeek } from '../utils/dateUtils';

interface ReviewPageProps {
  reviews: Record<string, WeeklyReview>;
  setReviews: Dispatch<SetStateAction<Record<string, WeeklyReview>>>;
  checkins: EightWeekCheckins;
  settings: ProgramSettings;
  todayKey: string;
  periodRecord: PeriodRecord;
  setPeriodRecord: Dispatch<SetStateAction<PeriodRecord>>;
  periodStatus: PeriodStatus;
}

function emptyReview(week: number): WeeklyReview {
  return {
    week,
    hardestMove: '',
    soreArea: '',
    painNotes: '',
    postureFeeling: '',
    nextFocus: '',
    updatedAt: '',
  };
}

export function ReviewPage({
  reviews,
  setReviews,
  checkins,
  settings,
  todayKey,
  periodRecord,
  setPeriodRecord,
  periodStatus,
}: ReviewPageProps) {
  const [selectedWeek, setSelectedWeek] = useState(() => getProgramWeek(settings.startDate, todayKey));
  const review = reviews[String(selectedWeek)] ?? emptyReview(selectedWeek);
  const completedDays = Array.from({ length: 7 }, (_, index) => checkins[`week_${selectedWeek}_day_${index}`]).filter(Boolean).length;

  function updateReview<K extends keyof WeeklyReview>(field: K, value: WeeklyReview[K]) {
    setReviews((current) => ({
      ...current,
      [selectedWeek]: {
        ...(current[String(selectedWeek)] ?? emptyReview(selectedWeek)),
        [field]: value,
        week: selectedWeek,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function updatePeriod<K extends keyof PeriodRecord>(field: K, value: PeriodRecord[K]) {
    setPeriodRecord((current) => ({ ...current, [field]: value }));
  }

  function exportJson() {
    const data = collectAppData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `体态训练数据-${todayKey}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="tab-panel">
      <section className="plain-header">
        <p className="eyebrow">复盘</p>
        <h2>每周复盘与身体状态</h2>
        <p>经期状态放在这里记录，并自动影响今日训练。训练只是辅助，有异常不适要线下评估。</p>
      </section>

      <section className="settings-card">
        <label>
          选择周数
          <select value={selectedWeek} onChange={(event) => setSelectedWeek(Number(event.target.value))}>
            {Array.from({ length: 8 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                第 {index + 1} 周
              </option>
            ))}
          </select>
        </label>
        <p>本周完成 {completedDays}/7 天</p>
      </section>

      <section className="form-card">
        <h3>每周复盘</h3>
        <label>
          哪个动作最难
          <input value={review.hardestMove} onChange={(event) => updateReview('hardestMove', event.target.value)} placeholder="例如：死虫、罗马尼亚硬拉" />
        </label>
        <label>
          哪个部位最酸
          <input value={review.soreArea} onChange={(event) => updateReview('soreArea', event.target.value)} placeholder="例如：臀侧、背中部、髋前侧" />
        </label>
        <label>
          有没有腰痛、膝痛、肩颈痛
          <textarea
            value={review.painNotes}
            onChange={(event) => updateReview('painNotes', event.target.value)}
            placeholder="写清楚动作、位置和持续多久。疼痛明显时先暂停相关训练。"
          />
        </label>
        <label>
          本周体态感受
          <textarea
            value={review.postureFeeling}
            onChange={(event) => updateReview('postureFeeling', event.target.value)}
            placeholder="例如：坐着口播肩颈轻松一点，站姿更能收住肋骨"
          />
        </label>
        <label>
          下周重点
          <textarea value={review.nextFocus} onChange={(event) => updateReview('nextFocus', event.target.value)} placeholder="例如：死虫做慢，臀桥顶端不塌腰" />
        </label>
      </section>

      <section className="form-card">
        <h3>身体状态记录</h3>
        <div className={`period-inline ${periodStatus.mode}`}>
          <span>当前：{periodStatus.label}</span>
          <strong>{periodStatus.suggestion}</strong>
        </div>
        <label>
          本次姨妈开始日期
          <input type="date" value={periodRecord.startDate} onChange={(event) => updatePeriod('startDate', event.target.value)} />
        </label>
        <label>
          手动模式
          <select value={periodRecord.manualMode} onChange={(event) => updatePeriod('manualMode', event.target.value as PeriodRecord['manualMode'])}>
            <option value="auto">自动保守判断</option>
            <option value="gentle">今日切换轻柔模式</option>
            <option value="low">今日低强度恢复</option>
            <option value="normal">今日手动按普通计划</option>
          </select>
        </label>
        <div className="form-grid">
          <label>
            痛感 0-10分
            <input
              type="number"
              min="0"
              max="10"
              value={periodRecord.painScore}
              onChange={(event) => updatePeriod('painScore', Number(event.target.value))}
            />
          </label>
          <label>
            出血量
            <select value={periodRecord.flow} onChange={(event) => updatePeriod('flow', event.target.value as PeriodRecord['flow'])}>
              <option value="少">少</option>
              <option value="中">中</option>
              <option value="多">多</option>
            </select>
          </label>
        </div>
        <label>
          酸胀感
          <input value={periodRecord.soreness} onChange={(event) => updatePeriod('soreness', event.target.value)} />
        </label>
        <label>
          腰酸
          <input value={periodRecord.lowBackPain} onChange={(event) => updatePeriod('lowBackPain', event.target.value)} />
        </label>
        <label>
          情绪
          <input value={periodRecord.mood} onChange={(event) => updatePeriod('mood', event.target.value)} />
        </label>
        <label>
          睡眠
          <input value={periodRecord.sleep} onChange={(event) => updatePeriod('sleep', event.target.value)} />
        </label>
        <label>
          周期备注
          <textarea value={periodRecord.cycleNote} onChange={(event) => updatePeriod('cycleNote', event.target.value)} />
        </label>
        <label>
          备注
          <textarea value={periodRecord.notes} onChange={(event) => updatePeriod('notes', event.target.value)} />
        </label>
        <button type="button" className="ghost-button" onClick={() => updatePeriod('endedAt', todayKey)}>
          标记本次经期已结束
        </button>
      </section>

      <section className="safety-note">
        <h3>经期与疼痛提醒</h3>
        <p>经期第1-2天不安排高强度核心或臀腿力量。痛经严重、出血量异常、突然明显不适或长期周期紊乱，建议线下妇科评估。</p>
      </section>

      <button type="button" className="export-button" onClick={exportJson}>
        导出 JSON 数据
      </button>
    </div>
  );
}
