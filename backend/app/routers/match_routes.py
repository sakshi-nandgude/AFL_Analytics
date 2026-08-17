from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import MatchSummarySchema
from app.services.match_service import get_matches

router = APIRouter(
    prefix="/matches",
    tags=["Matches"]
)


@router.get(
    "/",
    response_model=list[MatchSummarySchema],
    summary="Get Match Summaries",
    description=(
        "Returns paginated AFL match analytics with optional "
        "season, team, winner, and sorting filters."
    ),
)
def read_matches(
    page: int = Query(
        1,
        ge=1,
        description="Page number"
    ),

    size: int = Query(
        50,
        ge=1,
        le=100,
        description="Number of matches per page"
    ),

    season: int | None = Query(
        None,
        description="Filter by season"
    ),

    team: str | None = Query(
        None,
        description="Filter by home or away team"
    ),

    winner: str | None = Query(
        None,
        description="Filter by winning team"
    ),

    sort_by: str = Query(
        "season",
        description="Field used for sorting"
    ),

    sort_order: str = Query(
        "desc",
        pattern="^(asc|desc)$",
        description="Sort direction"
    ),

    db: Session = Depends(get_db)
):

    return get_matches(
        db=db,
        page=page,
        size=size,
        season=season,
        team=team,
        winner=winner,
        sort_by=sort_by,
        sort_order=sort_order
    )