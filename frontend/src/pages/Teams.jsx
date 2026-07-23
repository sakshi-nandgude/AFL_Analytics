import { useEffect, useMemo, useState } from "react";

import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

import TeamTable from "../components/TeamTable";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/dashboard.css";
import DashboardCard from "../components/DashboardCard";

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

    function handleSort(column) {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortColumn(column);
            setSortDirection("desc");
        }
    }

    const filteredTeams = useMemo(() => {
        const filtered = teams.filter((team) =>
            team.team_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return [...filtered].sort((a, b) => {
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
    }, [teams, searchTerm, sortColumn, sortDirection]);

    if (loading) return <Loading />;

    if (error) return <ErrorMessage message={error} />;

    const totalTeams = teams.length;

    const totalMatches = teams.reduce(
        (sum, team) => sum + team.matches_played,
        0
    ) / 2;

    const averageWinPercentage =
        teams.reduce((sum, team) => sum + team.win_percentage, 0) /
        totalTeams;

    const bestTeam = [...teams].sort(
        (a, b) => b.win_percentage - a.win_percentage
    )[0];

    const highestScoringTeam = [...teams].sort(
        (a, b) => b.average_score - a.average_score
    )[0];

    return (
        <main style={{ padding: "30px" }}>
            <h1>Team Performance Analytics</h1>

            <p style={{ color: "#666", marginBottom: "20px" }}>
                Performance metrics for every AFL team.
            </p>

            <div className="dashboard-grid">

                <DashboardCard
                    title="Total Teams"
                    value={totalTeams}
                />

                <DashboardCard
                    title="Total Matches"
                    value={Math.round(totalMatches)}
                />

                <DashboardCard
                    title="Average Win %"
                    value={`${averageWinPercentage.toFixed(2)}%`}
                />

                <DashboardCard
                    title="Best Team"
                    value={bestTeam?.team_name}
                />

                <DashboardCard
                    title="Highest Scoring Team"
                    value={highestScoringTeam?.team_name}
                />

            </div>

            <input
                type="text"
                placeholder="Search team..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: "320px",
                    padding: "10px",
                    marginBottom: "20px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "15px",
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