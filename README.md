# MBTI 人格类型测试

一个基于 React + TypeScript + Tailwind CSS 构建的交互式 MBTI 人格类型测试网页应用。

## 在线体验

[https://daruizi.github.io/mbti-test/](https://daruizi.github.io/mbti-test/)

## 功能特性

- **20 道专业问题**: 涵盖 MBTI 四个维度，每维度 5 道题
- **Likert 5 点量表**: 从"非常不同意"到"非常同意"
- **即时结果计算**: 实时计算各维度倾向百分比
- **本地历史记录**: 自动保存测试历史到 localStorage
- **响应式设计**: 完美适配移动端和桌面端
- **16 种人格描述**: 提供详细的 MBTI 类型解读

## MBTI 四个维度

| 维度 | 说明 |
|------|------|
| **E/I** (外向/内向) | 能量来源：外部世界 vs 内心世界 |
| **S/N** (感觉/直觉) | 信息获取：具体细节 vs 整体概念 |
| **T/F** (思考/情感) | 决策方式：逻辑分析 vs 价值判断 |
| **J/P** (判断/感知) | 生活方式：有计划 vs 灵活应变 |

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

## 截图

### 欢迎页面
用户可以选择开始测试或查看历史记录

### 测试页面
清晰的进度条和直观的选项按钮

### 结果页面
展示 MBTI 类型、描述和各维度分析

## 许可证

MIT License