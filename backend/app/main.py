"""
FastAPI Entry Point
"""

from fastapi import FastAPI

from backend.app.routers.dashboard import router as dashboard_router
from backend.app.routers.teams import router as teams_router

app = FastAPI(
    title="AFL Performance Analytics API",
    description="REST API for AFL Performance Analytics Portal",
    version="1.0.0"
)


@app.get("/")
def home():

    return {

        "application": "AFL Performance Analytics Portal",

        "status": "Running"

    }


@app.get("/health")
def health():

    return {

        "status": "Healthy"

    }


app.include_router(dashboard_router)
app.include_router(teams_router)