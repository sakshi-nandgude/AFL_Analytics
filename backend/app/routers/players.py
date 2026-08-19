"""
players.py

Player API Router.
"""

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query
)
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas import PlayerSummarySchema

from app.services.player_service import (
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
    search: str | None = Query(
        default=None
    ),
    team: str | None = Query(
        default=None
    ),
    position: str | None = Query(
        default=None
    ),
    sort_by: str = Query(
        default="player_name"
    ),
    sort_order: str = Query(
        default="asc"
    ),
    db: Session = Depends(get_db)
):

    return get_all_players(
        db=db,
        search=search,
        team=team,
        position=position,
        sort_by=sort_by,
        sort_order=sort_order
    )


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