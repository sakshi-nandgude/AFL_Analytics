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
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("win_percentage");
    const [sortDirection, setSortDirection] = useState("desc");

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

    const filteredTeams = teams
        .filter((team) =>
            team.team_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const first = a[sortColumn];
            const second = b[sortColumn];

            if (typeof first === "string") {
                return sortDirection === "asc"
                    ? first.localeCompare(second)
                    : second.localeCompare(first);
            }

            return sortDirection === "asc"
                ? first - second
                : second - first;
        });

    function handleSort(column) {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("desc");
        }
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

            <input
                type="text"
                placeholder="Search team..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: "300px",
                    padding: "10px",
                    marginBottom: "20px",
                    fontSize: "16px",
                    borderRadius: "6px",
                    border: "1px solid #ccc"
                }}
            />

            <TeamTable
                teams={filteredTeams}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
            />

        </main>

    );

}

export default Teams;