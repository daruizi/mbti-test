import type { HistoryRecord } from '../types';

interface HistoryListProps {
  records: HistoryRecord[];
  onBack: () => void;
  onDelete: (id: string) => void;
}

export function HistoryList({ records, onBack, onDelete }: HistoryListProps) {
  if (records.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">暂无历史记录</h2>
          <p className="text-gray-500 mb-6">完成测试后，结果将保存在这里</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors"
          >
            开始测试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">测试历史</h1>
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ← 返回
        </button>
      </div>

      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-primary-600">
                    {record.result.type}
                  </span>
                  <span className="text-sm text-gray-400">{record.date}</span>
                </div>
                <p className="text-gray-600 text-sm">{record.result.description}</p>

                {/* 简化的维度展示 */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {record.result.scores.map((score) => (
                    <span
                      key={score.dimension}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {score.dimension}: {score.percentage >= 50
                        ? score.dimension[0]
                        : score.dimension[1]}{' '}
                      {Math.max(score.percentage, 100 - score.percentage)}%
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onDelete(record.id)}
                className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="删除记录"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-400">
        共 {records.length} 条记录
      </div>
    </div>
  );
}