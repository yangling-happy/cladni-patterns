# 克拉尼图形可视化项目

这是一个基于 React + TypeScript + Vite 的克拉尼图形（Chladni Patterns）交互式可视化应用。克拉尼图形是声波在振动板上形成的驻波图案，通过调整频率参数可以观察不同振动模式下的图形变化。

## 🌟 功能特性

- **实时可视化**：基于数学公式实时生成克拉尼图形
- **参数调节**：可调整X/Y方向频率、振幅、阻尼和复杂度
- **预设模式**：6种预设模式一键切换
- **颜色方案**：4种不同的颜色渲染方案
- **动画效果**：可开启/关闭的动画效果
- **响应式设计**：适配不同屏幕尺寸
- **公式显示**：实时显示当前参数的数学公式

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 📁 项目结构

```
cladni-patterns/
├── public/                 # 静态资源
│   ├── favicon.svg        # 网站图标
│   └── vite.svg           # Vite图标
├── src/                   # 源代码
│   ├── components/        # React组件
│   │   ├── CladniCanvas/      # 主画布组件
│   │   ├── FrequencyControls/ # 频率控制组件
│   │   ├── PresetSelector/    # 预设选择组件
│   │   └── PatternInfo/       # 信息展示组件
│   ├── utils/             # 工具函数
│   │   ├── cladniMath.ts     # 克拉尼图形数学计算
│   │   ├── colorSchemes.ts   # 颜色方案配置
│   │   └── constants.ts      # 常量定义
│   ├── types/             # TypeScript类型定义
│   │   └── cladni.ts         # 项目主要类型
│   ├── App.tsx            # 主应用组件
│   ├── App.css            # 全局样式
│   ├── main.tsx           # 应用入口
│   └── index.css          # 基础样式
├── index.html            # HTML入口
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript配置
├── vite.config.ts        # Vite配置
└── README.md            # 项目说明
```

## 🧮 数学原理

克拉尼图形基于以下数学公式：

```
z(x,y) = Σᵢ₌₁ᴺ Σⱼ₌₁ᴺ sin(m·i·π·x) · sin(n·j·π·y) · e⁻ᵅʳ
```

其中：
- `m, n` = X和Y方向的频率参数
- `N` = 复杂度（叠加的模态数量）
- `α` = 阻尼系数
- `r` = 距离中心的距离

## 🎮 使用方法

### 1. 调整参数
- **X方向频率 (m)**：控制水平方向的振动模式
- **Y方向频率 (n)**：控制垂直方向的振动模式
- **振幅**：控制振动的幅度
- **阻尼**：控制从中心向边缘的衰减程度
- **复杂度**：控制叠加的模态数量，值越高图案越复杂

### 2. 使用预设模式
- **简单模式**：基础克拉尼图形 (m=3, n=2)
- **复杂模式**：多个频率叠加的复杂图案
- **对称图案**：高度对称的克拉尼图形
- **高频模式**：高频振动产生的密集图案
- **低频模式**：低频振动产生的简单图案
- **共振模式**：接近共振频率的图案

### 3. 视觉效果
- **颜色方案**：在4种配色方案间切换
- **动画效果**：开启/关闭时间动画

## 🛠️ 技术栈

- **React 18** - 用户界面库
- **TypeScript** - 类型安全的JavaScript超集
- **Vite** - 下一代前端构建工具
- **HTML5 Canvas** - 图形渲染
- **CSS3** - 样式设计

## 📱 响应式设计

项目支持响应式布局：
- 桌面端：画布和控制面板并排显示
- 移动端：控制面板在上，画布在下

## 🧪 开发指南

### 添加新的预设模式
在 `src/utils/constants.ts` 中的 `PRESETS` 数组添加新的预设：

```typescript
{
  id: 'new_preset',
  name: '新预设',
  description: '新的克拉尼图形模式',
  config: { 
    frequencyX: 5, 
    frequencyY: 3, 
    amplitude: 1.2, 
    damping: 0.3, 
    complexity: 4 
  }
}
```

### 添加新的颜色方案
在 `src/utils/colorSchemes.ts` 中的 `colorSchemes` 数组添加新的颜色方案：

```typescript
{
  name: '新配色',
  getColor: (value, maxValue) => {
    // 实现你的颜色计算逻辑
    return `rgb(r, g, b)`;
  }
}
```

## 🔧 性能优化

- 使用 `requestAnimationFrame` 进行平滑动画
- 通过 `useCallback` 和 `useMemo` 优化渲染性能
- 画布渲染使用离屏计算，避免阻塞主线程

## 📚 相关资源

- [克拉尼图形 - 维基百科](https://zh.wikipedia.org/wiki/克拉尼图形)

## 🙏 致谢

- 感谢恩斯特·克拉尼发现这些美妙的振动图案
- 感谢使用本项目的每一位用户

---

**提示**：调整频率参数时，观察图形如何从简单对称模式逐渐变为复杂分形图案，体验数学之美！
