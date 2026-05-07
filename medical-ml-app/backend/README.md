# Medical ML Backend

FastAPI application for serving ML models.

## Setup

```bash
uv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Open http://localhost:8000/docs to see interactive API documentation.

## Models

- `diabetes_predictor.pkl` - Decision Tree for diabetes classification
- `clinical_forecaster_best.pkl` - Linear Regression for recovery prediction
