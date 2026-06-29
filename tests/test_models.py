from pathlib import Path
import sys

# AFL_Analytics/
PROJECT_ROOT = Path(__file__).resolve().parents[2]

sys.path.insert(0, str(PROJECT_ROOT))

from database.models import (
    Team,
    Season,
    Player,
    Match,
    PlayerStat
)

print("Models Imported Successfully!")

print(Team.__tablename__)
print(Season.__tablename__)
print(Player.__tablename__)
print(Match.__tablename__)
print(PlayerStat.__tablename__)