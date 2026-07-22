const express = require("express");

const router = express.Router();

const {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} = require("../controllers/routeController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, createRoute);

router.get("/", getAllRoutes);

router.get("/:id", getRouteById);

router.put("/:id", protect, adminOnly, updateRoute);

router.delete("/:id", protect, adminOnly, deleteRoute);

module.exports = router;