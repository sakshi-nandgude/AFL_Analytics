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

    const [search, setSearch] = useState("");

    const [appliedSearch, setAppliedSearch] = useState("");

    const [team, setTeam] = useState("");

    const [position, setPosition] = useState("");

    const [sortBy, setSortBy] = useState("player_name");

    const [sortOrder, setSortOrder] = useState("asc");


    useEffect(() => {

        async function loadPlayers() {

            try {

                setLoading(true);

                setError("");

                const response = await api.get(
                    API_ENDPOINTS.PLAYERS,
                    {
                        params: {
                            search: appliedSearch,
                            team: team,
                            position: position,
                            sort_by: sortBy,
                            sort_order: sortOrder
                        }
                    }
                );

                setPlayers(response.data);

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load player data."
                );

            } finally {

                setLoading(false);

            }

        }

        loadPlayers();

    }, [
        appliedSearch,
        team,
        position,
        sortBy,
        sortOrder
    ]);


    function handleSearch() {

        setAppliedSearch(
            search.trim()
        );

    }


    function handleClear() {

        setSearch("");

        setAppliedSearch("");

        setTeam("");

        setPosition("");

    }


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


    if (loading) {

        return <Loading />;

    }


    if (error) {

        return <ErrorMessage message={error} />;

    }


    return (

        <main style={{ padding: "30px" }}>

            <h1>AFL Players</h1>


            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                    flexWrap: "wrap"
                }}
            >

                <input
                    type="text"
                    placeholder="Search player"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                <select
                    value={team}
                    onChange={(e) =>
                        setTeam(e.target.value)
                    }
                >

                    <option value="">
                        All Teams
                    </option>

                    <option value="Adelaide">
                        Adelaide
                    </option>

                    <option value="Brisbane">
                        Brisbane
                    </option>

                    <option value="Carlton">
                        Carlton
                    </option>

                    <option value="Collingwood">
                        Collingwood
                    </option>

                    <option value="Essendon">
                        Essendon
                    </option>

                    <option value="Fremantle">
                        Fremantle
                    </option>

                    <option value="Geelong">
                        Geelong
                    </option>

                    <option value="Gold Coast">
                        Gold Coast
                    </option>

                    <option value="GWS">
                        GWS
                    </option>

                    <option value="Hawthorn">
                        Hawthorn
                    </option>

                    <option value="Melbourne">
                        Melbourne
                    </option>

                    <option value="North Melbourne">
                        North Melbourne
                    </option>

                    <option value="Port Adelaide">
                        Port Adelaide
                    </option>

                    <option value="Richmond">
                        Richmond
                    </option>

                    <option value="St Kilda">
                        St Kilda
                    </option>

                    <option value="Sydney">
                        Sydney
                    </option>

                    <option value="West Coast">
                        West Coast
                    </option>

                    <option value="Western Bulldogs">
                        Western Bulldogs
                    </option>

                </select>


                <select
                    value={position}
                    onChange={(e) =>
                        setPosition(e.target.value)
                    }
                >

                    <option value="">
                        All Positions
                    </option>

                    <option value="Forward">
                        Forward
                    </option>

                    <option value="Midfielder">
                        Midfielder
                    </option>

                    <option value="Defender">
                        Defender
                    </option>

                    <option value="Ruck">
                        Ruck
                    </option>

                </select>


                <button onClick={handleSearch}>
                    Search
                </button>


                <button onClick={handleClear}>
                    Clear
                </button>

            </div>


            <PlayerTable
                players={players}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
            />

        </main>

    );

}

export default Players;