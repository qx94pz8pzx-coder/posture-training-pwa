export const exerciseLibraryCategories = [
  '今日必做',
  '头颈肩背',
  '核心骨盆',
  '臀腿线条',
  '腿型足踝',
  '经期轻柔',
  '进阶动作',
] as const;

export type ExerciseLibraryCategory = (typeof exerciseLibraryCategories)[number];

export const motionGuideTypes = [
  'breathing_9090',
  'chin_tuck',
  'wall_angel',
  'dead_bug',
  'glute_bridge',
  'clamshell',
  'hip_flexor_stretch',
  'band_row',
  'face_pull',
  'bird_dog',
  'chest_stretch',
  'side_leg_raise',
  'romanian_deadlift',
  'band_side_walk',
  'reverse_lunge',
  'calf_raise',
  'cat_cow',
  'child_pose',
  'knees_to_chest',
  'wall_posture',
  'hip_9090_switch',
  'seated_hip_internal_rotation',
  'ytwl',
  'reverse_fly',
  'single_leg_bridge',
  'hip_thrust',
  'standing_kickback',
] as const;

export type MotionGuideType = (typeof motionGuideTypes)[number];

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseLibraryCategory;
  duration: string;
  targetProblems: string[];
  cues: string[];
  mistakes: string[];
  why: string;
  primaryVideoUrl: string;
  backupVideoUrl: string;
  searchKeyword: string;
  videoNote: string;
  customVideoUrl: string;
  motionType: MotionGuideType;
  motionLabels: string[];
  hiddenFromLibrary?: boolean;
}

export interface TodayPlan {
  id: string;
  title: string;
  trainingType: string;
  estimatedTime: string;
  focus: string;
  avoid: string[];
  advice: string[];
  exerciseIds: string[];
  note?: string;
}

export const habitIllustrationTypes = [
  'phone',
  'sitting',
  'standing',
  'camera',
  'cross_leg',
  'bed_gaming',
  'walking',
  'nutrition',
] as const;

export type HabitIllustrationType = (typeof habitIllustrationTypes)[number];

export interface Habit {
  id: string;
  title: string;
  targetProblems: string[];
  doThis: string;
  avoidThis: string;
  reminder: string;
  checklistLabel: string;
  illustrationType: HabitIllustrationType;
}

export type TabId = 'today' | 'actions' | 'habits' | 'checkin' | 'review';

export type CheckRecords = Record<string, boolean>;

export type CustomLinks = Record<string, string>;

export type EightWeekCheckins = Record<string, boolean>;

export interface ProgramSettings {
  startDate: string;
}

export type PeriodManualMode = 'auto' | 'gentle' | 'low' | 'normal';

export interface PeriodRecord {
  startDate: string;
  endedAt: string;
  painScore: number;
  soreness: string;
  lowBackPain: string;
  mood: string;
  sleep: string;
  flow: '少' | '中' | '多';
  manualMode: PeriodManualMode;
  notes: string;
  cycleNote: string;
}

export type PeriodMode = 'normal' | 'gentle' | 'low';

export interface PeriodStatus {
  mode: PeriodMode;
  day: number | null;
  label: string;
  suggestion: string;
  avoid: string[];
  advice: string[];
}

export interface WeeklyReview {
  week: number;
  hardestMove: string;
  soreArea: string;
  painNotes: string;
  postureFeeling: string;
  nextFocus: string;
  updatedAt: string;
}
