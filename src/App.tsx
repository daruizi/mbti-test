import { useState, useCallback } from 'react';
import type { Answer, AppPhase, HistoryRecord, MBTIResult } from './types';
import { questions } from './data/questions';
import { calculateMBTI } from './utils/mbtiCalculator';
import { useLocalStorage } from './hooks/useLocalStorage';
import { QuestionCard } from './components/QuestionCard';
import { ProgressBar } from './components/ProgressBar';
import { ResultCard } from './components/ResultCard';
import { HistoryList } from './components/HistoryList';

function App() {
  const [phase, setPhase] = useState<AppPhase>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [history, setHistory] = useLocalStorage<HistoryRecord[]>('mbti-history', []);

  // 处理答案
  const handleAnswer = useCallback((value: number) => {
    const questionId = questions[currentQuestion].id;
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, value } : a
        );
      }
      return [...prev, { questionId, value }];
    });
  }, [currentQuestion]);

  // 下一题
  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // 计算结果
      const finalAnswers = answers;
      const mbtiResult = calculateMBTI(finalAnswers, questions);
      setResult(mbtiResult);

      // 保存到历史记录
      const record: HistoryRecord = {
        id: Date.now().toString(),
        result: mbtiResult,
        date: new Date().toLocaleString('zh-CN'),
      };
      setHistory((prev) => [record, ...prev.slice(0, 19)]); // 最多保存20条

      setPhase('result');
    }
  }, [currentQuestion, answers, setHistory]);

  // 上一题
  const handlePrev = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  // 重新开始
  const handleRestart = useCallback(() => {
    setPhase('welcome');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  }, []);

  // 删除历史记录
  const handleDeleteHistory = useCallback((id: string) => {
    setHistory((prev) => prev.filter((r) => r.id !== id));
  }, [setHistory]);

  // 获取当前题目的答案值
  const getCurrentAnswer = () => {
    const questionId = questions[currentQuestion].id;
    return answers.find((a) => a.questionId === questionId)?.value || 0;
  };

  // 渲染欢迎页面
  if (phase === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-lg text-center">
          <div className="mb-8">
            <div className="text-7xl mb-4">🧠</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              MBTI 人格测试
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              通过 20 道问题，了解你的人格类型
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="space-y-4 text-left text-gray-600">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                <span>预计用时 5-10 分钟</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <span>测试四个维度：外向/内向、感觉/直觉、思考/情感、判断/感知</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">💾</span>
                <span>结果自动保存到本地，可随时查看历史</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setPhase('testing')}
              className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              开始测试
            </button>
            <button
              onClick={() => setPhase('history')}
              className="w-full px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              查看历史记录
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 渲染测试页面
  if (phase === 'testing') {
    const currentAnswer = getCurrentAnswer();
    const canProceed = currentAnswer > 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
        <div className="mb-8">
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
        </div>

        <div className="mb-6">
          <QuestionCard
            question={questions[currentQuestion]}
            currentValue={currentAnswer}
            onAnswer={handleAnswer}
          />
        </div>

        <div className="max-w-2xl mx-auto flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200'
            }`}
          >
            ← 上一题
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              !canProceed
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : currentQuestion === questions.length - 1
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-md'
                : 'bg-primary-500 hover:bg-primary-600 text-white shadow-md'
            }`}
          >
            {currentQuestion === questions.length - 1 ? '查看结果 →' : '下一题 →'}
          </button>
        </div>
      </div>
    );
  }

  // 渲染结果页面
  if (phase === 'result' && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
        <ResultCard
          result={result}
          onRestart={handleRestart}
          onViewHistory={() => setPhase('history')}
        />
      </div>
    );
  }

  // 渲染历史页面
  if (phase === 'history') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
        <HistoryList
          records={history}
          onBack={handleRestart}
          onDelete={handleDeleteHistory}
        />
      </div>
    );
  }

  return null;
}

export default App;