# 克拉尼图形可视化项目（chladni-patterns）

本项目是一个基于 **React 19** 与 **HTML5 Canvas** 构建的高性能物理仿真与可视化交互应用。  
通过数值模拟的方式，在浏览器端复现了经典声学实验——**克拉尼图形（Chladni Patterns）**，展示了方形薄板在不同振动模态下，沙粒在节线（Nodal Lines）处自组织聚集的物理现象。

项目强调 **工程可实现性与物理直觉的结合**：  
并非简单绘制数学曲线，而是通过粒子动力学规则，让图案在时间演化中自然“涌现”。

---

## 1. 核心技术架构

整体采用“**React 状态驱动参数，Canvas 驱动像素与物理演化**”的混合架构，在保证交互性的同时，实现高帧率渲染：

### React 19（UI 与状态管理）

- 使用 React 19 管理全局物理参数（振动模态、预设切换等）
- React 仅负责 **高层参数分发与 UI 交互**
- 不参与逐帧渲染，避免虚拟 DOM 成为性能瓶颈

### HTML5 Canvas（高性能数值仿真与渲染）

- 使用原生 Canvas 2D API 直接操作像素
- 在独立的动画循环中完成粒子演化与绘制
- 避免 React 组件重绘，保证在大量粒子情况下仍可稳定运行

### TypeScript（类型安全）

- 通过 `src/types/cladni.ts` 对物理参数与数据结构进行约束
- 确保数值计算与状态传递过程中的一致性与可维护性

---

## 2. 动画渲染与粒子动力学机制

本项目生成的图形并非静态函数图像，而是通过粒子在振动场中的运动逐步形成。

### 2.1 振动场建模

在 `src/utils/cladniMath.ts` 中定义了振动场的核心计算逻辑。  
通过两个相互垂直的驻波函数叠加，构建二维板面的振动强度场：

- 输入：粒子在板面上的二维坐标
- 输出：该点对应的振动幅值强度

该振动场刻画了不同模态下板面的振动分布特征。

---

### 2.2 粒子行为规则

在 `src/components/CladniCanvas/` 的动画循环中，每一帧都会对所有粒子执行如下逻辑：

1. **振幅读取**  
   读取粒子当前位置在振动场中的振幅值。

2. **动力学更新**
   - **高振幅区域**：  
     粒子获得随机扰动位移，模拟被剧烈振动“抛起”的效果。
   - **低振幅区域（节线附近）**：  
     粒子逐渐趋于稳定，运动幅度显著减小。

3. **自组织演化**  
   通过不断的“随机跳跃—稳定停留”过程，粒子逐步聚集到振幅接近零的节线区域，最终形成清晰、对称的克拉尼图形。

该机制体现了一种典型的 **基于规则的自组织系统**。

---

## 3. 性能优化策略

为保证在浏览器环境中仍具备良好的实时性，项目采用了多项性能优化设计：

- **粒子数组持久化**  
  粒子数据不存储于 React state 中，而是作为 Canvas 内部的长期存在数据结构，避免不必要的状态更新。

- **原生 Canvas 渲染**  
  使用 `requestAnimationFrame` 配合 Canvas API 完成逐帧绘制，绕开 DOM 层级的性能损耗。

- **职责分离**  
  - React：参数配置、UI 控制、模式切换  
  - Canvas：物理计算、粒子运动、像素渲染  

该分层设计在复杂仿真场景下仍可维持流畅的交互体验。

---

## 4. 项目目录结构

```text
cladni-patterns/
├── public/                     # 静态资源
├── src/
│   ├── components/             # React 交互组件
│   │   ├── CladniCanvas/       # 核心物理模拟与 Canvas 渲染
│   │   ├── FrequencyControls/  # 振动模态参数控制
│   │   ├── PresetSelector/     # 经典模态预设切换
│   │   └── PatternInfo/        # 当前模式信息展示
│   ├── utils/                  # 数学与工具函数
│   │   ├── cladniMath.ts       # 驻波方程与场强度计算
│   │   └── constants.ts        # 物理常量与预设配置
│   ├── types/                  # TypeScript 类型定义
│   ├── App.tsx                 # 应用入口与状态分发
│   └── main.tsx                # React 渲染挂载点
├── index.html                  # HTML 模板
├── vite.config.ts              # 构建配置（适配 GitHub Pages）
└── package.json                # 项目脚本与依赖配置
````

---

## 5. 相关资源

* 克拉尼图形（中文维基百科）
  [https://zh.wikipedia.org/wiki/克拉尼图形](https://zh.wikipedia.org/wiki/克拉尼图形)

* Ernst Chladni and His Experiments
  [https://en.wikipedia.org/wiki/Ernst_Chladni](https://en.wikipedia.org/wiki/Ernst_Chladni)

---

## 6. 致谢

* 感谢 **Ernst Chladni** 对声学与振动模态的开创性研究，为物理可视化提供了经典范例。
* 感谢 **React、Vite 及开源社区**，使得在浏览器中实现实时物理仿真成为可能。



