"""
players.py

Player API Router.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database import get_db

from backend.app.schemas import PlayerSummarySchema

from backend.app.services.player_service import (
    get_all_players,
    get_player_by_id
)

router = APIRouter(
    prefix="/players",
    tags=["Players"]
)


@router.get(
    "/",
    response_model=list[PlayerSummarySchema]
)
def players(
    db: Session = Depends(get_db)
):

    return get_all_players(db)


@router.get(
    "/{player_id}",
    response_model=PlayerSummarySchema
)
def player(
    player_id: int,
    db: Session = Depends(get_db)
):

    player = get_player_by_id(player_id, db)

    if player is None:

        raise HTTPException(
            status_code=404,
            detail="Player not found"
        )

    return player