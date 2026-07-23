function TeamTable({ teams }) {
    return (
        <table className="team-table">

            <thead>

                <tr>

                    <th>Rank</th>

                    <th>Team</th>

                    <th>Matches</th>

                    <th>Wins</th>

                    <th>Losses</th>

                    <th>Draws</th>

                    <th>Win %</th>

                    <th>Points For</th>

                    <th>Points Against</th>

                    <th>Avg Score</th>

                    <th>Avg Against</th>

                </tr>

            </thead>

            <tbody>

                {teams.map((team, index) => (

                    <tr key={team.team_id}>

                        <td>{index + 1}</td>

                        <td>{team.team_name}</td>

                        <td>{team.matches_played}</td>

                        <td>{team.wins}</td>

                        <td>{team.losses}</td>

                        <td>{team.draws}</td>

                        <td>{team.win_percentage.toFixed(2)}%</td>

                        <td>{team.points_for}</td>

                        <td>{team.points_against}</td>

                        <td>{team.average_score.toFixed(2)}</td>

                        <td>{team.average_conceded.toFixed(2)}</td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default TeamTable;