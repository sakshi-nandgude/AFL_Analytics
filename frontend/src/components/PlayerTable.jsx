function PlayerTable({ players }) {
    return (
        <table className="team-table">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Player</th>
                    <th>Team</th>
                    <th>Position</th>
                    <th>Goals</th>
                    <th>Marks</th>
                    <th>Tackles</th>
                    <th>Disposals</th>

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