import { useEffect, useState } from "react";

import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

import KPICard from "../components/KPICard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import "../styles/cards.css";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadDashboard() {

            try {

                const response = await api.get(API_ENDPOINTS.DASHBOARD);

                setDashboard(response.data);

            } catch (err) {

                console.error(err);

                setError("Unable to load dashboard data.");

            } finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);

    if (loading) {

        return <Loading />;

    }

    if (error) {

        return <ErrorMessage message={error} />;

    }

    return (

        <main style={{ padding: "30px" }}>

            <h1>AFL Performance Analytics Dashboard</h1>

            <div className="kpi-grid">

                <KPICard title="Teams" value={dashboard.total_teams} />
                <KPICard title="Players" value={dashboard.total_players} />
                <KPICard title="Matches" value={dashboard.total_matches} />
                <KPICard title="Avg Home Score" value={dashboard.avg_home_score} />
                <KPICard title="Avg Away Score" value={dashboard.avg_away_score} />
                <KPICard title="Avg Total Score" value={dashboard.avg_total_score} />

            </div>

        </main>

    );

}

export default Dashboard;