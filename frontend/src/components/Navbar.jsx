import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    return (
        <nav>
            <h2>AFL Performance Analytics Portal</h2>

            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>

                <li>
                    <Link to="/teams">Teams</Link>
                </li>

                <li>
                    <Link to="/players">Players</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;