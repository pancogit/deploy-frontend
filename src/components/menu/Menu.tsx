import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <ul className="menu">
            <li className="menu-item">
                <Link to="/" className="menu-link">
                    Home
                </Link>
            </li>
            <li className="menu-item">
                <Link to="/todo" className="menu-link">
                    Todo Example
                </Link>
            </li>
            <li className="menu-item">
                <Link to="/about" className="menu-link">
                    About
                </Link>
            </li>
        </ul>
    );
}
