"""
SQLAlchemy Models for Analytics Views
"""

from sqlalchemy import (
    Column,
    Integer,
    Float,
    String
)

from sqlalchemy.orm import declarative_base

Base = declarative_base()


# ==========================================================
# Dashboard Summary View
# ==========================================================

class DashboardSummary(Base):

    __tablename__ = "vw_dashboard_summary"

    total_teams = Column(Integer, primary_key=True)

    total_players = Column(Integer)

    total_matches = Column(Integer)

    avg_home_score = Column(Float)

    avg_away_score = Column(Float)

    avg_total_score = Column(Float)


# ==========================================================
# Team Performance View
# ==========================================================

class TeamPerformance(Base):

    __tablename__ = "vw_team_performance"

    team_id = Column(Integer, primary_key=True)

    team_name = Column(String)

    matches_played = Column(Integer)

    wins = Column(Integer)

    losses = Column(Integer)

    draws = Column(Integer)

    win_percentage = Column(Float)

    points_for = Column(Integer)

    points_against = Column(Integer)

    average_score = Column(Float)

    average_conceded = Column(Float)


# ==========================================================
# Player Summary View
# ==========================================================

class PlayerSummary(Base):

    __tablename__ = "vw_player_summary"

    player_id = Column(Integer, primary_key=True)

    player_name = Column(String)

    team_name = Column(String)

    position = Column(String)

    matches_played = Column(Integer)

    total_goals = Column(Integer)

    total_marks = Column(Integer)

    total_tackles = Column(Integer)

    total_disposals = Column(Integer)

    avg_goals = Column(Float)

    avg_disposals = Column(Float)


# ==========================================================
# Team Rankings View
# ==========================================================

class TeamRanking(Base):

    __tablename__ = "vw_team_rankings"

    team_id = Column(Integer, primary_key=True)

    team_name = Column(String)

    wins = Column(Integer)

    losses = Column(Integer)

    win_percentage = Column(Float)

    average_score = Column(Float)

    team_rank = Column(Integer)


# ==========================================================
# Match Summary View
# ==========================================================

class MatchSummary(Base):

    __tablename__ = "vw_match_summary"

    match_id = Column(Integer, primary_key=True)

    season_year = Column(Integer)

    round_number = Column(Integer)

    match_date = Column(String)

    home_team = Column(String)

    away_team = Column(String)

    home_score = Column(Integer)

    away_score = Column(Integer)

    winner = Column(String)