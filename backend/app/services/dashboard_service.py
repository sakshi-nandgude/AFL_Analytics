"""
dashboard_service.py

Contains business logic for the dashboard.
"""

from sqlalchemy.orm import Session

from app.models import DashboardSummary


def get_dashboard_summary(db: Session):

    return db.query(DashboardSummary).first()