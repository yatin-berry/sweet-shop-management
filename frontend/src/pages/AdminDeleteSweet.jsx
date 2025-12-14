import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDeleteSweet() {
  const [sweets, setSweets] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) {
      alert("Please select a sweet");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sweet?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/sweets/${selectedId}`);
      alert("Sweet deleted successfully");
      setSelectedId("");
      fetchSweets();
    } catch (err) {
      alert("Only admin can delete sweets");
    }
  };

  return (
    <div>
      <h2>Admin – Delete Sweet</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Select Sweet</option>
        {sweets.map((sweet) => (
          <option key={sweet._id} value={sweet._id}>
            {sweet.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button onClick={handleDelete}>Delete Sweet</button>
    </div>
  );
}

export default AdminDeleteSweet;
