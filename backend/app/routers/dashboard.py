"""
dashboard.py

Dashboard API endpoints.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas import DashboardSummarySchema

from app.services.dashboard_service import (
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