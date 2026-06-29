from pathlib import Path
import pandas as pd

# Project root (AFL_Analytics)
PROJECT_ROOT = Path(__file__).resolve().parents[1]

RAW_PATH = PROJECT_ROOT / "data" / "raw"


def extract_teams():
    return pd.read_csv(RAW_PATH / "teams.csv")


def extract_players():
    return pd.read_csv(RAW_PATH / "players.csv")


def extract_matches():
    return pd.read_csv(RAW_PATH / "matches.csv")


def extract_player_stats():
    return pd.read_csv(RAW_PATH / "player_stats.csv")