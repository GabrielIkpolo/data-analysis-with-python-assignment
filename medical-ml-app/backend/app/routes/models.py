from fastapi import APIRouter
from app.utils.model_loader import load_model_info

router = APIRouter()


@router.get("/models/info")
async def get_model_info():
    """Get information about loaded models"""
    return load_model_info()
