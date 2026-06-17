from extract import (
    extract_teams,
    extract_players,
    extract_matches,
    extract_player_stats
)

teams = extract_teams()
players = extract_players()
matches = extract_matches()
stats = extract_player_stats()

print("Teams:", len(teams))
print("Players:", len(players))
print("Matches:", len(matches))
print("Player Stats:", len(stats))