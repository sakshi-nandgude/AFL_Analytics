"""
dashboard.py

Dashboard API endpoints.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database import get_db

from backend.app.schemas import DashboardSummarySchema

from backend.app.services.dashboard_service import (
    get_dashboard_summary
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get(
    "/",
    response_model=DashboardSummarySchema
)
def dashboard(db: Session = Depends(get_db)):

    return get_dashboard_summary(db)