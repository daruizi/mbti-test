// MBTI维度
export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';

// 问题类型
export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  reverse: boolean; // 是否反向计分
}

// 答案选项
export interface Answer {
  questionId: number;
  value: number; // 1-5 (非常不同意 到 非常同意)
}

// 维度分数
export interface DimensionScore {
  dimension: Dimension;
  leftScore: number; // 前一个字母的分数 (E, S, T, J)
  rightScore: number; // 后一个字母的分数 (I, N, F, P)
  percentage: number; // 左边字母的百分比倾向
}

// MBTI结果
export interface MBTIResult {
  type: string; // 如 'INTJ', 'ENFP'
  scores: DimensionScore[];
  description: string;
  timestamp: number;
}

// 历史记录
export interface HistoryRecord {
  id: string;
  name: string; // 测试者名字/昵称
  result: MBTIResult;
  date: string;
}

// 应用状态
export type AppPhase = 'welcome' | 'testing' | 'result' | 'history';