"""
transform.py

Purpose:
    Validate and clean the extracted AFL datasets before loading them
    into PostgreSQL.
"""

import pandas as pd


# ==========================================================
# VALID VALUES
# ==========================================================

VALID_POSITIONS = {
    "Forward",
    "Midfielder",
    "Defender",
    "Ruck"
}

VALID_SEASONS = {
    2023,
    2024,
    2025
}


# ==========================================================
# TEAMS
# ==========================================================

def transform_teams(teams_df: pd.DataFrame) -> pd.DataFrame:
    """
    Validate teams dataset.
    """

    teams_df = teams_df.copy()

    # Check null values
    if teams_df.isnull().values.any():
        raise ValueError("Null values found in teams.csv")

    # Duplicate IDs
    if teams_df["team_id"].duplicated().any():
        raise ValueError("Duplicate team_id found.")

    # Duplicate Names
    if teams_df["team_name"].duplicated().any():
        raise ValueError("Duplicate team_name found.")

    # Rating validation
    if not teams_df["rating"].between(60, 100).all():
        raise ValueError("Invalid team rating detected.")

    return teams_df


# ==========================================================
# PLAYERS
# ==========================================================

def transform_players(
    players_df: pd.DataFrame,
    teams_df: pd.DataFrame
) -> pd.DataFrame:

    players_df = players_df.copy()

    # Null values
    if players_df.isnull().values.any():
        raise ValueError("Null values found in players.csv")

    # Duplicate IDs
    if players_df["player_id"].duplicated().any():
        raise ValueError("Duplicate player_id found.")

    # Position validation
    invalid_positions = set(players_df["position"]) - VALID_POSITIONS

    if invalid_positions:
        raise ValueError(
            f"Invalid positions: {invalid_positions}"
        )

    # Foreign key validation
    valid_team_ids = set(teams_df["team_id"])

    invalid_team = (
        ~players_df["team_id"].isin(valid_team_ids)
    ).any()

    if invalid_team:
        raise ValueError(
            "Invalid team_id found in players.csv"
        )

    return players_df


# ==========================================================
# MATCHES
# ==========================================================

def transform_matches(
    matches_df: pd.DataFrame,
    teams_df: pd.DataFrame
) -> pd.DataFrame:

    matches_df = matches_df.copy()

    # Nulls
    if matches_df.isnull().values.any():
        raise ValueError("Null values found in matches.csv")

    # Duplicate IDs
    if matches_df["match_id"].duplicated().any():
        raise ValueError("Duplicate match_id found.")

    # Seasons
    invalid_season = (
        ~matches_df["season"].isin(VALID_SEASONS)
    ).any()

    if invalid_season:
        raise ValueError("Invalid season found.")

    # Round validation
    if not matches_df["round_number"].between(1, 22).all():
        raise ValueError("Invalid round number.")

    # Home != Away
    if (
        matches_df["home_team_id"]
        ==
        matches_df["away_team_id"]
    ).any():

        raise ValueError(
            "Home team equals Away team."
        )

    # Positive Scores
    if (
        (matches_df["home_score"] < 0)
        |
        (matches_df["away_score"] < 0)
    ).any():

        raise ValueError(
            "Negative scores detected."
        )

    # Winner Validation
    winner_valid = (
        (
            matches_df["winner_team_id"]
            ==
            matches_df["home_team_id"]
        )
        |
        (
            matches_df["winner_team_id"]
            ==
            matches_df["away_team_id"]
        )
    )

    if not winner_valid.all():
        raise ValueError(
            "Winner must be Home or Away team."
        )

    # Team Exists
    valid_teams = set(teams_df["team_id"])

    for column in [
        "home_team_id",
        "away_team_id",
        "winner_team_id"
    ]:

        if (
            ~matches_df[column].isin(valid_teams)
        ).any():

            raise ValueError(
                f"Invalid team in {column}"
            )

    return matches_df


# ==========================================================
# PLAYER STATS
# ==========================================================

def transform_player_stats(
    stats_df: pd.DataFrame,
    players_df: pd.DataFrame,
    matches_df: pd.DataFrame
) -> pd.DataFrame:

    stats_df = stats_df.copy()

    # Nulls
    if stats_df.isnull().values.any():
        raise ValueError(
            "Null values in player_stats.csv"
        )

    # Player Exists
    valid_players = set(players_df["player_id"])

    if (
        ~stats_df["player_id"].isin(valid_players)
    ).any():

        raise ValueError(
            "Invalid player_id found."
        )

    # Match Exists
    valid_matches = set(matches_df["match_id"])

    if (
        ~stats_df["match_id"].isin(valid_matches)
    ).any():

        raise ValueError(
            "Invalid match_id found."
        )

    # No Negative Statistics
    numeric_columns = [
        "goals",
        "marks",
        "tackles",
        "disposals"
    ]

    for column in numeric_columns:

        if (stats_df[column] < 0).any():
            raise ValueError(
                f"Negative values found in {column}"
            )

    return stats_df