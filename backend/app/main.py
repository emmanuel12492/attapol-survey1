from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .routers import auth, surveys
from .database import engine
from . import models
import logging
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Survey API")

# Configure CORS with environment-based origins
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://attapol-survey1.vercel.app")
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    FRONTEND_URL,
    "https://attapol-survey1-emmanuel12492.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health_check():
    try:
        # Test database connection
        await engine.connect()
        return {
            "status": "healthy",
            "message": "Survey API is running",
            "database": "connected",
            "environment": os.getenv("ENVIRONMENT", "production")
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "status": "unhealthy",
                "message": "Service is experiencing issues",
                "error": str(e)
            }
        )

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    logger.error(f"HTTP error occurred: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unexpected error occurred: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error", "detail": str(exc)}
    )

# Include routers
app.include_router(auth.router)
app.include_router(surveys.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Survey API"}
