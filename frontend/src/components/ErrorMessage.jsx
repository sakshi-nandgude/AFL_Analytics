function ErrorMessage({ message }) {
    return (
        <main
            style={{
                padding: "40px",
                textAlign: "center"
            }}
        >
            <h2 style={{ color: "red" }}>
                {message}
            </h2>
        </main>
    );
}

export default ErrorMessage;