# 智能动力总成仪表盘 - 汽车仿真与现代化Web实现

本项目展示了一个**定制化汽车仪表盘**的完整解决方案，包含原始的**Vector CANoe/pro DE**面板设计以及使用现代Web技术重新实现的版本，用于车载网络仿真、测试和可视化。

## 🚗 项目概述

### 原始CANoe仪表盘
传统的CANoe面板仿真实时车辆仪表集群，包含以下组件：
- **车速表** (km/h)
- **转速表** (RPM)  
- **档位指示器** (P/R/N/D/1-6)
- **燃油表** (E到F)
- **发动机警告图标**
- **驾驶员标签显示**

### 🌟 现代化Web仪表盘
基于现代Web技术重新设计的交互式仪表盘，具有：
- **响应式设计** - 适配各种屏幕尺寸
- **实时数据模拟** - 多种驾驶模式仿真
- **科技感UI** - 霓虹绿主题和流畅动画
- **智能警告系统** - 动态状态监控
- **WebSocket支持** - 可连接真实CAN数据

### 📸 界面展示
![Dashboard Panel](./dashboard_screenshot.png)

## 🔧 信号仿真

仪表盘连接到模拟CAN配置并读取以下信号：

| 信号名称 | 描述 | 范围/单位 | CAN消息 |
|---------|------|----------|---------|
| `CarSpeed` | 车辆速度 | 0–300 km/h | ABSdata |
| `EngSpeed` | 发动机转速 | 0–10,000 rpm | EngineData |
| `Gear` | 变速箱档位 | P/R/N/D/1-6 | GearBoxInfo |
| `PetrolLevel` | 燃油液位 | 0–100% | EngineData |
| `EngTemp` | 发动机温度 | 60–120°C | EngineData |

### 信号图表快照
![Engine_Data_Graph](./signal_graph.png)

## 🛠️ 技术栈

### CANoe版本
- Vector **CANoe/pro DE**
- **Panel Designer** 自定义指示器
- **CAPL** 脚本信号逻辑
- 诊断控制台

### Web版本
- **HTML5** + **CSS3** + **JavaScript ES6+**
- **SVG** 矢量图形仪表
- **WebSocket** 实时数据通信
- **响应式设计** 移动端适配

## 📁 项目结构

```
smart-powertrain-dev/
├── panel-dashboard/           # 原始CANoe项目
│   ├── Panel1.xvp            # CANoe配置文件
│   ├── README.md             # 项目文档
│   ├── dashboard_screenshot.png
│   └── signal_graph.png
├── web-dashboard/            # 现代化Web版本
│   ├── index.html           # 主页面
│   ├── styles.css           # 样式文件
│   └── dashboard.js         # 交互逻辑
└── .gitattributes
```

## 🚀 快速开始

### 运行Web版本
```bash
# 进入Web仪表盘目录
cd web-dashboard

# 启动本地服务器
python3 -m http.server 8000

# 在浏览器中访问
open http://localhost:8000
```

### 功能操作
1. **启动发动机** - 点击"启动"按钮
2. **选择驾驶模式** - 怠速/城市/高速/运动
3. **观察数据变化** - 实时仪表和警告灯
4. **重置仪表盘** - 一键恢复初始状态

## 💡 核心特性

### 实时数据绑定
- **事件驱动架构** - 高效的数据更新机制
- **观察者模式** - 解耦的组件通信
- **内存映射** - 优化的性能表现

### 可扩展性
- **模块化设计** - 易于添加新功能
- **WebSocket接口** - 支持真实CAN数据
- **配置化参数** - 灵活的仪表设置

### 用户体验
- **流畅动画** - CSS3过渡效果
- **直观操作** - 简洁的控制界面
- **状态反馈** - 清晰的视觉指示

## 🎯 学习要点

- 实时车辆仪表盘的设计与集成
- 信号到面板的数据映射技术
- CANoe中的UI布局和指示器行为逻辑
- 嵌入式ECU测试的可视化方法
- 现代Web技术在汽车电子中的应用
- 响应式设计和用户体验优化

## 🔮 未来扩展

- [ ] 3D仪表盘渲染
- [ ] 多语言支持
- [ ] 历史数据记录
- [ ] 故障诊断界面
- [ ] 移动端APP版本
- [ ] 云端数据同步
