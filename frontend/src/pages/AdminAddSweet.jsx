import { useState } from "react";
import api from "../services/api";

function AdminAddSweet() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddSweet = async (e) => {
    e.preventDefault();

    try {
      await api.post("/sweets", {
        name,
        category,
        price: Number(price),
        quantity: Number(quantity)
      });

      alert("Sweet added successfully");

      setName("");
      setCategory("");
      setPrice("");
      setQuantity("");
    } catch (err) {
      alert("Only admin can add sweets");
    }
  };

  return (
    <div>
      <h2>Admin – Add Sweet</h2>

      <form onSubmit={handleAddSweet}>
        <input
          placeholder="Sweet name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <br />

        <button type="submit">Add Sweet</button>
      </form>
    </div>
  );
}

export default AdminAddSweet;
