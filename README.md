# Mango Docs

🚧 正在建设中，一个现代化的在线文档编辑与协作平台，基于 Next.js 15 和 Convex 构建。

## 特性

- 📝 实时协作编辑
- 🎨 富文本编辑器
- 🌙 深色模式支持
- 📱 响应式设计
- 🚀 实时数据同步
- 🔍 文档搜索
- 📂 文件夹组织

## 技术栈

- **前端框架:** Next.js 15
- **数据库/后端:** Convex
- **编辑器:** Tiptap
- **样式:** Tailwind CSS
- **UI组件:** Radix UI + shadcn/ui
- **状态管理:** Zustand
- **类型检查:** TypeScript

## 项目结构

``` bash
src/
├── app/                    # Next.js 应用路由
│   ├── (home)/            # 首页相关组件
│   ├── documents/         # 文档编辑相关组件
│   └── layout.tsx         # 根布局
├── components/            # 可复用组件
├── lib/                   # 工具函数和配置
└── styles/               # 全局样式
convex/                   # Convex 后端
├── schema.ts             # 数据库模型
└── documents.ts          # 文档相关操作
```

## 本地开发

1. 安装依赖:

```bash
pnpm install
```

2. 配置环境变量:

```bash
cp .env.example .env.local
```

3. 启动 Convex 开发服务器:

```bash
npx convex dev
```

4. 启动 Next.js 开发服务器:

```bash
pnpm dev
```

5. 打开 [http://localhost:3000](http://localhost:3000)

## 环境要求

- Node.js 18+
- pnpm 8+
- Convex CLI

## 贡献指南

欢迎提交 Pull Request 和 Issue！

## 许可证

MIT License
