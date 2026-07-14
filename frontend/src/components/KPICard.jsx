function KPICard({ title, value }) {
    return (
        <div className="kpi-card">
            <h3>{title}</h3>
            <h1>{value}</h1>
        </div>
    );
}

export default KPICard;