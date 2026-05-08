import joblib
import pandas as pd
import numpy as np
import os

# Mock the environment
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "clinical_forecaster_best.pkl")

try:
    print(f"Loading model from {model_path}")
    model = joblib.load(model_path)
    print("Model loaded successfully")
    
    # Mock request data
    data = {
        "Age": 30.0,
        "Admission_Temp": 38.5,
        "Parasite_Density": 1000.0,
        "High_Fever": True,
        "Severe_Density": False,
        "Treatment_Protocol": "ACT_Only"
    }
    
    input_df = pd.DataFrame([{
        "Age": data["Age"],
        "Admission_Temp": data["Admission_Temp"],
        "Parasite_Density": data["Parasite_Density"],
        "High_Fever": 1 if data["High_Fever"] else 0,
        "Severe_Density": 1 if data["Severe_Density"] else 0,
        "Treatment_Protocol": data["Treatment_Protocol"]
    }])
    
    print("Input DataFrame:")
    print(input_df)
    
    print("Predicting...")
    prediction = model.predict(input_df)
    print(f"Prediction: {prediction}")
    
    # Check r_squared and std_error calculation
    r_squared = getattr(model, 'r2_score', 0.82)
    print(f"r_squared: {r_squared}")
    
    std_error = np.sqrt((1 - r_squared) / (len(input_df.columns) - 2))
    print(f"std_error: {std_error}")
    
    confidence_interval = 1.96 * std_error
    print(f"confidence_interval: {confidence_interval}")

except Exception as e:
    import traceback
    traceback.print_exc()
