const express = require("express");
const router = express.Router();

const authMiddleware = require('../middleware/auth')
const profileMiddleware = require('../middleware/profile')
const userMiddleware = require('../middleware/user')
const verifyAccessToken = require('../middleware/verifyAccessToken')

const authController = require('../controllers/auth')
const profileController = require('../controllers/profile')
const userController = require('../controllers/users')
const newsController = require('../controllers/news')

router.post("/registration", authMiddleware.registration, authController.register);
router.post("/login", authMiddleware.login, authController.login)

router.post("/refresh-token", authMiddleware.getTokens, authController.refreshToken)

router.get('/profile', verifyAccessToken.verify, profileController.getUserProfile)
router.patch('/profile', verifyAccessToken.verify, profileMiddleware.filterFields, profileController.updateUserProfile)

router.get('/users', verifyAccessToken.verify, userMiddleware.checkPermission, userController.getAllUsers)
router.patch('/users/:id/permission', verifyAccessToken.verify, userController.setPermission)
router.delete('/users/:id', verifyAccessToken.verify, userController.deleteUser)

router.get('/news', verifyAccessToken.verify, newsController.getNews)
router.post('/news', verifyAccessToken.verify, newsController.createNews)
router.patch('/news/:id', verifyAccessToken.verify, newsController.patchNews)
router.delete('/news/:id', verifyAccessToken.verify, newsController.deleteNews)


module.exports = router;