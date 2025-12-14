import { useEffect, useState } from "react";
import api from "../services/api";

function Sweets() {
  const [sweets, setSweets] = useState([]);

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

  const handlePurchase = async (id) => {
    try {
      await api.post(`/sweets/${id}/purchase`);
      alert("Sweet purchased!");
      fetchSweets(); // refresh quantity
    } catch (err) {
      alert("Purchase failed or out of stock");
    }
  };

  return (
    <div>
      <h2>All Sweets</h2>

      {sweets.map((sweet) => (
        <div key={sweet._id} style={{ marginBottom: "10px" }}>
          <p>
            <strong>{sweet.name}</strong> | ₹{sweet.price} | Qty:{" "}
            {sweet.quantity}
          </p>

        <button
        onClick={() => handlePurchase(sweet._id)}
        disabled={!token || sweet.quantity === 0}
        >
            Purchase
        </button>

{!token && <p>Please login to purchase</p>}
        </div>
      ))}
    </div>
  );
}

export default Sweets;
