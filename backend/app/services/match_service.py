from sqlalchemy.orm import Session

from app.models import MatchSummary


def get_matches(db: Session):

    return db.query(MatchSummary).all()