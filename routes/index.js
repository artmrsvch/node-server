const express = require("express");
const router = express.Router();

const authMiddleware = require('../middleware/auth')
const profileMiddleware = require('../middleware/profile')
const verifyAccessToken = require('../middleware/verifyAccessToken')

const authController = require('../controllers/auth')
const profileController = require('../controllers/profile')
const userController = require('../controllers/users')

router.post("/registration", authMiddleware.registration, authController.register);
router.post("/login", authMiddleware.login, authController.login)
router.post("/refresh-token", authMiddleware.getTokens, authController.refreshToken)

router.get('/profile', verifyAccessToken.verify, profileController.getUserProfile)
router.patch('/profile', verifyAccessToken.verify, profileMiddleware.filterFields, profileController.updateUserProfile)

router.get('/users', verifyAccessToken.verify, userController.getAllUsers)

module.exports = router;