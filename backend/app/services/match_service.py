import math

from sqlalchemy.orm import Session

from app.models import MatchSummary


def get_matches(
    db: Session,
    page: int = 1,
    size: int = 50,
    season: int | None = None,
    team: str | None = None,
    winner: str | None = None,
    sort_by: str = "season",
    sort_order: str = "desc"
):

    query = db.query(MatchSummary)

    # Season filter
    if season is not None:
        query = query.filter(
            MatchSummary.season == season
        )

    # Team filter
    if team:
        search = f"%{team}%"

        query = query.filter(
            (MatchSummary.home_team.ilike(search)) |
            (MatchSummary.away_team.ilike(search))
        )

    # Winner filter
    if winner:
        query = query.filter(
            MatchSummary.winner.ilike(f"%{winner}%")
        )

    # Allowed sorting fields
    allowed_sort_fields = {
        "season": MatchSummary.season,
        "round": MatchSummary.round,
        "home_score": MatchSummary.home_score,
        "away_score": MatchSummary.away_score,
        "winning_margin": MatchSummary.winning_margin,
        "total_score": MatchSummary.total_score
    }

    sort_column = allowed_sort_fields.get(
        sort_by,
        MatchSummary.season
    )

    if sort_order.lower() == "asc":
        query = query.order_by(sort_column.asc())
    else:
        query = query.order_by(sort_column.desc())

    # Total records before pagination
    total = query.count()

    # Pagination
    offset = (page - 1) * size

    matches = (
        query
        .offset(offset)
        .limit(size)
        .all()
    )

    pages = math.ceil(total / size) if total > 0 else 0

    return {
        "data": matches,
        "page": page,
        "size": size,
        "total": total,
        "pages": pages
    }