import { useEffect, useState } from "react";

import api from "../services/api";

import { API_ENDPOINTS } from "../utils/constants";

import PlayerTable from "../components/PlayerTable";

import "../styles/tables.css";

function Players() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {

        async function loadPlayers() {

            try {

                const response = await api.get(API_ENDPOINTS.PLAYERS);

                setPlayers(response.data);

            }

            catch (error) {

                console.error(error);

            }

        }

        loadPlayers();

    }, []);

    if (players.length === 0) {

        return <h2>Loading Players...</h2>;

    }

    return (

        <div style={{ padding: "30px" }}>

            <h1>AFL Players</h1>

            <PlayerTable players={players} />

        </div>

    );

}

export default Players;