import { useEffect, useState } from "react";

import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

import TeamTable from "../components/TeamTable";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import "../styles/tables.css";

function Teams() {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadTeams() {

            try {

                const response = await api.get(API_ENDPOINTS.TEAMS);

                setTeams(response.data);

            } catch (err) {

                console.error(err);

                setError("Unable to load team data.");

            } finally {

                setLoading(false);

            }

        }

        loadTeams();

    }, []);

    if (loading) {

        return <Loading />;

    }

    if (error) {

        return <ErrorMessage message={error} />;

    }

    return (

        <main style={{ padding: "30px" }}>

            <h1>Team Performance Analytics</h1>

        <p
            style={{
                color: "#666",
                marginBottom: "25px"
            }}
        >

            Performance metrics for every AFL team across all recorded matches.

        </p>

            <TeamTable teams={teams} />

        </main>

    );

}

export default Teams;