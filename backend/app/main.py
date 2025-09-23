from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, surveys
from .database import engine
from . import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Survey API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173/", "http://localhost:5174/"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(surveys.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Survey API"}
