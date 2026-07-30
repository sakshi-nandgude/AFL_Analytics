import { useEffect, useMemo, useState } from "react";

import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MatchTable from "../components/MatchTable";
import DashboardCard from "../components/DashboardCard";

import "../styles/dashboard.css";
import "../styles/tables.css";

function Matches() {

    const [matches, setMatches] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    useEffect(() => {

        async function loadMatches() {

            try {

                const response = await api.get(API_ENDPOINTS.MATCHES);

                setMatches(response.data);

            }

            catch {

                setError("Unable to load matches.");

            }

            finally {

                setLoading(false);

            }

        }

        loadMatches();

    }, []);

    const filteredMatches = useMemo(() => {

        return matches.filter(match =>

            match.home_team.toLowerCase().includes(search.toLowerCase()) ||

            match.away_team.toLowerCase().includes(search.toLowerCase())

        );

    }, [matches, search]);

    if (loading) return <Loading />;

    if (error) return <ErrorMessage message={error} />;

    return (

        <main style={{ padding: 30 }}>

            <h1>Match Analytics</h1>

            <div className="dashboard-grid">

                <DashboardCard

                    title="Matches"

                    value={matches.length}

                />

                <DashboardCard

                    title="Average Score"

                    value={

                        (
                            matches.reduce(

                                (sum, m) => sum + m.total_score,

                                0

                            ) / matches.length

                        ).toFixed(1)

                    }

                />

                <DashboardCard

                    title="Biggest Margin"

                    value={

                        Math.max(

                            ...matches.map(

                                m => m.winning_margin

                            )

                        )

                    }

                />

            </div>

            <input

                placeholder="Search Team"

                value={search}

                onChange={(e) =>

                    setSearch(e.target.value)

                }

            />

            <MatchTable matches={filteredMatches} />

        </main>

    );

}

export default Matches;