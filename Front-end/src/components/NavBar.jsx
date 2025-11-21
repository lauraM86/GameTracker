import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={{ padding: "16px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "16px" }}>Dashboard</Link>
      <Link to="/games">Juegos</Link>
    </nav>
  );
}

export default NavBar;
