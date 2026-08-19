function TeamTable({
    teams,
    sortBy,
    sortOrder,
    onSort
}) {

    function renderSortIndicator(column) {

        if (sortBy !== column) {
            return "";
        }

        return sortOrder === "asc"
            ? " ▲"
            : " ▼";
    }

    return (

        <table className="team-table">

            <thead>

                <tr>

                    <th>Rank</th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("team_name")}
                    >
                        Team
                        {renderSortIndicator("team_name")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("matches_played")}
                    >
                        MP
                        {renderSortIndicator("matches_played")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("wins")}
                    >
                        Wins
                        {renderSortIndicator("wins")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("losses")}
                    >
                        Losses
                        {renderSortIndicator("losses")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("draws")}
                    >
                        Draws
                        {renderSortIndicator("draws")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("win_percentage")}
                    >
                        Win %
                        {renderSortIndicator("win_percentage")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("points_for")}
                    >
                        Points For
                        {renderSortIndicator("points_for")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("points_against")}
                    >
                        Points Against
                        {renderSortIndicator("points_against")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("average_score")}
                    >
                        Avg Score
                        {renderSortIndicator("average_score")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("average_conceded")}
                    >
                        Avg Against
                        {renderSortIndicator("average_conceded")}
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

                        <td>
                            {Number(team.win_percentage).toFixed(2)}%
                        </td>

                        <td>{team.points_for}</td>

                        <td>{team.points_against}</td>

                        <td>
                            {Number(team.average_score).toFixed(2)}
                        </td>

                        <td>
                            {Number(team.average_conceded).toFixed(2)}
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default TeamTable;