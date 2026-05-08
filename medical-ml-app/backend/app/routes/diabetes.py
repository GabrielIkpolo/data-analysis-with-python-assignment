from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.utils.model_loader import load_model
import numpy as np
import pandas as pd

router = APIRouter()

# Load model
diabetes_model = None


def load_diabetes_model():
    global diabetes_model
    if diabetes_model is None:
        try:
            diabetes_model = load_model("diabetes_predictor.pkl")
            print("✓ Diabetes model loaded successfully")
        except Exception as e:
            print(f"✗ Error loading diabetes model: {e}")
            raise HTTPException(status_code=500, detail="Failed to load diabetes model")


# Request validation model
class DiabetesRequest(BaseModel):
    Age: float
    BMI: float
    Systolic_BP: float
    Diastolic_BP: float
    Hypertension: bool
    Obesity: bool


class DiabetesResponse(BaseModel):
    prediction: str
    probability: float
    confidence: str


@router.post("/predict/diabetes", response_model=DiabetesResponse)
async def predict_diabetes(request: DiabetesRequest):
    """Predict diabetes risk based on patient vitals"""
    try:
        load_diabetes_model()

        # Prepare features in the same order as training
        input_df = pd.DataFrame([{
            "Age": request.Age,
            "BMI": request.BMI,
            "Systolic_BP": request.Systolic_BP,
            "Diastolic_BP": request.Diastolic_BP,
            "Hypertension": 1 if request.Hypertension else 0,
            "Obesity": 1 if request.Obesity else 0
        }])

        # Get prediction
        prediction = diabetes_model.predict(input_df)[0]
        probability = diabetes_model.predict_proba(input_df)[0, 1] if hasattr(
            diabetes_model, "predict_proba"
        ) else 0.5

        # Determine risk level
        if probability >= 0.7:
            prediction_text = "High Risk"
            confidence = "High"
        elif probability >= 0.5:
            prediction_text = "Moderate Risk"
            confidence = "Medium"
        else:
            prediction_text = "Low Risk"
            confidence = "High"

        return {
            "prediction": prediction_text,
            "probability": float(probability),
            "confidence": confidence,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )
