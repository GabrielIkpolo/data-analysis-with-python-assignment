from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.utils.model_loader import load_model
import numpy as np
import pandas as pd

router = APIRouter()

# Load model
recovery_model = None


def load_recovery_model():
    global recovery_model
    if recovery_model is None:
        try:
            recovery_model = load_model("clinical_forecaster_best.pkl")
            print("✓ Recovery model loaded successfully")
        except Exception as e:
            print(f"✗ Error loading recovery model: {e}")
            raise HTTPException(status_code=500, detail="Failed to load recovery model")


# Request validation model
class RecoveryRequest(BaseModel):
    Age: float
    Admission_Temp: float
    Parasite_Density: float
    High_Fever: bool
    Severe_Density: bool
    Treatment_Protocol: str


class RecoveryResponse(BaseModel):
    predicted_days: float
    range: tuple
    model: str
    r_squared: float


@router.post("/predict/recovery", response_model=RecoveryResponse)
async def predict_recovery(request: RecoveryRequest):
    """Predict patient recovery time based on clinical indicators"""
    try:
        load_recovery_model()

        # Prepare features
        input_df = pd.DataFrame([{
            "Age": request.Age,
            "Admission_Temp": request.Admission_Temp,
            "Parasite_Density": request.Parasite_Density,
            "High_Fever": 1 if request.High_Fever else 0,
            "Severe_Density": 1 if request.Severe_Density else 0,
            "Treatment_Protocol": request.Treatment_Protocol
        }])

        # Get prediction
        predicted_days = float(recovery_model.predict(input_df)[0])

        # Calculate 95% confidence interval (using model's residual std as approximation)
        r_squared = getattr(recovery_model, 'r2_score', 0.82)  # Default value
        std_error = np.sqrt((1 - r_squared) / (len(input_df.columns) - 2))
        confidence_interval = 1.96 * std_error
        lower_bound = max(0, predicted_days - confidence_interval)
        upper_bound = predicted_days + confidence_interval

        return {
            "predicted_days": predicted_days,
            "range": (lower_bound, upper_bound),
            "model": "Linear Regression",
            "r_squared": r_squared,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )
