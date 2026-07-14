import { useEffect, useState } from "react";

import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

import KPICard from "../components/KPICard";

import "../styles/cards.css";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const response = await api.get(API_ENDPOINTS.DASHBOARD);

                setDashboard(response.data);

            } catch (error) {

                console.error(error);

            }

        }

        loadDashboard();

    }, []);

    if (!dashboard) {

        return <h2>Loading Dashboard...</h2>;

    }

    return (

        <main style={{ padding: "30px" }}>

            <h1>AFL Performance Analytics Dashboard</h1>

            <div className="kpi-grid">

                <KPICard
                    title="Teams"
                    value={dashboard.total_teams}
                />

                <KPICard
                    title="Players"
                    value={dashboard.total_players}
                />

                <KPICard
                    title="Matches"
                    value={dashboard.total_matches}
                />

                <KPICard
                    title="Avg Home Score"
                    value={dashboard.avg_home_score}
                />

                <KPICard
                    title="Avg Away Score"
                    value={dashboard.avg_away_score}
                />

                <KPICard
                    title="Avg Total Score"
                    value={dashboard.avg_total_score}
                />

            </div>

        </main>

    );

}

export default Dashboard;