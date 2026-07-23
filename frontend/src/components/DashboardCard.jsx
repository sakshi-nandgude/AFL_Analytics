function DashboardCard({ title, value }) {
    return (
        <div className="dashboard-card">
            <h3>{title}</h3>
            <h2>{value}</h2>
        </div>
    );
}

export default DashboardCard;