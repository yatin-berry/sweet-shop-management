import { useEffect, useState } from "react";
import api from "../services/api";

function AdminUpdateSweet() {
  const [sweets, setSweets] = useState([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedId) {
      alert("Please select a sweet");
      return;
    }

    try {
      await api.put(`/sweets/${selectedId}`, {
        price: Number(price),
        quantity: Number(quantity)
      });

      alert("Sweet updated successfully");
      setPrice("");
      setQuantity("");
      fetchSweets();
    } catch (err) {
      alert("Only admin can update sweets");
    }
  };

  return (
    <div>
      <h2>Admin – Update Sweet</h2>

      <form onSubmit={handleUpdate}>
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

        <input
          type="number"
          placeholder="New Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br />

        <input
          type="number"
          placeholder="New Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <br />

        <button type="submit">Update Sweet</button>
      </form>
    </div>
  );
}

export default AdminUpdateSweet;
