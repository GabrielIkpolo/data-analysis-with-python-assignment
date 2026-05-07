from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import health, models, diabetes, recovery

app = FastAPI(
    title="Medical ML API",
    description="API for diabetes prediction and patient recovery forecasting",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(models.router, prefix="/api", tags=["Models"])
app.include_router(diabetes.router, prefix="/api", tags=["Diabetes"])
app.include_router(recovery.router, prefix="/api", tags=["Recovery"])


@app.get("/")
async def root():
    return {
        "message": "Medical ML API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "models": "/api/models/info",
            "diabetes": "/api/predict/diabetes",
            "recovery": "/api/predict/recovery",
        },
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
