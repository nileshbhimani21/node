const express = require('express');
const { createUser, users, user, updateUser, deleteUser, login, logout, userRoles, forgotPassword, resetPassword, updateProfile } = require('../controllers/user');
const auth = require('../middleware/auth');
const { uploadFile, uploadSingle } = require('../middleware/upload');
const router = express.Router();

router.post("/users/create", createUser)
router.post("/users",auth, users)
router.get("/users/:id", user)
router.patch("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)
router.post("/login", login)
router.get("/logout",auth, logout)
router.get("/userroles", userRoles)
router.post("/forgotpassword", forgotPassword)
router.post('/resetpassword/:token', resetPassword)
router.post('/resetpassword/:token', resetPassword)
router.patch("/updateProfile/:id",auth, uploadSingle, updateProfile)

module.exports = router;