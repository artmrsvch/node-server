const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth')

const auth = require('../controllers/auth')

router.post("/registration", authMiddleware.registration, auth.register);
router.post("/login", authMiddleware.login, auth.login)
router.post("/refresh-token", auth.refreshToken)

module.exports = router;