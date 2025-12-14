import { useEffect, useState } from "react";
import api from "../services/api";

import AdminAddSweet from "./AdminAddSweet";
import AdminUpdateSweet from "./AdminUpdateSweet";
import AdminDeleteSweet from "./AdminDeleteSweet";
import Logout from "./Logout";


const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
};


function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const token = localStorage.getItem("token");
  const role = getUserRole();
  const isAdmin = role === "admin";


  // Fetch all sweets
  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // Purchase sweet
  const handlePurchase = async (id) => {
    if (!token) {
      alert("Please login to purchase");
      return;
    }

    try {
      await api.post(`/sweets/${id}/purchase`);
      alert("Purchase successful");
      fetchSweets();
    } catch (err) {
      alert("Purchase failed");
    }
  };

  // Search + Filter
  const handleSearch = async () => {
    try {
      let query = "";

      if (search.trim() !== "") {
        query += `name=${search}`;
      }

      if (category !== "") {
        query += query ? `&category=${category}` : `category=${category}`;
      }

      if (query === "") {
        fetchSweets();
        return;
      }

      const res = await api.get(`/sweets/search?${query}`);
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading sweets...</p>;
  }

  return (
  <div>
    <Logout />
    <hr />
    {/* ADMIN PANEL */}
    {isAdmin && (
      <div className="section admin-section">
        <h2 className="admin-title">Admin Panel</h2>
        <p className="admin-note">
          Only admin users can add, update or delete sweets
        </p>

        <AdminAddSweet />
        <hr />
        <AdminUpdateSweet />
        <hr />
        <AdminDeleteSweet />
      </div>
    )}

    {/* Dashboard Header */}
    <div className="dashboard-title">
      <h2>Available Sweets</h2>
    </div>

    {/* Search + Filter Bar */}
    <div className="search-filter-bar">
      <input
        placeholder="Search sweet by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Indian">Indian</option>
        <option value="Bakery">Bakery</option>
        <option value="Chocolate">Chocolate</option>
      </select>

      <button onClick={handleSearch}>Apply</button>
    </div>

    {sweets.length === 0 && <p>No sweets found</p>}

    <div className="sweets-grid">
      {sweets.map((sweet) => (
        <div key={sweet._id} className="sweet-card">
          <h3>{sweet.name}</h3>

          <div className="sweet-meta">
            Category: {sweet.category} <br />
            Price: ₹{sweet.price} <br />
            Quantity: {sweet.quantity}
          </div>

          <div className="sweet-actions">
            <button
              disabled={!token || sweet.quantity === 0}
              onClick={() => handlePurchase(sweet._id)}
            >
              Purchase
            </button>

            {!token && (
              <span style={{ color: "orange", fontSize: "12px" }}>
                Login required
              </span>
            )}

            {sweet.quantity === 0 && (
              <span style={{ color: "red", fontSize: "12px" }}>
                Out of stock
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default Dashboard;
