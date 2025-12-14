const express = require("express");
const {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet
} = require("../controllers/sweetControllers");

const {
  purchaseSweet,
  restockSweet
} = require("../controllers/inventoryController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addSweet);
router.get("/", getAllSweets);
router.get("/search", searchSweets);
router.put("/:id", authMiddleware, updateSweet);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);

// Inventory
router.post("/:id/purchase", authMiddleware, purchaseSweet);
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);

module.exports = router;
