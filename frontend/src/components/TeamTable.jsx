function TeamTable({
    teams,
    sortColumn,
    sortDirection,
    onSort,
}) {

    const arrow = (column) => {
        if (sortColumn !== column) return "";

        return sortDirection === "asc" ? " ▲" : " ▼";
    };

    return (
        <table className="team-table">

            <thead>

                <tr>

                    <th>Rank</th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("team_name")}
                    >
                        Team{arrow("team_name")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("matches_played")}
                    >
                        MP{arrow("matches_played")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("wins")}
                    >
                        Wins{arrow("wins")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("losses")}
                    >
                        Losses{arrow("losses")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("draws")}
                    >
                        Draws{arrow("draws")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("win_percentage")}
                    >
                        Win %{arrow("win_percentage")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("points_for")}
                    >
                        Points For{arrow("points_for")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("points_against")}
                    >
                        Points Against{arrow("points_against")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("average_score")}
                    >
                        Avg Score{arrow("average_score")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("average_conceded")}
                    >
                        Avg Against{arrow("average_conceded")}
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

                        <td>{Number(team.win_percentage).toFixed(2)}%</td>

                        <td>{team.points_for}</td>

                        <td>{team.points_against}</td>

                        <td>{Number(team.average_score).toFixed(2)}</td>

                        <td>{Number(team.average_conceded).toFixed(2)}</td>

                    </tr>
                ))}

            </tbody>

        </table>
    );
}

export default TeamTable;