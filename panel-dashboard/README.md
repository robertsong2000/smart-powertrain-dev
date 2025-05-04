# CANoe Virtual Dashboard Panel – Automotive Simulation

This project showcases a **custom automotive dashboard** built using **Vector CANoe /pro DE** panel designer, intended for simulation and testing of in-vehicle networks and diagnostics.

## 🚗 Dashboard Overview

The panel simulates a real-time vehicle cluster with the following components:

- **Speedometer** (mph)
- **Tachometer** (RPM)
- **Gear Indicator** (0–6)
- **Fuel Gauge** (E to F)
- **Engine Warning Icon**
- **Driver Tag Display** (branding)

### 📸 Panel Screenshot
![Dashboard Panel](./dashboard_screenshot.png)

## Signals Simulated

The panel is connected to a simulated CAN configuration (`.cfg`) and reads the following signals:

| Signal Name        | Description                   | Range / Unit    |
|--------------------|-------------------------------|-----------------|
| `VehicleSpeed`     | Speed in miles per hour       | 0–300 mph       |
| `EngineRPM`        | Engine rotation speed         | 0–10,000 rpm    |
| `GearPosition`     | Current gear of transmission  | 0–6             |
| `FuelLevel`        | Fuel level from sensor        | 0–100 %         |
| `EngineWarning`    | Engine system alert           | On / Off        |

*(Screenshots of the signal graph and trace windows are included below.)*

## Signal Graph Snapshots
![Engine_Data_Graph](./signal_graph.png)

## ⚙️ Technologies Used

- Vector **CANoe /pro DE**
- **Panel Designer** with custom indicators
- **CAPL** scripting for signal logic
- Diagnostic Console

## Folder Structure

```
CANoeDashboard/
├── Panel.XVP              # CANoe configuration file
├── README.md              # Documentation
├── dashboard_screenshot.png
├── signal_graph.png
```

## Key Learning

- Design and integration of real-time vehicle dashboards
- Signal-to-panel data mapping
- UI layout and indicator behavior logic in CANoe
- Visualization for testing embedded ECUs
