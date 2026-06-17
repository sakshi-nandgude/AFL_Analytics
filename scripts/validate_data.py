import pandas as pd

teams = pd.read_csv("../data/raw/teams.csv")
players = pd.read_csv("../data/raw/players.csv")
matches = pd.read_csv("../data/raw/matches.csv")
stats = pd.read_csv("../data/raw/player_stats.csv")

print("Teams:", len(teams))
print("Players:", len(players))
print("Matches:", len(matches))
print("Player Stats:", len(stats))

print("\nNull Values")
print(teams.isnull().sum())
print(players.isnull().sum())
print(matches.isnull().sum())
print(stats.isnull().sum())