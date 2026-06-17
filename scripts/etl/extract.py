import pandas as pd
from pathlib import Path

RAW_PATH = Path("../data/raw")

def extract_teams():
    return pd.read_csv(RAW_PATH / "teams.csv")

def extract_players():
    return pd.read_csv(RAW_PATH / "players.csv")

def extract_matches():
    return pd.read_csv(RAW_PATH / "matches.csv")

def extract_player_stats():
    return pd.read_csv(RAW_PATH / "player_stats.csv")