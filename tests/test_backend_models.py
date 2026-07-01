from backend.app.models import (
    DashboardSummary,
    TeamPerformance,
    PlayerSummary,
    TeamRanking,
    MatchSummary
)

print("Backend Models Imported Successfully!")

print(DashboardSummary.__tablename__)
print(TeamPerformance.__tablename__)
print(PlayerSummary.__tablename__)
print(TeamRanking.__tablename__)
print(MatchSummary.__tablename__)