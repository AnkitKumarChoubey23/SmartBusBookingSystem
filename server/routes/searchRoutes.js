const express = require("express");

const router = express.Router();

const {
  searchBuses,
} = require("../controllers/searchController");

router.get("/", searchBuses);

module.exports = router;