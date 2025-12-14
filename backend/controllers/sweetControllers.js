const Sweet = require("../models/sweet");

// Add a sweet
exports.addSweet = async (req, res) => {
  try {
    const sweet = new Sweet(req.body);
    await sweet.save();
    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET all sweets
exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE sweet (admin)
exports.deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }
    res.json({ message: "Sweet deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// SEARCH sweets by name, category, price range
exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query);
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE sweet details
exports.updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json(sweet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
