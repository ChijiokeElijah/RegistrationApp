const register = require('../UserControllers/UserController')


const router = require('express').Router()

try {
  router.post("/register", register);
} catch (err) {
  console.error("Route definition error:", err);
  process.exit(1);
}

module.exports = router
