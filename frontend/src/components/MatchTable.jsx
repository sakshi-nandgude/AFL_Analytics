function MatchTable({
    matches,
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

                    <th
                        onClick={() => onSort("season")}
                    >
                        Season
                        {renderSortIndicator("season")}
                    </th>

                    <th
                        onClick={() => onSort("round")}
                    >
                        Round
                        {renderSortIndicator("round")}
                    </th>

                    <th>Home</th>

                    <th>Away</th>

                    <th
                        onClick={() => onSort("home_score")}
                    >
                        Home Score
                        {renderSortIndicator("home_score")}
                    </th>

                    <th
                        onClick={() => onSort("away_score")}
                    >
                        Away Score
                        {renderSortIndicator("away_score")}
                    </th>

                    <th>Winner</th>

                    <th
                        onClick={() =>
                            onSort("winning_margin")
                        }
                    >
                        Margin
                        {renderSortIndicator(
                            "winning_margin"
                        )}
                    </th>

                    <th
                        onClick={() =>
                            onSort("total_score")
                        }
                    >
                        Total
                        {renderSortIndicator(
                            "total_score"
                        )}
                    </th>

                </tr>

            </thead>

            <tbody>

                {matches.map(match => (

                    <tr key={match.match_id}>

                        <td>{match.season}</td>

                        <td>{match.round}</td>

                        <td>{match.home_team}</td>

                        <td>{match.away_team}</td>

                        <td>{match.home_score}</td>

                        <td>{match.away_score}</td>

                        <td>{match.winner}</td>

                        <td>{match.winning_margin}</td>

                        <td>{match.total_score}</td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default MatchTable;