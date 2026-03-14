import type { MBTIResult } from '../types';
import { dimensionLabels } from '../data/questions';

interface ResultCardProps {
  result: MBTIResult;
  onRestart: () => void;
  onViewHistory: () => void;
}

export function ResultCard({ result, onRestart, onViewHistory }: ResultCardProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 类型展示 */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl shadow-xl p-8 text-white text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">{result.type}</h1>
        <p className="text-lg md:text-xl opacity-90">{result.description}</p>
      </div>

      {/* 维度分数 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">各维度分析</h2>
        <div className="space-y-6">
          {result.scores.map((score) => {
            const labels = dimensionLabels[score.dimension];
            const leftPercent = score.percentage;
            const rightPercent = 100 - score.percentage;

            return (
              <div key={score.dimension} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-700">{labels.left}</span>
                  <span className="text-gray-700">{labels.right}</span>
                </div>
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden flex">
                  <div
                    className="bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-end pr-2 transition-all duration-700"
                    style={{ width: `${leftPercent}%` }}
                  >
                    {leftPercent >= 20 && (
                      <span className="text-xs font-medium text-white">{leftPercent}%</span>
                    )}
                  </div>
                  <div
                    className="bg-gradient-to-r from-secondary-400 to-secondary-600 flex items-center justify-start pl-2 transition-all duration-700"
                    style={{ width: `${rightPercent}%` }}
                  >
                    {rightPercent >= 20 && (
                      <span className="text-xs font-medium text-white">{rightPercent}%</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg"
        >
          重新测试
        </button>
        <button
          onClick={onViewHistory}
          className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
        >
          查看历史
        </button>
      </div>
    </div>
  );
}