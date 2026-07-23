"""
Pydantic Schemas

These schemas define the JSON responses
returned by the FastAPI endpoints.
"""

from pydantic import BaseModel
from datetime import date


# ==========================================================
# Dashboard
# ==========================================================

class DashboardSummarySchema(BaseModel):

    total_teams: int
    total_players: int
    total_matches: int
    avg_home_score: float
    avg_away_score: float
    avg_total_score: float

    class Config:
        from_attributes = True


# ==========================================================
# Team Performance
# ==========================================================

class TeamPerformanceSchema(BaseModel):

    team_id: int

    team_name: str

    matches_played: int

    wins: int

    losses: int

    draws: int

    win_percentage: float

    points_for: int

    points_against: int

    average_score: float

    average_conceded: float

    class Config:
        from_attributes = True


# ==========================================================
# Player Summary
# ==========================================================

class PlayerSummarySchema(BaseModel):

    player_id: int
    player_name: str
    team_name: str
    position: str

    matches_played: int

    total_goals: int
    total_marks: int
    total_tackles: int
    total_disposals: int

    avg_goals: float
    avg_disposals: float

    class Config:
        from_attributes = True


# ==========================================================
# Team Ranking
# ==========================================================

class TeamRankingSchema(BaseModel):

    team_id: int
    team_name: str

    wins: int
    losses: int

    win_percentage: float
    average_score: float

    team_rank: int

    class Config:
        from_attributes = True


# ==========================================================
# Match Summary
# ==========================================================

class MatchSummarySchema(BaseModel):

    match_id: int

    season_year: int

    round_number: int

    match_date: date

    home_team: str

    away_team: str

    home_score: int

    away_score: int

    winner: str

    class Config:
        from_attributes = True