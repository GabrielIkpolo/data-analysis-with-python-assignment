# Medical ML - Predictive Analytics Platform

A modern web interface for deploying medical ML models with React (Vite) frontend and FastAPI backend.

## Features

- **Diabetes Risk Prediction** - Predict diabetes risk based on patient vitals
- **Patient Recovery Forecast** - Predict expected hospital stay duration
- **Modern UI** - Beautiful, responsive interface with vanilla CSS
- **Fast API** - High-performance backend with CORS support
- **Model Serving** - Deployed pickle models with automatic preprocessing

## Tech Stack

- **Frontend**: React 18 + Vite + Vanilla CSS
- **Backend**: FastAPI + Uvicorn
- **ML Models**: scikit-learn (Decision Tree, Linear Regression)
- **Deployment**: Docker Compose

## Project Structure

```
medical-ml-app/
├── frontend/          # React + Vite application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page views
│   │   └── styles/        # Custom CSS
│   └── public/
├── backend/            # FastAPI application
│   ├── app/
│   │   ├── main.py        # Entry point
│   │   ├── routes/        # API endpoints
│   │   └── utils/         # Utilities
│   └── models/            # Model files
├── models/              # Original ML models
└── docker-compose.yml    # Orchestration
```

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Python 3.11+
- Docker & Docker Compose (optional)

### Using Docker Compose (Recommended)

```bash
# Start both frontend and backend
docker-compose up --build

# Open http://localhost:3000
```

### Manual Setup

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Access API docs at: http://localhost:8000/docs

#### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Access app at: http://localhost:5173

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/models/info` - Get model information
- `POST /api/predict/diabetes` - Predict diabetes risk
- `POST /api/predict/recovery` - Predict recovery time

## Models Used

1. **Diabetes Predictor** (Decision Tree)
   - Features: Age, BMI, Blood Pressure, Hypertension, Obesity
   - AUC: 0.82

2. **Recovery Forecaster** (Linear Regression)
   - Features: Age, Temperature, Parasite Density, Treatment Protocol
   - R²: 0.82

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Frontend
```bash
cd frontend
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
```

### Backend
```bash
cd backend
uvicorn app.main:app --reload
```

## License

MIT

## Contributing

Pull requests are welcome!
