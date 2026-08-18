import { useEffect, useState } from "react";

import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MatchTable from "../components/MatchTable";
import KPICard from "../components/KPICard";

import "../styles/tables.css";
import "../styles/cards.css";

function Matches() {

    const [matches, setMatches] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [page, setPage] = useState(1);

    const [size, setSize] = useState(10);

    const [total, setTotal] = useState(0);

    const [pages, setPages] = useState(0);

    const [team, setTeam] = useState("");

    const [winner, setWinner] = useState("");

    const [season, setSeason] = useState("");

    const [sortBy, setSortBy] = useState("season");

    const [sortOrder, setSortOrder] = useState("desc");

    const [appliedFilters, setAppliedFilters] = useState({
        team: "",
        winner: "",
        season: ""
    });

    const [analytics, setAnalytics] = useState({
        total_matches: 0,
        average_total_score: 0,
        average_winning_margin: 0,
        highest_match_score: 0
    });

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

        setPage(1);
    }


    useEffect(() => {

        async function loadMatches() {

            try {

                setLoading(true);

                setError("");

                const params = {
                    page: page,
                    size: size,
                    sort_by: sortBy,
                    sort_order: sortOrder
                };

                if (appliedFilters.team) {
                    params.team = appliedFilters.team;
                }

                if (appliedFilters.winner) {
                    params.winner = appliedFilters.winner;
                }

                if (appliedFilters.season) {
                    params.season = Number(
                        appliedFilters.season
                    );
                }


                // Fetch paginated matches
                const matchesResponse = await api.get(
                    API_ENDPOINTS.MATCHES,
                    {
                        params: params
                    }
                );


                // Fetch analytics for the same filters
                const analyticsResponse = await api.get(
                    `${API_ENDPOINTS.MATCHES}analytics`,
                    {
                        params: {
                            ...(appliedFilters.team && {
                                team: appliedFilters.team
                            }),
                            ...(appliedFilters.winner && {
                                winner: appliedFilters.winner
                            }),
                            ...(appliedFilters.season && {
                                season: Number(
                                    appliedFilters.season
                                )
                            })
                        }
                    }
                );


                // Update table
                setMatches(
                    matchesResponse.data.data
                );

                setTotal(
                    matchesResponse.data.total
                );

                setPages(
                    matchesResponse.data.pages
                );


                // Update KPI analytics
                setAnalytics(
                    analyticsResponse.data
                );

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load match data."
                );

            } finally {

                setLoading(false);

            }

        }

        loadMatches();

    }, [
        page,
        size,
        appliedFilters,
        sortBy,
        sortOrder
    ]);

    function handleApplyFilters() {

        setPage(1);

        setAppliedFilters({
            team: team.trim(),
            winner: winner.trim(),
            season: season.trim()
        });

    }


    function handleClearFilters() {

        setTeam("");

        setWinner("");

        setSeason("");

        setPage(1);

        setAppliedFilters({
            team: "",
            winner: "",
            season: ""
        });

    }


    function handlePreviousPage() {

        if (page > 1) {

            setPage(page - 1);

        }

    }


    function handleNextPage() {

        if (page < pages) {

            setPage(page + 1);

        }

    }


    function handlePageSizeChange(event) {

        setSize(
            Number(event.target.value)
        );

        setPage(1);

    }


    if (loading) {

        return <Loading />;

    }


    if (error) {

        return <ErrorMessage message={error} />;

    }

    const averageTotalScore =
        matches.length > 0
            ? (
                matches.reduce(
                    (sum, match) => sum + match.total_score,
                    0
                ) / matches.length
            ).toFixed(1)
            : "0.0";


    const averageWinningMargin =
        matches.length > 0
            ? (
                matches.reduce(
                    (sum, match) => sum + match.winning_margin,
                    0
                ) / matches.length
            ).toFixed(1)
            : "0.0";


    const highestScore =
        matches.length > 0
            ? Math.max(
                ...matches.map(
                    match => match.total_score
                )
            )
            : 0;


    return (

        <main style={{ padding: "30px" }}>

            <h1>Match Analytics</h1>

            <div className="kpi-grid">

                <KPICard
                    title="Matches"
                    value={analytics.total_matches}
                />

                <KPICard
                    title="Avg Total Score"
                    value={analytics.average_total_score}
                />

                <KPICard
                    title="Avg Winning Margin"
                    value={analytics.average_winning_margin}
                />

                <KPICard
                    title="Highest Match Score"
                    value={analytics.highest_match_score}
                />

            </div>


            {/* Filters */}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "20px"
                }}
            >

                <input
                    type="text"
                    placeholder="Search team"
                    value={team}
                    onChange={(e) =>
                        setTeam(e.target.value)
                    }
                />


                <input
                    type="text"
                    placeholder="Winner"
                    value={winner}
                    onChange={(e) =>
                        setWinner(e.target.value)
                    }
                />


                <input
                    type="number"
                    placeholder="Season"
                    value={season}
                    onChange={(e) =>
                        setSeason(e.target.value)
                    }
                />


                <button
                    onClick={handleApplyFilters}
                >
                    Apply Filters
                </button>


                <button
                    onClick={handleClearFilters}
                >
                    Clear
                </button>

            </div>


            {/* Page size */}

            <div style={{ marginBottom: "20px" }}>

                <label>

                    Matches per page:&nbsp;

                    <select
                        value={size}
                        onChange={handlePageSizeChange}
                    >

                        <option value={10}>
                            10
                        </option>

                        <option value={25}>
                            25
                        </option>

                        <option value={50}>
                            50
                        </option>

                        <option value={100}>
                            100
                        </option>

                    </select>

                </label>

            </div>


            {/* Table */}

            <MatchTable
                matches={matches}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
            />


            {/* Pagination */}

            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px"
                }}
            >

                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                >
                    Previous
                </button>


                <span>

                    Page {page} of {pages}

                </span>


                <button
                    onClick={handleNextPage}
                    disabled={
                        page === pages ||
                        pages === 0
                    }
                >
                    Next
                </button>


                <span>

                    Total matches: {total}

                </span>

            </div>

        </main>

    );

}

export default Matches;