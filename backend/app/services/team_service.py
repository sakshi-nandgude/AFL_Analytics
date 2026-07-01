"""
team_service.py

Business logic for Team APIs.
"""

from sqlalchemy.orm import Session

from backend.app.models import TeamPerformance


def get_all_teams(db: Session):

    return (
        db.query(TeamPerformance)
        .order_by(TeamPerformance.team_name)
        .all()
    )


def get_team_by_id(team_id: int, db: Session):

    return (
        db.query(TeamPerformance)
        .filter(
            TeamPerformance.team_id == team_id
        )
        .first()
    )