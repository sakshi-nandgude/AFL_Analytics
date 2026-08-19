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

    const [sortBy, setSortBy] = useState("team_name");

    const [sortOrder, setSortOrder] = useState("asc");

    const [search, setSearch] = useState("");

    const [appliedSearch, setAppliedSearch] = useState("");


    useEffect(() => {

        async function loadTeams() {

            try {

                setLoading(true);

                setError("");

                const response = await api.get(
                    API_ENDPOINTS.TEAMS,
                    {
                        params: {
                            sort_by: sortBy,
                            sort_order: sortOrder,
                            search: appliedSearch
                        }
                    }
                );

                setTeams(response.data);

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load team data."
                );

            } finally {

                setLoading(false);

            }

        }

        loadTeams();

    }, [
        sortBy,
        sortOrder,
        appliedSearch
    ]);


    function handleSort(column) {

        if (sortBy === column) {

            setSortOrder(
                sortOrder === "asc"
                    ? "desc"
                    : "asc"
            );

        } else {

            setSortBy(column);

            setSortOrder("desc");

        }

    }


    function handleSearch() {

        setAppliedSearch(
            search.trim()
        );

    }


    function handleClearSearch() {

        setSearch("");

        setAppliedSearch("");

    }


    if (loading) {

        return <Loading />;

    }


    if (error) {

        return <ErrorMessage message={error} />;

    }


    return (

        <main style={{ padding: "30px" }}>

            <h1>AFL Teams</h1>


            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px"
                }}
            >

                <input
                    type="text"
                    placeholder="Search team"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                <button
                    onClick={handleSearch}
                >
                    Search
                </button>


                <button
                    onClick={handleClearSearch}
                >
                    Clear
                </button>

            </div>


            <TeamTable
                teams={teams}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
            />

        </main>

    );

}

export default Teams;