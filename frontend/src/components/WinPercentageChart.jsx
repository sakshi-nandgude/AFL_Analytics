import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

function WinPercentageChart({ teams }) {
    return (
        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
                marginBottom: "30px"
            }}
        >
            <h2>Team Win Percentage</h2>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={teams}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="team_name"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        height={100}
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="win_percentage"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default WinPercentageChart;