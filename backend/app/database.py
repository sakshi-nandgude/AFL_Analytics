"""
Database Connection for FastAPI
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import DATABASE_URL

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)


def get_db():
    """
    FastAPI dependency.
    Creates a database session for each request.
    """

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()