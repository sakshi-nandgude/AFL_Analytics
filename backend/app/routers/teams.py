"""
teams.py

Team API Router.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database import get_db

from backend.app.schemas import TeamPerformanceSchema

from backend.app.services.team_service import (
    get_all_teams,
    get_team_by_id
)

router = APIRouter(
    prefix="/teams",
    tags=["Teams"]
)


@router.get(
    "/",
    response_model=list[TeamPerformanceSchema]
)
def get_teams(
    db: Session = Depends(get_db)
):

    return get_all_teams(db)


@router.get(
    "/{team_id}",
    response_model=TeamPerformanceSchema
)
def get_team(
    team_id: int,
    db: Session = Depends(get_db)
):

    team = get_team_by_id(team_id, db)

    if team is None:

        raise HTTPException(
            status_code=404,
            detail="Team not found"
        )

    return team