# Clinical Intelligence System: AI-Powered Medical Diagnostics & Ward Management

This repository contains a production-ready, full-stack machine learning system designed for clinical decision support. The project integrates predictive modeling with a modern web architecture to assist healthcare professionals in managing patient risks and hospital resources.

## 🚀 Project Overview

The system implements two primary clinical intelligence modules:

### 1. Metabolic Syndrome - Diabetes Risk Predictor
* **Objective:** Early identification of patients at risk of Type 2 Diabetes.
* **Model Type:** Supervised Classification (Decision Tree).
* **Key Features:** BMI, Fasting Blood Sugar, Systolic/Diastolic Blood Pressure, Age, and Lifestyle factors.
* **Clinical Focus:** Optimized for **High Recall** to ensure that potential diabetic patients are not missed (minimizing False Negatives).

### 2. Clinical Malaria Forecaster
* **Objective:** Optimization of hospital bed management and resource allocation.
* **Model Type:** Supervised Regression.
* **Key Features:** Admission Temperature, Parasite Density, Treatment Protocol, and Age.
* **Clinical Focus:** Provides highly accurate predictions of **Recovery Days** to assist ward managers in scheduling and bed occupancy planning.

---

## 🛠 System Architecture

The system follows a decoupled, microservices-ready architecture:

* **Backend (API Layer):** A high-performance **FastAPI** server that manages model loading, data validation (via **Pydantic**), and real-time inference.
* **Frontend (User Interface):** A responsive, interactive dashboard built with **React.js**, designed for ease of use in fast-paced clinical environments.
* **Containerization:** Fully containerized using **Docker** and **Docker Compose** for seamless deployment and environmental consistency.

---

## ⚙️ Installation & Running

You can run the system using two methods: Manual Local Setup (best for development) or Containerized Deployment (best for production).

### Option 1: Manual Local Setup (Development Mode)

Use this method if you want to modify the code or debug individual components.

#### **Step 1: Start the Backend Server**
1. Open a new terminal.
2. Navigate to the backend directory:
   ```bash
   cd medical-ml-app/backend
   ```
3. Create and activate a virtual environment:
   ```bash
   # On macOS/Linux:
   python3 -m venv venv
   source venv/bin/activate

   # On Windows:
   python -m venv venv
   venv\Scripts\activate
   ```
4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Launch the FastAPI server using `uvicorn`:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   *The API will be available at `http://localhost:8000` and documentation at `http://localhost:8000/docs`.*

#### **Step 2: Start the Frontend Dashboard**
1. Open a **second** terminal.
2. Navigate to the frontend directory:
   ```bash
   cd medical-ml-app/frontend
   ```
3. Install the Node.js dependencies:
   ```bash
   npm install
   ```
4. Launch the React development server:
   ```bash
   npm run dev
   ```
   *The dashboard will be available at `http://localhost:5173` (or the URL shown in your terminal).*

---

### Option 2: Containerized Deployment (Production Mode)

This is the most efficient way to run the entire system with a single command. It ensures that the backend, frontend, and all dependencies are perfectly synchronized.

**Prerequisites:** Docker and Docker Compose must be installed.

1. Navigate to the `medical-ml-app` directory:
   ```bash
   cd medical-ml-app
   ```
2. Build and start all containers:
   ```bash
   docker-compose up --build
   ```
3. Access the application:
   * **Frontend Dashboard:** [http://localhost:5173](http://localhost:5173)
   * **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📁 Project Structure

```text
├── diabetes-risk-prediction.ipynb  # Project 1: Research & Training
├── clinical-forecaster.ipynb       # Project 2: Research & Training
├── medical-ml-app/                 # Full-Stack Production App
│   ├── backend/                    # FastAPI Server & Models
│   │   ├── app/                    # API Logic & Routes
│   │   ├── diabetes_predictor.pkl  # Serialized Model 1
│   │   ├── clinical_forecaster_pipeline.pkl # Serialized Model 2
│   │   └── Dockerfile              # Backend Container
│   ├── frontend/                   # React.js Dashboard
│   │   ├── src/                    # UI Components & Pages
│   │   └── Dockerfile              # Frontend Container
│   └── docker-compose.yml          # Multi-container Orchestration
└── README-SIWES.md                 # SIWES Report Documentation
```

---

## 📈 Key Technical Achievements

* **High-Fidelity Modeling:** Achieved strong performance metrics including high **Recall** for diabetes diagnosis and low **MAPE** for malaria recovery forecasting.
* **Production-Grade API:** Implemented a scalable, validated RESTful API using **FastAPI** and **Pydantic**.
* **Robust Deployment:** Demonstrated end-to-end containerization with **Docker**, ensuring it works consistently across devices.

---
*Developed as part of the SIWES training program at New Horizons Nigeria.*
