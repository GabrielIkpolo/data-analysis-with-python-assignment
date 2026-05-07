import os
import joblib

# BASE_DIR is /home/angelis/Desktop/NewHorizons/AdelekeUniversity/300L/nur-mls-assignment/medical-ml-app/backend
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def get_model_path(filename):
    """Get the full path to a model file in the backend directory"""
    return os.path.join(BASE_DIR, filename)

def load_model(filename):
    """Load a model using joblib from the backend directory"""
    path = get_model_path(filename)
    if not os.path.exists(path):
        raise FileNotFoundError(f"Model file {filename} not found at {path}")
    return joblib.load(path)

def load_model_info():
    """Load information about available models"""
    models_info = []

    # Check if backend directory contains .pkl files
    if os.path.exists(BASE_DIR) and os.path.isdir(BASE_DIR):
        files = os.listdir(BASE_DIR)
        for file in files:
            if file.endswith('.pkl'):
                try:
                    file_path = os.path.join(BASE_DIR, file)
                    models_info.append({
                        "name": file.replace('.pkl', ''),
                        "path": file_path,
                        "size": os.path.getsize(file_path)
                    })
                except Exception:
                    continue

    return {
        "models": models_info,
        "backend": "FastAPI",
        "status": "ready" if models_info else "no models loaded"
    }
