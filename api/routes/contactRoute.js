const { contact } = require("../controllers/contactController");

const router = require("express").Router();

router.post("/contact", contact);

module.exports = router;
