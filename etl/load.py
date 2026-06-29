"""
load.py

Loads transformed data into PostgreSQL using SQLAlchemy ORM.
"""

from datetime import datetime

from sqlalchemy import text

from database.models import (
    Team,
    Season,
    Player,
    Match,
    PlayerStat
)


# ==========================================================
# Clear Database
# ==========================================================

def clear_database(session):
    """
    Clears all tables in the correct order.
    """

    session.execute(text("""
        TRUNCATE TABLE
            fact_player_stats,
            fact_matches,
            dim_players,
            dim_seasons,
            dim_teams
        RESTART IDENTITY CASCADE;
    """))

    session.commit()

    print("Database cleared successfully.\n")


# ==========================================================
# Teams
# ==========================================================

def load_teams(session, teams_df):

    teams = []

    for _, row in teams_df.iterrows():

        teams.append(

            Team(
                team_id=int(row["team_id"]),
                team_name=row["team_name"],
                rating=int(row["rating"])
            )

        )

    session.add_all(teams)
    session.commit()

    print(f"Loaded {len(teams)} Teams")


# ==========================================================
# Seasons
# ==========================================================

def load_seasons(session):

    seasons = [

        Season(
            season_id=1,
            season_year=2023
        ),

        Season(
            season_id=2,
            season_year=2024
        ),

        Season(
            season_id=3,
            season_year=2025
        )

    ]

    session.add_all(seasons)
    session.commit()

    print("Loaded 3 Seasons")


# ==========================================================
# Players
# ==========================================================

def load_players(session, players_df):

    players = []

    for _, row in players_df.iterrows():

        players.append(

            Player(

                player_id=int(row["player_id"]),
                player_name=row["player_name"],
                team_id=int(row["team_id"]),
                position=row["position"]

            )

        )

    session.add_all(players)
    session.commit()

    print(f"Loaded {len(players)} Players")


# ==========================================================
# Matches
# ==========================================================

def load_matches(session, matches_df):

    season_lookup = {

        2023: 1,
        2024: 2,
        2025: 3

    }

    matches = []

    for _, row in matches_df.iterrows():

        matches.append(

            Match(

                match_id=int(row["match_id"]),

                season_id=season_lookup[int(row["season"])],

                round_number=int(row["round_number"]),

                match_date=datetime.strptime(
                    str(row["match_date"]),
                    "%Y-%m-%d"
                ).date(),

                home_team_id=int(row["home_team_id"]),

                away_team_id=int(row["away_team_id"]),

                home_score=int(row["home_score"]),

                away_score=int(row["away_score"]),

                winner_team_id=int(row["winner_team_id"])

            )

        )

    session.add_all(matches)
    session.commit()

    print(f"Loaded {len(matches)} Matches")


# ==========================================================
# Player Stats
# ==========================================================

def load_player_stats(session, stats_df):

    stats = []

    for _, row in stats_df.iterrows():

        stats.append(

            PlayerStat(

                player_id=int(row["player_id"]),

                match_id=int(row["match_id"]),

                goals=int(row["goals"]),

                marks=int(row["marks"]),

                tackles=int(row["tackles"]),

                disposals=int(row["disposals"])

            )

        )

    session.add_all(stats)
    session.commit()

    print(f"Loaded {len(stats)} Player Stats")