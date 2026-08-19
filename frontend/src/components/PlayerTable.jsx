function PlayerTable({
    players,
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

                    <th>ID</th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("player_name")}
                    >
                        Player
                        {renderSortIndicator("player_name")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("team_name")}
                    >
                        Team
                        {renderSortIndicator("team_name")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("position")}
                    >
                        Position
                        {renderSortIndicator("position")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("total_goals")}
                    >
                        Goals
                        {renderSortIndicator("total_goals")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("total_marks")}
                    >
                        Marks
                        {renderSortIndicator("total_marks")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("total_tackles")}
                    >
                        Tackles
                        {renderSortIndicator("total_tackles")}
                    </th>

                    <th
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort("total_disposals")}
                    >
                        Disposals
                        {renderSortIndicator("total_disposals")}
                    </th>

                </tr>

            </thead>

            <tbody>

                {players.map(player => (

                    <tr key={player.player_id}>

                        <td>{player.player_id}</td>

                        <td>{player.player_name}</td>

                        <td>{player.team_name}</td>

                        <td>{player.position}</td>

                        <td>{player.total_goals}</td>

                        <td>{player.total_marks}</td>

                        <td>{player.total_tackles}</td>

                        <td>{player.total_disposals}</td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default PlayerTable;