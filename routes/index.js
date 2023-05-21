const express = require('express');
const { createUser, users, user, updateUser, deleteUser, login, logout } = require('../controllers/user');
const auth = require('../middleware/auth');
const router = express.Router();

router.post("/users/create", createUser)
router.post("/users", users)
router.get("/users/:id", user)
router.patch("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)
router.post("/login", login)
router.get("/logout",auth, logout)

module.exports = router;