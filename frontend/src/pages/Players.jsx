import { useEffect, useState } from "react";

import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

import PlayerTable from "../components/PlayerTable";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import "../styles/tables.css";

function Players() {

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadPlayers() {

            try {

                const response = await api.get(API_ENDPOINTS.PLAYERS);

                setPlayers(response.data);

            } catch (err) {

                console.error(err);

                setError("Unable to load player data.");

            } finally {

                setLoading(false);

            }

        }

        loadPlayers();

    }, []);

    if (loading) {

        return <Loading />;

    }

    if (error) {

        return <ErrorMessage message={error} />;

    }

    return (

        <main style={{ padding: "30px" }}>

            <h1>AFL Players</h1>

            <PlayerTable players={players} />

        </main>

    );

}

export default Players;