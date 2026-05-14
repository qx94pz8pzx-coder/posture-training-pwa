import type { PeriodRecord, PeriodStatus } from '../types';

const dayMs = 24 * 60 * 60 * 1000;

export function toDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function dateFromKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

export function formatDateCN(dateKey: string): string {
  const date = dateFromKey(dateKey);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

export function addDays(dateKey: string, days: number): string {
  const date = dateFromKey(dateKey);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

export function daysBetween(startDate: string, endDate: string): number {
  return Math.floor((dateFromKey(endDate).getTime() - dateFromKey(startDate).getTime()) / dayMs);
}

export function startOfWeekKey(dateKey: string): string {
  const date = dateFromKey(dateKey);
  const mondayOffset = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - mondayOffset);
  return toDateKey(date);
}

export function getProgramWeek(startDate: string, todayKey: string): number {
  const diff = Math.max(0, daysBetween(startDate, todayKey));
  return Math.min(8, Math.floor(diff / 7) + 1);
}

export function exerciseCheckKey(dateKey: string, exerciseId: string): string {
  return `check_${dateKey}_${exerciseId}`;
}

export function habitCheckKey(dateKey: string, habitId: string): string {
  return `habit_${dateKey}_${habitId}`;
}

export function todayTaskKey(dateKey: string): string {
  return `day_${dateKey}`;
}

export function getPeriodStatus(record: PeriodRecord, todayKey: string): PeriodStatus {
  if (!record.startDate) {
    return {
      mode: 'normal',
      day: null,
      label: '未记录本次经期',
      suggestion: '普通计划',
      avoid: [],
      advice: ['按今日训练安排执行，疲劳时减少组数。'],
    };
  }

  if (record.endedAt && daysBetween(record.endedAt, todayKey) > 0) {
    return {
      mode: 'normal',
      day: null,
      label: '本次经期已结束',
      suggestion: '恢复普通计划',
      avoid: [],
      advice: ['从低强度逐步恢复，第一天不要直接加量。'],
    };
  }

  const day = daysBetween(record.startDate, todayKey) + 1;
  if (day < 1) {
    return {
      mode: 'normal',
      day: null,
      label: '开始日期在未来',
      suggestion: '普通计划',
      avoid: [],
      advice: ['请检查本次姨妈开始日期是否填错。'],
    };
  }

  if (record.manualMode === 'normal') {
    return {
      mode: 'normal',
      day,
      label: `经期第 ${day} 天，已手动按普通计划`,
      suggestion: '普通计划',
      avoid: ['明显腰腹不适时不要硬练'],
      advice: ['手动关闭轻柔模式后，也建议保留呼吸和轻拉伸。'],
    };
  }

  if (record.manualMode === 'gentle' || (record.manualMode === 'auto' && day <= 2)) {
    return {
      mode: 'gentle',
      day,
      label: `经期第 ${day} 天`,
      suggestion: '轻柔修复',
      avoid: ['臀腿力量', '高强度核心', '暴汗训练', '长时间站立硬撑'],
      advice: ['呼吸', '猫牛式', '婴儿式', '靠墙站姿', '轻松散步'],
    };
  }

  if (record.manualMode === 'low' || (record.manualMode === 'auto' && day <= 5)) {
    return {
      mode: 'low',
      day,
      label: `经期第 ${day} 天`,
      suggestion: '低强度恢复',
      avoid: ['大重量臀腿', '卷腹类强核心', '跳跃暴汗'],
      advice: ['轻量核心控制', '轻量臀桥', '肩颈打开', '舒服速度散步'],
    };
  }

  return {
    mode: 'normal',
    day,
    label: `经期第 ${day} 天`,
    suggestion: '按体感恢复普通计划',
    avoid: ['痛感明显时不要加量'],
    advice: ['优先睡眠、规律吃饭和轻柔修复。'],
  };
}

export function deterministicIndexes(seedText: string, total: number, minCount = 1, maxCount = 3): number[] {
  const count = Math.min(total, minCount + (hash(seedText) % Math.max(1, maxCount - minCount + 1)));
  const indexes: number[] = [];
  let cursor = hash(`${seedText}-habits`);
  while (indexes.length < count && indexes.length < total) {
    const next = cursor % total;
    if (!indexes.includes(next)) indexes.push(next);
    cursor = hash(`${cursor}-${seedText}`);
  }
  return indexes;
}

function hash(text: string): number {
  let value = 0;
  for (let index = 0; index < text.length; index += 1) {
    value = (value * 31 + text.charCodeAt(index)) >>> 0;
  }
  return value;
}
