from pathlib import Path
import sys

# AFL_Analytics/
PROJECT_ROOT = Path(__file__).resolve().parents[2]

sys.path.insert(0, str(PROJECT_ROOT))

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

print("Extracting data...")

teams = extract_teams()
players = extract_players()
matches = extract_matches()
stats = extract_player_stats()

print("Running transformations...")

teams = transform_teams(teams)

players = transform_players(
    players,
    teams
)

matches = transform_matches(
    matches,
    teams
)

stats = transform_player_stats(
    stats,
    players,
    matches
)

print("\nAll transformations completed successfully!")

print(f"Teams: {len(teams)}")
print(f"Players: {len(players)}")
print(f"Matches: {len(matches)}")
print(f"Player Stats: {len(stats)}")