"""
FastAPI Entry Point
"""

from fastapi import FastAPI

app = FastAPI(
    title="AFL Performance Analytics API",
    version="1.0.0",
    description="Backend API for AFL Performance Analytics Portal"
)


@app.get("/")
def root():

    return {

        "application": "AFL Performance Analytics Portal",

        "status": "Running"

    }