# Energy Monitoring Backend Service

Backend service for Energy Monitoring Dashboard at PT Ravelware Technology Indonesia.

This service receives energy data from power meter panels via MQTT,
stores time-series data in InfluxDB, and exposes REST APIs for dashboard consumption.

---

## Tech Stack

-   Node.js (Express)
-   MQTT (Mosquitto)
-   InfluxDB OSS v2
-   REST API (JSON)

---

## System Overview

-   3 electrical panels (one per floor)
-   Data sent every ±1 minute via MQTT
-   Backend stores and processes data
-   Dashboard consume API

---

## Architecture

Sensor Simulator (MQTT Publisher) → MQTT Broker → Backend Service → REST API → Web Dashboard

---

## Features

-   Receive realtime energy data via MQTT
-   Store time-series data in InfluxDB
-   Detect panel ONLINE / OFFLINE status
-   Calculate today's energy usage and cost
-   Provide dashboard endpoint

---

## API Endpoints

### Dashboard Overview

`GET /api/dashboard/overview`

Response:

```json
{
    "panels": [
        {
            "panelId": "PANEL_LANTAI_1",
            "status": "ONLINE",
            "voltageAvg": 153.4,
            "currentAvg": 0.44,
            "kw": 3.68,
            "todayUsage": 24.28,
            "todayCost": 36420
        }
    ],
    "totalTodayUsage": 72.5,
    "totalTodayCost": 108750
}
```

---

# How to Run

1. Setup InfluxDB
2. Setup Environment
3. Install Dependecies
   `npm install`
4. Run Backend
   `node src/app.js`
5. Run Sensor Simulator
   `node src/simulator/sensorPublisher.js`

Notes:

-   Panel status is marked OFFLINE if no data is received for more than 5 minutes.
-   Electricity cost is calculated using tarrif: Rp. 1.500/kWh.
