"""
main.py

Entry point for the AFL Performance Analytics API.
"""

from fastapi import FastAPI

app = FastAPI(
    title="AFL Performance Analytics API",
    description="REST API for AFL Performance Analytics Portal",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "application": "AFL Performance Analytics Portal",
        "status": "Running",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    return {
        "status": "Healthy"
    }