import type { PeriodStatus, TodayPlan } from '../types';
import { dateFromKey } from '../utils/dateUtils';

export const weekdayLabels = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
export const shortDayLabels = ['一', '二', '三', '四', '五', '六', '日'];

export const weeklyGoals = [
  '2次普拉提 / 器械或小班课',
  '2次居家训练',
  '每日10-12分钟体态修复',
  '每日至少完成1条习惯提醒',
];

export const dailyRepairIds = [
  'breathing_9090',
  'chin_tuck',
  'wall_angel',
  'dead_bug',
  'clamshell',
  'glute_bridge',
  'hip_flexor_stretch',
];

export const homeTrainingAIds = [
  'breathing_9090',
  'chin_tuck',
  'wall_angel',
  'band_row',
  'face_pull',
  'dead_bug',
  'bird_dog',
  'chest_stretch',
];

export const homeTrainingBIds = [
  'glute_bridge',
  'clamshell',
  'side_leg_raise',
  'romanian_deadlift',
  'band_side_walk',
  'reverse_lunge',
  'calf_raise',
];

export const gentlePeriodIds = ['breathing_9090', 'cat_cow', 'child_pose', 'knees_to_chest', 'wall_posture', 'gentle_walk'];
export const lowPeriodIds = ['breathing_9090', 'chin_tuck', 'wall_angel', 'dead_bug_light', 'glute_bridge_light', 'gentle_walk'];

const normalPlans: Record<number, TodayPlan> = {
  1: {
    id: 'monday-class',
    title: '普拉提 / 器械小班课',
    trainingType: '小班课 + 体态修复',
    estimatedTime: '40-45分钟 + 12分钟',
    focus: '稳骨盆、收肋骨，把肩胛控制带到站姿和上镜状态。',
    avoid: ['为了动作幅度塌腰', '课后不吃正餐', '追求暴汗'],
    advice: ['课后补一餐蛋白质', '每日修复动作只做舒服范围'],
    exerciseIds: ['pilates_class', ...dailyRepairIds],
  },
  2: {
    id: 'home-a',
    title: '居家训练A',
    trainingType: '肩背 + 核心',
    estimatedTime: '25-35分钟',
    focus: '练上背、稳核心，改善头前伸、圆肩和坐着口播时的塌感。',
    avoid: ['耸肩硬拉', '腰代偿', '憋气做核心'],
    advice: ['所有动作慢一点', '优先找背部和小腹控制感'],
    exerciseIds: homeTrainingAIds,
  },
  3: {
    id: 'repair-walk',
    title: '每日修复 + 散步',
    trainingType: '轻修复',
    estimatedTime: '10-30分钟',
    focus: '把下巴、肋骨、骨盆和膝盖放回更顺的位置。',
    avoid: ['久坐不动', '膝盖锁死站立', '低头刷手机太久'],
    advice: ['散步不追求步数', '走路时膝盖对脚尖'],
    exerciseIds: [...dailyRepairIds, 'posture_walk'],
  },
  4: {
    id: 'thursday-class',
    title: '普拉提 / 器械小班课',
    trainingType: '小班课 + 体态修复',
    estimatedTime: '40-45分钟 + 12分钟',
    focus: '把核心、骨盆和肩胛控制练得更细，让背薄但有力量。',
    avoid: ['大重量硬撑', '肩颈紧还继续加难度', '训练后少吃'],
    advice: ['课中及时和老师反馈腰/膝不适', '训练后正常吃饭'],
    exerciseIds: ['pilates_class', ...dailyRepairIds],
  },
  5: {
    id: 'home-b',
    title: '居家训练B',
    trainingType: '臀腿 + 骨盆稳定',
    estimatedTime: '30-40分钟',
    focus: '提上臀、强臀侧、控膝盖，视觉上改善假胯和腿线。',
    avoid: ['锁膝', '膝盖内扣', '把腰顶起来当臀发力'],
    advice: ['不追求开髋', '重点练主动稳定和臀侧发力'],
    exerciseIds: homeTrainingBIds,
  },
  6: {
    id: 'easy-camera',
    title: '轻松走路 / 拉伸 / 上镜练习',
    trainingType: '轻活动',
    estimatedTime: '20-40分钟',
    focus: '把训练里的体态带到拍视频：下巴微收、肩放松、膝盖不锁死。',
    avoid: ['刻意挺胸塌腰', '长时间固定二郎腿', '低头走路'],
    advice: ['口播前做30秒体态预备', '走路时脚步自然轻一点'],
    exerciseIds: ['posture_walk', 'chin_tuck', 'wall_angel', 'hip_flexor_stretch'],
  },
  0: {
    id: 'sunday-repair',
    title: '休息 + 每日修复',
    trainingType: '恢复日',
    estimatedTime: '10分钟',
    focus: '用最小剂量维持体态感，给下周训练留恢复空间。',
    avoid: ['补偿式猛练', '熬夜后强度训练', '疼痛还硬拉伸'],
    advice: ['睡眠优先', '只做舒服的修复动作'],
    exerciseIds: dailyRepairIds,
  },
};

export function getNormalPlan(dateKey: string): TodayPlan {
  return normalPlans[dateFromKey(dateKey).getDay()];
}

export function getPlanByPeriod(dateKey: string, status: PeriodStatus): TodayPlan {
  if (status.mode === 'gentle') {
    return {
      id: 'period-gentle',
      title: '经期第1-2天轻柔修复',
      trainingType: '经期轻柔',
      estimatedTime: '7-10分钟 + 可选散步',
      focus: '不做强度训练，只保留呼吸、轻柔活动和舒服范围内的放松。',
      avoid: status.avoid,
      advice: status.advice,
      exerciseIds: gentlePeriodIds,
      note: '痛感明显、头晕或出血量异常时，今天只休息也可以。',
    };
  }

  if (status.mode === 'low') {
    return {
      id: 'period-low',
      title: '经期第3-5天低强度恢复',
      trainingType: '低强度恢复',
      estimatedTime: '10-20分钟',
      focus: '恢复肩颈、轻量核心和臀部激活，保持能舒服呼吸的强度。',
      avoid: status.avoid,
      advice: status.advice,
      exerciseIds: lowPeriodIds,
      note: '腰腹明显不舒服时，删减到呼吸和轻松散步。',
    };
  }

  return getNormalPlan(dateKey);
}
