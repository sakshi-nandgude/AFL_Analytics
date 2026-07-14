import { useEffect, useState } from "react";

import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

import TeamTable from "../components/TeamTable";

import "../styles/tables.css";

function Teams() {

    const [teams, setTeams] = useState([]);

    useEffect(() => {

        async function loadTeams() {

            try {

                const response = await api.get(API_ENDPOINTS.TEAMS);

                setTeams(response.data);

            } catch (error) {

                console.error(error);

            }

        }

        loadTeams();

    }, []);

    if (teams.length === 0) {

        return <h2>Loading Teams...</h2>;

    }

    return (

        <main style={{ padding: "30px" }}>

            <h1>AFL Teams</h1>

            <TeamTable teams={teams} />

        </main>

    );

}

export default Teams;