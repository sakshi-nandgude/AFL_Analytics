from fastapi import APIRouter, Depends
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
        "Returns match-level analytics including season, round, "
        "teams, scores, winning margin, total score, and winner."
    ),
)
def read_matches(
    db: Session = Depends(get_db)
):

    return get_matches(db)