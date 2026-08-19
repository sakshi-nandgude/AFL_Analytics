"""
player_service.py

Business logic for Player APIs.
"""

from sqlalchemy.orm import Session

from app.models import PlayerSummary


def get_all_players(
    db: Session,
    search: str | None = None,
    team: str | None = None,
    position: str | None = None,
    sort_by: str = "player_name",
    sort_order: str = "asc"
):

    allowed_sort_fields = {
        "player_name": PlayerSummary.player_name,
        "team_name": PlayerSummary.team_name,
        "position": PlayerSummary.position,
        "matches_played": PlayerSummary.matches_played,
        "total_goals": PlayerSummary.total_goals,
        "total_marks": PlayerSummary.total_marks,
        "total_tackles": PlayerSummary.total_tackles,
        "total_disposals": PlayerSummary.total_disposals,
        "avg_goals": PlayerSummary.avg_goals,
        "avg_disposals": PlayerSummary.avg_disposals
    }

    sort_column = allowed_sort_fields.get(
        sort_by,
        PlayerSummary.player_name
    )

    query = db.query(PlayerSummary)

    if search:
        query = query.filter(
            PlayerSummary.player_name.ilike(
                f"%{search}%"
            )
        )

    if team:
        query = query.filter(
            PlayerSummary.team_name.ilike(
                f"%{team}%"
            )
        )

    if position:
        query = query.filter(
            PlayerSummary.position.ilike(
                f"%{position}%"
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


def get_player_by_id(
    player_id: int,
    db: Session
):

    return (
        db.query(PlayerSummary)
        .filter(
            PlayerSummary.player_id == player_id
        )
        .first()
    )