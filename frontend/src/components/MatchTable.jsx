function MatchTable({ matches }) {

    return (

        <table className="team-table">

            <thead>

                <tr>

                    <th>Season</th>

                    <th>Round</th>

                    <th>Home</th>

                    <th>Away</th>

                    <th>Home Score</th>

                    <th>Away Score</th>

                    <th>Winner</th>

                    <th>Margin</th>

                    <th>Total</th>

                </tr>

            </thead>

            <tbody>

                {

                    matches.map(match => (

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

                    ))

                }

            </tbody>

        </table>

    );

}

export default MatchTable;