import type { Answer, DimensionScore, MBTIResult, Dimension } from '../types';
import { mbtiDescriptions } from '../data/questions';

// 计算维度分数
export function calculateDimensionScore(
  answers: Answer[],
  dimension: Dimension,
  questions: { id: number; dimension: Dimension; reverse: boolean }[]
): DimensionScore {
  const dimensionQuestions = questions.filter((q) => q.dimension === dimension);

  let leftScore = 0;
  let rightScore = 0;

  for (const question of dimensionQuestions) {
    const answer = answers.find((a) => a.questionId === question.id);
    if (!answer) continue;

    // 将1-5分转换为0-4，方便计算
    const normalizedScore = answer.value - 1; // 0-4

    if (question.reverse) {
      // 反向题：选高分 = 右边
      rightScore += normalizedScore;
      leftScore += (4 - normalizedScore);
    } else {
      // 正向题：选高分 = 左边
      leftScore += normalizedScore;
      rightScore += (4 - normalizedScore);
    }
  }

  // 计算百分比倾向 (左边字母的倾向)
  const totalPossible = dimensionQuestions.length * 4; // 每题最多4分差
  const percentage = totalPossible > 0
    ? Math.round((leftScore / totalPossible) * 100)
    : 50;

  return {
    dimension,
    leftScore,
    rightScore,
    percentage: Math.max(0, Math.min(100, percentage)),
  };
}

// 根据分数确定类型字母
function getTypeLetter(score: DimensionScore): string {
  const { dimension, percentage } = score;

  switch (dimension) {
    case 'EI':
      return percentage >= 50 ? 'E' : 'I';
    case 'SN':
      return percentage >= 50 ? 'S' : 'N';
    case 'TF':
      return percentage >= 50 ? 'T' : 'F';
    case 'JP':
      return percentage >= 50 ? 'J' : 'P';
    default:
      return '';
  }
}

// 计算完整的MBTI结果
export function calculateMBTI(
  answers: Answer[],
  questions: { id: number; dimension: Dimension; reverse: boolean }[]
): MBTIResult {
  const dimensions: Dimension[] = ['EI', 'SN', 'TF', 'JP'];
  const scores = dimensions.map((dim) =>
    calculateDimensionScore(answers, dim, questions)
  );

  const type = scores.map(getTypeLetter).join('');
  const description = mbtiDescriptions[type] || '未知类型';

  return {
    type,
    scores,
    description,
    timestamp: Date.now(),
  };
}