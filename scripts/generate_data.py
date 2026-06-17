import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta
from pathlib import Path

# =====================================================
# CONFIG
# =====================================================

OUTPUT_DIR = Path("data/raw")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

SEASONS = [2023, 2024, 2025]

TEAMS = {
    1: ("Adelaide Crows", 76),
    2: ("Brisbane Lions", 88),
    3: ("Carlton", 84),
    4: ("Collingwood", 90),
    5: ("Essendon", 78),
    6: ("Fremantle", 79),
    7: ("Geelong Cats", 81),
    8: ("Gold Coast Suns", 73),
    9: ("GWS Giants", 75),
    10: ("Hawthorn", 72),
    11: ("Melbourne", 86),
    12: ("North Melbourne", 67),
    13: ("Port Adelaide", 83),
    14: ("Richmond", 70),
    15: ("St Kilda", 77),
    16: ("Sydney Swans", 87),
    17: ("West Coast Eagles", 65),
    18: ("Western Bulldogs", 82)
}

POSITIONS = (
    ["Forward"] * 12
    + ["Midfielder"] * 14
    + ["Defender"] * 10
    + ["Ruck"] * 4
)

FIRST_NAMES = [
    "Liam","Noah","Oliver","Jack","James","William","Lucas",
    "Henry","Thomas","Ethan","Mason","Logan","Finn","Ryan",
    "Oscar","Charlie","Samuel","Cooper","Jacob","Aiden"
]

LAST_NAMES = [
    "Murphy","Kelly","Ryan","Walsh","Smith","Brown","Wilson",
    "Taylor","Anderson","Clark","White","Martin","Thompson",
    "Walker","Young","Hall","Allen","King","Scott","Green"
]

# =====================================================
# TEAMS
# =====================================================

def generate_teams():
    rows = []

    for team_id, (team_name, rating) in TEAMS.items():
        rows.append({
            "team_id": team_id,
            "team_name": team_name,
            "rating": rating
        })

    return pd.DataFrame(rows)

# =====================================================
# PLAYERS
# =====================================================

def generate_players():
    rows = []

    player_id = 1001

    for team_id in TEAMS.keys():

        positions = POSITIONS.copy()
        random.shuffle(positions)

        for position in positions:

            name = (
                random.choice(FIRST_NAMES)
                + " "
                + random.choice(LAST_NAMES)
            )

            rows.append({
                "player_id": player_id,
                "player_name": name,
                "team_id": team_id,
                "position": position
            })

            player_id += 1

    return pd.DataFrame(rows)

# =====================================================
# MATCHES
# =====================================================

def generate_matches():

    rows = []
    match_id = 1

    for season in SEASONS:

        start_date = datetime(season, 3, 1)

        for round_number in range(1, 23):

            teams = list(TEAMS.keys())
            random.shuffle(teams)

            for i in range(0, 18, 2):

                home_team = teams[i]
                away_team = teams[i + 1]

                home_rating = TEAMS[home_team][1]
                away_rating = TEAMS[away_team][1]

                home_base = random.randint(70, 110)
                away_base = random.randint(70, 110)

                home_score = (
                    home_base
                    + int((home_rating - 75) * 0.8)
                    + 5
                )

                away_score = (
                    away_base
                    + int((away_rating - 75) * 0.8)
                )

                if home_score == away_score:
                    home_score += 1

                winner = (
                    home_team
                    if home_score > away_score
                    else away_team
                )

                match_date = start_date + timedelta(
                    days=(round_number - 1) * 7
                )

                rows.append({
                    "match_id": match_id,
                    "season": season,
                    "round_number": round_number,
                    "match_date": match_date.date(),
                    "home_team_id": home_team,
                    "away_team_id": away_team,
                    "home_score": home_score,
                    "away_score": away_score,
                    "winner_team_id": winner
                })

                match_id += 1

    return pd.DataFrame(rows)

# =====================================================
# PLAYER STATS
# =====================================================

def generate_player_stats(players_df, matches_df):

    rows = []

    for _, match in matches_df.iterrows():

        home_players = players_df[
            players_df["team_id"] == match["home_team_id"]
        ].sample(18)

        away_players = players_df[
            players_df["team_id"] == match["away_team_id"]
        ].sample(18)

        participants = pd.concat(
            [home_players, away_players]
        )

        for _, player in participants.iterrows():

            position = player["position"]

            if position == "Forward":
                goals = np.random.poisson(2)
                marks = random.randint(2, 10)
                tackles = random.randint(0, 5)
                disposals = random.randint(10, 25)

            elif position == "Midfielder":
                goals = np.random.poisson(1)
                marks = random.randint(3, 10)
                tackles = random.randint(2, 8)
                disposals = random.randint(20, 40)

            elif position == "Defender":
                goals = np.random.poisson(0.5)
                marks = random.randint(4, 12)
                tackles = random.randint(2, 10)
                disposals = random.randint(15, 30)

            else:
                goals = np.random.poisson(0.5)
                marks = random.randint(4, 10)
                tackles = random.randint(1, 7)
                disposals = random.randint(10, 25)

            rows.append({
                "player_id": player["player_id"],
                "match_id": match["match_id"],
                "goals": int(goals),
                "marks": marks,
                "tackles": tackles,
                "disposals": disposals
            })

    return pd.DataFrame(rows)

# =====================================================
# MAIN
# =====================================================

def main():

    print("Generating teams...")
    teams_df = generate_teams()

    print("Generating players...")
    players_df = generate_players()

    print("Generating matches...")
    matches_df = generate_matches()

    print("Generating player stats...")
    player_stats_df = generate_player_stats(
        players_df,
        matches_df
    )

    teams_df.to_csv(
        OUTPUT_DIR / "teams.csv",
        index=False
    )

    players_df.to_csv(
        OUTPUT_DIR / "players.csv",
        index=False
    )

    matches_df.to_csv(
        OUTPUT_DIR / "matches.csv",
        index=False
    )

    player_stats_df.to_csv(
        OUTPUT_DIR / "player_stats.csv",
        index=False
    )

    print("\nData Generation Complete")
    print(f"Teams: {len(teams_df)}")
    print(f"Players: {len(players_df)}")
    print(f"Matches: {len(matches_df)}")
    print(f"Player Stats: {len(player_stats_df)}")


if __name__ == "__main__":
    main()