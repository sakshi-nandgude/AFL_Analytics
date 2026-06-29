"""
SQLAlchemy ORM Models

These models represent the PostgreSQL tables
used throughout the AFL Analytics project.
"""

from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    ForeignKey
)

from sqlalchemy.orm import declarative_base

Base = declarative_base()


# ==========================================================
# Teams
# ==========================================================

class Team(Base):

    __tablename__ = "dim_teams"

    team_id = Column(Integer, primary_key=True)
    team_name = Column(String(100), nullable=False)
    rating = Column(Integer, nullable=False)


# ==========================================================
# Seasons
# ==========================================================

class Season(Base):

    __tablename__ = "dim_seasons"

    season_id = Column(Integer, primary_key=True)
    season_year = Column(Integer, unique=True)


# ==========================================================
# Players
# ==========================================================

class Player(Base):

    __tablename__ = "dim_players"

    player_id = Column(Integer, primary_key=True)
    player_name = Column(String(100), nullable=False)

    team_id = Column(
        Integer,
        ForeignKey("dim_teams.team_id")
    )

    position = Column(String(30))


# ==========================================================
# Matches
# ==========================================================

class Match(Base):

    __tablename__ = "fact_matches"

    match_id = Column(Integer, primary_key=True)

    season_id = Column(
        Integer,
        ForeignKey("dim_seasons.season_id")
    )

    round_number = Column(Integer)

    match_date = Column(Date)

    home_team_id = Column(
        Integer,
        ForeignKey("dim_teams.team_id")
    )

    away_team_id = Column(
        Integer,
        ForeignKey("dim_teams.team_id")
    )

    home_score = Column(Integer)

    away_score = Column(Integer)

    winner_team_id = Column(
        Integer,
        ForeignKey("dim_teams.team_id")
    )


# ==========================================================
# Player Statistics
# ==========================================================

class PlayerStat(Base):

    __tablename__ = "fact_player_stats"

    stat_id = Column(
    Integer,
    primary_key=True,
    autoincrement=True
)

    player_id = Column(
        Integer,
        ForeignKey("dim_players.player_id")
    )

    match_id = Column(
        Integer,
        ForeignKey("fact_matches.match_id")
    )

    goals = Column(Integer)
    marks = Column(Integer)
    tackles = Column(Integer)
    disposals = Column(Integer)