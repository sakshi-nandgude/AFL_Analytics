"""
team_service.py

Business logic for Team APIs.
"""

from sqlalchemy.orm import Session

from app.models import TeamPerformance


def get_all_teams(
    db: Session,
    sort_by: str = "team_name",
    sort_order: str = "asc",
    search: str | None = None
):

    allowed_sort_fields = {
        "team_name": TeamPerformance.team_name,
        "matches_played": TeamPerformance.matches_played,
        "wins": TeamPerformance.wins,
        "losses": TeamPerformance.losses,
        "draws": TeamPerformance.draws,
        "win_percentage": TeamPerformance.win_percentage,
        "points_for": TeamPerformance.points_for,
        "points_against": TeamPerformance.points_against,
        "average_score": TeamPerformance.average_score,
        "average_conceded": TeamPerformance.average_conceded
    }

    sort_column = allowed_sort_fields.get(
        sort_by,
        TeamPerformance.team_name
    )

    query = db.query(TeamPerformance)

    if search:
        query = query.filter(
            TeamPerformance.team_name.ilike(
                f"%{search}%"
            )
        )

    if sort_order == "desc":
        sort_column = sort_column.desc()
    else:
        sort_column = sort_column.asc()

    return (
        query
        .order_by(sort_column)
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