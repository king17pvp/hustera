const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/courseController");

router.get("/", coursesController.getCourses);
router.get("/filters", coursesController.getFilters);

module.exports = router;
