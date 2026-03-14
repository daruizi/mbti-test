# MBTI 人格类型测试

一个基于 React + TypeScript + Tailwind CSS 构建的交互式 MBTI 人格类型测试网页应用。

## 在线体验

[https://daruizi.github.io/mbti-test/](https://daruizi.github.io/mbti-test/)

## 功能特性

- **测试者身份识别**: 答题前输入名字或昵称，方便管理多人测试结果
- **20 道专业问题**: 涵盖 MBTI 四个维度，每维度 5 道题
- **Likert 5 点量表**: 从"非常不同意"到"非常同意"
- **即时结果计算**: 实时计算各维度倾向百分比
- **本地历史记录**: 自动保存测试历史到 localStorage，支持查看和删除
- **响应式设计**: 完美适配移动端和桌面端
- **16 种人格描述**: 提供详细的 MBTI 类型解读

## MBTI 四个维度

| 维度 | 说明 |
|------|------|
| **E/I** (外向/内向) | 能量来源：外部世界 vs 内心世界 |
| **S/N** (感觉/直觉) | 信息获取：具体细节 vs 整体概念 |
| **T/F** (思考/情感) | 决策方式：逻辑分析 vs 价值判断 |
| **J/P** (判断/感知) | 生活方式：有计划 vs 灵活应变 |

## 使用方法

1. 打开网页，输入你的名字或昵称
2. 点击"开始测试"进入答题页面
3. 根据实际情况选择每个问题的答案
4. 完成所有问题后查看你的 MBTI 类型结果
5. 可随时查看历史记录，对比不同测试者的结果

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 8
- **样式**: Tailwind CSS 4
- **存储**: localStorage

## 项目结构

```
src/
├── components/
│   ├── QuestionCard.tsx    # 问题展示组件
│   ├── ProgressBar.tsx     # 进度条组件
│   ├── ResultCard.tsx      # 结果展示组件
│   └── HistoryList.tsx     # 历史记录组件
├── data/
│   └── questions.ts        # 20 道 MBTI 问题数据
├── hooks/
│   └── useLocalStorage.ts  # localStorage 自定义 Hook
├── types/
│   └── index.ts            # TypeScript 类型定义
├── utils/
│   └── mbtiCalculator.ts   # MBTI 计算逻辑
├── App.tsx                 # 主应用组件
├── main.tsx                # 入口文件
└── index.css               # 全局样式
```

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 计算逻辑

1. 每道题目根据正向/反向计分规则计算维度分数
2. 将 1-5 分归一化为维度倾向
3. 根据各维度分数确定最终 MBTI 类型
4. 展示各维度的百分比倾向

## 许可证

MIT License