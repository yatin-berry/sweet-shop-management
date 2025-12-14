import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/register");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#dc2626",
        marginBottom: "15px",
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
