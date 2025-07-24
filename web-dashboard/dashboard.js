// 仪表盘数据管理类
class DashboardData {
    constructor() {
        this.speed = 0;
        this.rpm = 0;
        this.gear = 'P';
        this.fuelLevel = 75;
        this.engineTemp = 85;
        this.isRunning = false;
        this.warnings = {
            engine: false,
            oil: false,
            battery: false
        };
        this.odometer = 12345;
        this.fuelConsumption = 7.2;
        this.drivingTime = 0;
    }

    // 更新数据
    updateData(newData) {
        Object.assign(this, newData);
        this.notifyObservers();
    }

    // 观察者模式
    notifyObservers() {
        if (this.onDataUpdate) {
            this.onDataUpdate(this);
        }
    }
}

// 仪表盘控制器类
class Dashboard {
    constructor() {
        this.data = new DashboardData();
        this.simulationInterval = null;
        this.currentMode = 'idle';
        this.startTime = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDataBinding();
        this.createGaugeElements();
        this.updateDisplay();
    }

    // 设置事件监听器
    setupEventListeners() {
        // 启动/停止按钮
        document.getElementById('startStopBtn').addEventListener('click', () => {
            this.toggleEngine();
        });

        // 重置按钮
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetDashboard();
        });

        // 模拟模式选择
        document.getElementById('simulationMode').addEventListener('change', (e) => {
            this.currentMode = e.target.value;
            if (this.data.isRunning) {
                this.startSimulation();
            }
        });
    }

    // 设置数据绑定
    setupDataBinding() {
        this.data.onDataUpdate = (data) => {
            this.updateDisplay();
        };
    }

    // 创建仪表刻度
    createGaugeElements() {
        this.createSpeedGauge();
        this.createRPMGauge();
    }

    // 创建速度表刻度
    createSpeedGauge() {
        const ticksGroup = document.getElementById('speedTicks');
        const labelsGroup = document.getElementById('speedLabels');
        
        for (let i = 0; i <= 300; i += 20) {
            const angle = (i / 300) * 180 - 90; // -90 to 90 degrees
            const radian = (angle * Math.PI) / 180;
            
            // 刻度线
            const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const innerRadius = i % 60 === 0 ? 65 : 70;
            const outerRadius = 75;
            
            const x1 = 100 + innerRadius * Math.cos(radian);
            const y1 = 100 + innerRadius * Math.sin(radian);
            const x2 = 100 + outerRadius * Math.cos(radian);
            const y2 = 100 + outerRadius * Math.sin(radian);
            
            tick.setAttribute('x1', x1);
            tick.setAttribute('y1', y1);
            tick.setAttribute('x2', x2);
            tick.setAttribute('y2', y2);
            tick.setAttribute('stroke', '#00ff88');
            tick.setAttribute('stroke-width', i % 60 === 0 ? '2' : '1');
            
            ticksGroup.appendChild(tick);
            
            // 数值标签
            if (i % 60 === 0) {
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                const labelRadius = 55;
                const labelX = 100 + labelRadius * Math.cos(radian);
                const labelY = 100 + labelRadius * Math.sin(radian) + 4;
                
                label.setAttribute('x', labelX);
                label.setAttribute('y', labelY);
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('fill', '#00ff88');
                label.setAttribute('font-family', 'Orbitron');
                label.setAttribute('font-size', '10');
                label.textContent = i;
                
                labelsGroup.appendChild(label);
            }
        }
    }

    // 创建转速表刻度
    createRPMGauge() {
        const ticksGroup = document.getElementById('rpmTicks');
        const labelsGroup = document.getElementById('rpmLabels');
        
        for (let i = 0; i <= 10000; i += 500) {
            const angle = (i / 10000) * 180 - 90;
            const radian = (angle * Math.PI) / 180;
            
            // 刻度线
            const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const innerRadius = i % 1000 === 0 ? 65 : 70;
            const outerRadius = 75;
            
            const x1 = 100 + innerRadius * Math.cos(radian);
            const y1 = 100 + innerRadius * Math.sin(radian);
            const x2 = 100 + outerRadius * Math.cos(radian);
            const y2 = 100 + outerRadius * Math.sin(radian);
            
            tick.setAttribute('x1', x1);
            tick.setAttribute('y1', y1);
            tick.setAttribute('x2', x2);
            tick.setAttribute('y2', y2);
            tick.setAttribute('stroke', i >= 8000 ? '#ff4444' : '#00ffbb');
            tick.setAttribute('stroke-width', i % 1000 === 0 ? '2' : '1');
            
            ticksGroup.appendChild(tick);
            
            // 数值标签
            if (i % 1000 === 0) {
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                const labelRadius = 55;
                const labelX = 100 + labelRadius * Math.cos(radian);
                const labelY = 100 + labelRadius * Math.sin(radian) + 4;
                
                label.setAttribute('x', labelX);
                label.setAttribute('y', labelY);
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('fill', i >= 8000 ? '#ff4444' : '#00ffbb');
                label.setAttribute('font-family', 'Orbitron');
                label.setAttribute('font-size', '10');
                label.textContent = i / 1000;
                
                labelsGroup.appendChild(label);
            }
        }
    }

    // 更新显示
    updateDisplay() {
        this.updateSpeedGauge();
        this.updateRPMGauge();
        this.updateGearDisplay();
        this.updateFuelGauge();
        this.updateTemperature();
        this.updateWarnings();
        this.updateDataPanel();
    }

    // 更新速度表
    updateSpeedGauge() {
        const needle = document.getElementById('speedNeedle');
        const value = document.getElementById('speedValue');
        
        const angle = (this.data.speed / 300) * 180 - 90;
        needle.style.transform = `rotate(${angle}deg)`;
        value.textContent = Math.round(this.data.speed);
    }

    // 更新转速表
    updateRPMGauge() {
        const needle = document.getElementById('rpmNeedle');
        const value = document.getElementById('rpmValue');
        
        const angle = (this.data.rpm / 10000) * 180 - 90;
        needle.style.transform = `rotate(${angle}deg)`;
        value.textContent = Math.round(this.data.rpm);
    }

    // 更新档位显示
    updateGearDisplay() {
        const gearDisplay = document.getElementById('gearDisplay');
        gearDisplay.textContent = this.data.gear;
        
        // 根据档位改变颜色
        if (this.data.gear === 'P' || this.data.gear === 'N') {
            gearDisplay.style.color = '#00ff88';
        } else if (this.data.gear === 'R') {
            gearDisplay.style.color = '#ff4444';
        } else {
            gearDisplay.style.color = '#00ffbb';
        }
    }

    // 更新燃油表
    updateFuelGauge() {
        const fuelLevel = document.getElementById('fuelLevel');
        const fuelPercentage = document.getElementById('fuelPercentage');
        
        fuelLevel.style.width = `${this.data.fuelLevel}%`;
        fuelPercentage.textContent = `${Math.round(this.data.fuelLevel)}%`;
        
        // 根据油量改变颜色
        if (this.data.fuelLevel < 20) {
            fuelLevel.style.background = '#ff4444';
        } else if (this.data.fuelLevel < 50) {
            fuelLevel.style.background = 'linear-gradient(90deg, #ff4444 0%, #ffaa00 100%)';
        } else {
            fuelLevel.style.background = 'linear-gradient(90deg, #ff4444 0%, #ffaa00 50%, #00ff88 100%)';
        }
    }

    // 更新温度显示
    updateTemperature() {
        const tempValue = document.getElementById('tempValue');
        const tempStatus = document.getElementById('tempStatus');
        const tempIcon = document.getElementById('tempIcon');
        
        tempValue.textContent = `${Math.round(this.data.engineTemp)}°C`;
        
        if (this.data.engineTemp < 60) {
            tempStatus.textContent = '冷车';
            tempStatus.style.color = '#00aaff';
            tempIcon.textContent = '🧊';
        } else if (this.data.engineTemp > 100) {
            tempStatus.textContent = '过热';
            tempStatus.style.color = '#ff4444';
            tempIcon.textContent = '🔥';
        } else {
            tempStatus.textContent = '正常';
            tempStatus.style.color = '#00ff88';
            tempIcon.textContent = '🌡️';
        }
    }

    // 更新警告指示灯
    updateWarnings() {
        Object.keys(this.data.warnings).forEach(warning => {
            const element = document.getElementById(`${warning}Warning`);
            if (this.data.warnings[warning]) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }

    // 更新数据面板
    updateDataPanel() {
        document.getElementById('odometer').textContent = `${this.data.odometer.toLocaleString()} km`;
        document.getElementById('fuelConsumption').textContent = `${this.data.fuelConsumption.toFixed(1)} L/100km`;
        
        if (this.data.isRunning && this.startTime) {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const hours = Math.floor(elapsed / 3600);
            const minutes = Math.floor((elapsed % 3600) / 60);
            const seconds = elapsed % 60;
            document.getElementById('drivingTime').textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    // 启动/停止发动机
    toggleEngine() {
        if (this.data.isRunning) {
            this.stopEngine();
        } else {
            this.startEngine();
        }
    }

    // 启动发动机
    startEngine() {
        this.data.isRunning = true;
        this.startTime = Date.now();
        this.data.gear = 'P';
        this.startSimulation();
        
        // 更新按钮文本
        document.getElementById('startStopBtn').textContent = '停止';
        document.getElementById('startStopBtn').style.background = '#ff4444';
        document.getElementById('startStopBtn').style.borderColor = '#ff4444';
    }

    // 停止发动机
    stopEngine() {
        this.data.isRunning = false;
        this.stopSimulation();
        
        // 重置数据
        this.data.speed = 0;
        this.data.rpm = 0;
        this.data.gear = 'P';
        
        // 更新按钮文本
        document.getElementById('startStopBtn').textContent = '启动';
        document.getElementById('startStopBtn').style.background = 'transparent';
        document.getElementById('startStopBtn').style.borderColor = '#00ff88';
        
        this.data.updateData(this.data);
    }

    // 开始模拟
    startSimulation() {
        this.stopSimulation();
        
        this.simulationInterval = setInterval(() => {
            this.simulateData();
        }, 100);
    }

    // 停止模拟
    stopSimulation() {
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
    }

    // 模拟数据变化
    simulateData() {
        if (!this.data.isRunning) return;

        const modes = {
            idle: { speedRange: [0, 5], rpmRange: [800, 1200], gears: ['P', 'N'] },
            city: { speedRange: [0, 60], rpmRange: [1000, 3000], gears: ['1', '2', '3', 'D'] },
            highway: { speedRange: [60, 120], rpmRange: [2000, 4000], gears: ['D', '4', '5'] },
            sport: { speedRange: [0, 200], rpmRange: [2000, 8000], gears: ['1', '2', '3', '4', '5', 'D'] }
        };

        const mode = modes[this.currentMode];
        
        // 模拟速度变化
        const targetSpeed = mode.speedRange[0] + Math.random() * (mode.speedRange[1] - mode.speedRange[0]);
        this.data.speed += (targetSpeed - this.data.speed) * 0.1;
        
        // 模拟转速变化
        const targetRPM = mode.rpmRange[0] + Math.random() * (mode.rpmRange[1] - mode.rpmRange[0]);
        this.data.rpm += (targetRPM - this.data.rpm) * 0.1;
        
        // 随机切换档位
        if (Math.random() < 0.01) {
            this.data.gear = mode.gears[Math.floor(Math.random() * mode.gears.length)];
        }
        
        // 模拟燃油消耗
        if (this.data.speed > 0) {
            this.data.fuelLevel -= 0.001;
            this.data.odometer += this.data.speed / 36000; // 简化的里程计算
        }
        
        // 模拟温度变化
        if (this.data.rpm > 3000) {
            this.data.engineTemp += 0.1;
        } else if (this.data.engineTemp > 85) {
            this.data.engineTemp -= 0.05;
        }
        
        // 模拟警告
        this.data.warnings.engine = this.data.engineTemp > 105;
        this.data.warnings.oil = Math.random() < 0.001;
        this.data.warnings.battery = this.data.fuelLevel < 10;
        
        this.data.updateData(this.data);
    }

    // 重置仪表盘
    resetDashboard() {
        this.stopEngine();
        this.data = new DashboardData();
        this.setupDataBinding();
        this.updateDisplay();
    }
}

// WebSocket连接类（用于实际CAN数据）
class CANDataConnection {
    constructor(dashboard) {
        this.dashboard = dashboard;
        this.websocket = null;
        this.reconnectInterval = null;
    }

    // 连接到CAN数据服务器
    connect(url = 'ws://localhost:8080/can-data') {
        try {
            this.websocket = new WebSocket(url);
            
            this.websocket.onopen = () => {
                console.log('CAN数据连接已建立');
                this.clearReconnectInterval();
            };
            
            this.websocket.onmessage = (event) => {
                try {
                    const canData = JSON.parse(event.data);
                    this.processCANData(canData);
                } catch (error) {
                    console.error('CAN数据解析错误:', error);
                }
            };
            
            this.websocket.onclose = () => {
                console.log('CAN数据连接已断开');
                this.scheduleReconnect();
            };
            
            this.websocket.onerror = (error) => {
                console.error('CAN数据连接错误:', error);
            };
            
        } catch (error) {
            console.error('无法连接到CAN数据服务器:', error);
            this.scheduleReconnect();
        }
    }

    // 处理CAN数据
    processCANData(canData) {
        // 根据CAN消息ID和信号名称更新仪表盘数据
        const updates = {};
        
        if (canData.messageId === 'EngineData') {
            if (canData.signals.EngSpeed !== undefined) {
                updates.rpm = canData.signals.EngSpeed;
            }
            if (canData.signals.EngTemp !== undefined) {
                updates.engineTemp = canData.signals.EngTemp;
            }
            if (canData.signals.PetrolLevel !== undefined) {
                updates.fuelLevel = canData.signals.PetrolLevel;
            }
        }
        
        if (canData.messageId === 'ABSdata') {
            if (canData.signals.CarSpeed !== undefined) {
                updates.speed = canData.signals.CarSpeed;
            }
        }
        
        if (canData.messageId === 'GearBoxInfo') {
            if (canData.signals.Gear !== undefined) {
                updates.gear = this.mapGearValue(canData.signals.Gear);
            }
        }
        
        if (Object.keys(updates).length > 0) {
            this.dashboard.data.updateData(updates);
        }
    }

    // 映射档位数值到字符
    mapGearValue(gearValue) {
        const gearMap = {
            0: 'P',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: 'R',
            8: 'N',
            9: 'D'
        };
        return gearMap[gearValue] || 'P';
    }

    // 安排重连
    scheduleReconnect() {
        if (this.reconnectInterval) return;
        
        this.reconnectInterval = setInterval(() => {
            console.log('尝试重新连接CAN数据服务器...');
            this.connect();
        }, 5000);
    }

    // 清除重连定时器
    clearReconnectInterval() {
        if (this.reconnectInterval) {
            clearInterval(this.reconnectInterval);
            this.reconnectInterval = null;
        }
    }

    // 断开连接
    disconnect() {
        this.clearReconnectInterval();
        if (this.websocket) {
            this.websocket.close();
            this.websocket = null;
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 创建仪表盘实例
    const dashboard = new Dashboard();
    
    // 创建CAN数据连接（可选）
    const canConnection = new CANDataConnection(dashboard);
    
    // 尝试连接到CAN数据服务器（如果可用）
    // canConnection.connect();
    
    // 全局暴露dashboard实例，便于调试
    window.dashboard = dashboard;
    window.canConnection = canConnection;
    
    console.log('智能动力总成仪表盘已初始化');
});