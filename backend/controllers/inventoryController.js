const Sweet = require("../models/sweet");

// PURCHASE sweet (user)
exports.purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Sweet out of stock" });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.status(200).json({
      message: "Sweet purchased successfully",
      sweet
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// RESTOCK sweet (admin)
exports.restockSweet = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid restock amount" });
    }

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += amount;
    await sweet.save();

    res.status(200).json({
      message: "Sweet restocked successfully",
      sweet
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
