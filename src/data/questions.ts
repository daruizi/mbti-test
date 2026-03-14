import type { Question } from '../types';

// MBTI问题数据
// 每个维度4-5道题，使用Likert 5点量表
export const questions: Question[] = [
  // E/I 维度 - 能量来源
  {
    id: 1,
    text: '我喜欢和一群人在一起，而不是独自一人',
    dimension: 'EI',
    reverse: false, // 选同意 = E
  },
  {
    id: 2,
    text: '在社交活动中，我通常是主动与他人交谈的人',
    dimension: 'EI',
    reverse: false, // 选同意 = E
  },
  {
    id: 3,
    text: '我需要独处时间来恢复精力',
    dimension: 'EI',
    reverse: true, // 选同意 = I
  },
  {
    id: 4,
    text: '我更喜欢深度的一对一谈话，而不是群体讨论',
    dimension: 'EI',
    reverse: true, // 选同意 = I
  },
  {
    id: 5,
    text: '在社交聚会后，我通常感到精力充沛',
    dimension: 'EI',
    reverse: false, // 选同意 = E
  },

  // S/N 维度 - 信息获取方式
  {
    id: 6,
    text: '我更关注当下的现实和具体细节',
    dimension: 'SN',
    reverse: false, // 选同意 = S
  },
  {
    id: 7,
    text: '我喜欢思考可能性和未来的潜力',
    dimension: 'SN',
    reverse: true, // 选同意 = N
  },
  {
    id: 8,
    text: '我倾向于相信直接经验和可验证的事实',
    dimension: 'SN',
    reverse: false, // 选同意 = S
  },
  {
    id: 9,
    text: '我喜欢探索概念和理论之间的联系',
    dimension: 'SN',
    reverse: true, // 选同意 = N
  },
  {
    id: 10,
    text: '我更关注事情的整体图景而非细节',
    dimension: 'SN',
    reverse: true, // 选同意 = N
  },

  // T/F 维度 - 决策方式
  {
    id: 11,
    text: '做决定时，我更看重逻辑和客观分析',
    dimension: 'TF',
    reverse: false, // 选同意 = T
  },
  {
    id: 12,
    text: '我认为在做决定时应该优先考虑他人的感受',
    dimension: 'TF',
    reverse: true, // 选同意 = F
  },
  {
    id: 13,
    text: '我认为公平比和谐更重要',
    dimension: 'TF',
    reverse: false, // 选同意 = T
  },
  {
    id: 14,
    text: '我更容易被情感和价值观所打动',
    dimension: 'TF',
    reverse: true, // 选同意 = F
  },
  {
    id: 15,
    text: '我在做决定时会尽量保持客观和理性',
    dimension: 'TF',
    reverse: false, // 选同意 = T
  },

  // J/P 维度 - 生活方式
  {
    id: 16,
    text: '我喜欢把事情提前计划好',
    dimension: 'JP',
    reverse: false, // 选同意 = J
  },
  {
    id: 17,
    text: '我喜欢保持选项开放，不喜欢过早做决定',
    dimension: 'JP',
    reverse: true, // 选同意 = P
  },
  {
    id: 18,
    text: '我倾向于按时完成任务，不喜欢拖延',
    dimension: 'JP',
    reverse: false, // 选同意 = J
  },
  {
    id: 19,
    text: '我喜欢灵活、自发的生活方式',
    dimension: 'JP',
    reverse: true, // 选同意 = P
  },
  {
    id: 20,
    text: '我觉得有计划的生活让我感到安心',
    dimension: 'JP',
    reverse: false, // 选同意 = J
  },
];

// MBTI类型描述
export const mbtiDescriptions: Record<string, string> = {
  INTJ: '建筑师 - 富有想象力和战略性的思想家，一切皆在计划之中。',
  INTP: '逻辑学家 - 富有创造力的发明家，对知识有着永不满足的渴望。',
  ENTJ: '指挥官 - 大胆、富有想象力的领导者，总能找到解决方法。',
  ENTP: '辩论家 - 聪明好奇的思想家，无法抗拒智力上的挑战。',
  INFJ: '提倡者 - 安静而神秘，但能深刻启发和感染他人。',
  INFP: '调停者 - 富有诗意、善良无私的灵魂，总是渴望帮助良善之事。',
  ENFJ: '主人公 - 富有魅力的领导者，能够激励听众。',
  ENFP: '竞选者 - 热情、有创造力的社交达人，总能找到微笑的理由。',
  ISTJ: '物流师 - 务实、注重事实的个体，可靠性不容置疑。',
  ISFJ: '守卫者 - 非常专注和温暖的守护者，时刻准备保护所爱之人。',
  ESTJ: '总经理 - 出色的管理者，在管理事务和人员方面无与伦比。',
  ESFJ: '执政官 - 极具同情心、爱交际的人，总是热心帮助他人。',
  ISTP: '鉴赏家 - 大胆而实际的实验家，擅长使用各种工具。',
  ISFP: '探险家 - 灵活而有魅力的艺术家，时刻准备探索新事物。',
  ESTP: '企业家 - 聪明、精力充沛、善于感知的人，真正享受生活。',
  ESFP: '表演者 - 自发、精力充沛的娱乐者，生活永远不会无聊。',
};

// 维度标签
export const dimensionLabels: Record<string, { left: string; right: string }> = {
  EI: { left: '外向 (E)', right: '内向 (I)' },
  SN: { left: '感觉 (S)', right: '直觉 (N)' },
  TF: { left: '思考 (T)', right: '情感 (F)' },
  JP: { left: '判断 (J)', right: '感知 (P)' },
};