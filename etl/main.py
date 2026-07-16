"""
main.py

Main ETL Pipeline
"""

from etl.database import get_session
from database.models import Base
from etl.database import engine

# Create database tables if they do not exist
Base.metadata.create_all(bind=engine)

from etl.extract import (
    extract_teams,
    extract_players,
    extract_matches,
    extract_player_stats
)

from etl.transform import (
    transform_teams,
    transform_players,
    transform_matches,
    transform_player_stats
)

from etl.load import (
    clear_database,
    load_teams,
    load_seasons,
    load_players,
    load_matches,
    load_player_stats
)


def run_etl():

    session = get_session()

    try:

        print("=" * 60)
        print(" AFL PERFORMANCE ANALYTICS ETL ")
        print("=" * 60)

        # ----------------------------
        # Extract
        # ----------------------------

        print("\nExtracting Data...")

        teams = extract_teams()
        players = extract_players()
        matches = extract_matches()
        stats = extract_player_stats()

        print("Extraction Complete")

        # ----------------------------
        # Transform
        # ----------------------------

        print("\nTransforming Data...")

        teams = transform_teams(teams)

        players = transform_players(players, teams)

        matches = transform_matches(matches, teams)

        stats = transform_player_stats(
            stats,
            players,
            matches
        )

        print("Transformation Complete")

        # ----------------------------
        # Load
        # ----------------------------

        print("\nLoading Data...")

        clear_database(session)

        load_teams(session, teams)
        load_seasons(session)
        load_players(session, players)
        load_matches(session, matches)
        load_player_stats(session, stats)

        print("\nETL Completed Successfully!")

    except Exception as e:

        session.rollback()

        print("\nETL FAILED")

        print(e)

    finally:

        session.close()

        print("\nDatabase Session Closed")


if __name__ == "__main__":
    run_etl()