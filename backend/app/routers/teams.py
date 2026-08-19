"""
teams.py

Team API Router.
"""

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Query

from app.database import get_db

from app.schemas import TeamPerformanceSchema

from app.services.team_service import (
    get_all_teams,
    get_team_by_id
)

router = APIRouter(
    prefix="/teams",
    tags=["Teams"]
)


@router.get(
    "/",
    response_model=list[TeamPerformanceSchema],
    summary="Get Team Performance",
    description=(
        "Returns aggregated performance metrics for all AFL teams, "
        "including wins, losses, draws, win percentage, scoring "
        "performance, and average scores."
    ),
)

def get_teams(
    sort_by: str = Query(
        default="team_name"
    ),
    sort_order: str = Query(
        default="asc"
    ),
    db: Session = Depends(get_db)
):  
    
    return get_all_teams(
    db=db,
    sort_by=sort_by,
    sort_order=sort_order
)


@router.get(
    "/{team_id}",
    response_model=TeamPerformanceSchema,
    summary="Get Team Performance by ID",
    description="Returns detailed performance metrics for a specific AFL team.",
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