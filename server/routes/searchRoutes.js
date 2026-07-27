const express = require("express");

const router = express.Router();

const {
  searchBuses,
  getSearchOptions,
} = require("../controllers/searchController");

router.get("/options", getSearchOptions);

router.get("/", searchBuses);

module.exports = router;