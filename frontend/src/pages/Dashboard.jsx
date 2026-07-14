import { useEffect, useState } from "react";

import api from "../services/api";

import { API_ENDPOINTS } from "../utils/constants";

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

        <div>

            <h1>AFL Performance Analytics Dashboard</h1>

            <hr />

            <p>Total Teams: {dashboard.total_teams}</p>

            <p>Total Players: {dashboard.total_players}</p>

            <p>Total Matches: {dashboard.total_matches}</p>

            <p>Average Home Score: {dashboard.avg_home_score}</p>

            <p>Average Away Score: {dashboard.avg_away_score}</p>

            <p>Average Total Score: {dashboard.avg_total_score}</p>

        </div>

    );

}

export default Dashboard;