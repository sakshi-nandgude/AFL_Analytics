function LeagueInsights({ teams }) {

    if (!teams.length) return null;

    const highestWin = [...teams].sort(
        (a, b) => b.win_percentage - a.win_percentage
    )[0];

    const lowestWin = [...teams].sort(
        (a, b) => a.win_percentage - b.win_percentage
    )[0];

    const highestScore = [...teams].sort(
        (a, b) => b.average_score - a.average_score
    )[0];

    const bestDefense = [...teams].sort(
        (a, b) => a.average_conceded - b.average_conceded
    )[0];

    return (
        <div className="dashboard-card">
            <h2>League Insights</h2>

            <p><strong>🏆 Highest Win %:</strong> {highestWin.team_name}</p>

            <p><strong>📉 Lowest Win %:</strong> {lowestWin.team_name}</p>

            <p><strong>⚽ Highest Average Score:</strong> {highestScore.team_name}</p>

            <p><strong>🛡️ Best Defence:</strong> {bestDefense.team_name}</p>
        </div>
    );
}

export default LeagueInsights;