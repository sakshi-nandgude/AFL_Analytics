"""
database.py

Creates SQLAlchemy engine and session.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from etl.config import DATABASE_URL

# Create SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    echo=False
)

# Session Factory
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)


def get_session():
    """
    Returns a new database session.
    """
    return SessionLocal()