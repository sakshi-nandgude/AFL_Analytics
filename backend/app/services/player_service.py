"""
player_service.py

Business logic for Player APIs.
"""

from sqlalchemy.orm import Session

from backend.app.models import PlayerSummary


def get_all_players(db: Session):

    return (
        db.query(PlayerSummary)
        .order_by(PlayerSummary.player_name)
        .all()
    )


def get_player_by_id(player_id: int, db: Session):

    return (
        db.query(PlayerSummary)
        .filter(
            PlayerSummary.player_id == player_id
        )
        .first()
    )