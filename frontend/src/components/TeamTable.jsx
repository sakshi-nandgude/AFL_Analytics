function TeamTable({ teams }) {
    return (
        <table className="team-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Team</th>

                    <th>Wins</th>

                    <th>Losses</th>

                    <th>Win %</th>

                    <th>Average Score</th>

                </tr>

            </thead>

            <tbody>

                {teams.map(team => (

                    <tr key={team.team_id}>

                        <td>{team.team_id}</td>

                        <td>{team.team_name}</td>

                        <td>{team.wins}</td>

                        <td>{team.losses}</td>

                        <td>{team.win_percentage}</td>

                        <td>{team.average_score}</td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default TeamTable;