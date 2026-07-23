function TeamTable({ teams }) {
    return (
        <table className="team-table">

            <thead>

                <tr>

                    <th onClick={() => onSort("team_name")} style={{ cursor: "pointer" }}>
                        Team
                    </th>

                    <th onClick={() => onSort("matches_played")} style={{ cursor: "pointer" }}>
                        MP
                    </th>

                    <th onClick={() => onSort("wins")} style={{ cursor: "pointer" }}>
                        Wins
                    </th>

                    <th onClick={() => onSort("losses")} style={{ cursor: "pointer" }}>
                        Losses
                    </th>

                    <th onClick={() => onSort("draws")} style={{ cursor: "pointer" }}>
                        Draws
                    </th>

                    <th onClick={() => onSort("win_percentage")} style={{ cursor: "pointer" }}>
                        Win %
                    </th>

                    <th onClick={() => onSort("points_for")} style={{ cursor: "pointer" }}>
                        Points For
                    </th>

                    <th onClick={() => onSort("points_against")} style={{ cursor: "pointer" }}>
                        Points Against
                    </th>

                    <th onClick={() => onSort("average_score")} style={{ cursor: "pointer" }}>
                        Avg Score
                    </th>

                    <th onClick={() => onSort("average_conceded")} style={{ cursor: "pointer" }}>
                        Avg Against
                    </th>

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