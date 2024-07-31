const express = require('express')
const AuthController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const {
  registerValidation,
  loginValidation,
  resetRequestValidation,
  resetPasswordValidation,
  validate,
} = require('../middleware/validators')
const { authLimiter } = require('../middleware/rateLimiter')

const router = express.Router()

router.post('/register', registerValidation, validate, AuthController.register)
router.post(
  '/login',
  authLimiter,
  loginValidation,
  validate,
  AuthController.login
)
router.post('/logout', AuthController.logout)
router.get('/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    userId: req.user.id,
  })
})
router.post(
  '/request-reset',
  authLimiter,
  resetRequestValidation,
  validate,
  AuthController.requestPasswordReset
)
router.post(
  '/reset-password',
  resetPasswordValidation,
  validate,
  AuthController.resetPassword
)
router.get('/verify-email/:token', AuthController.verifyEmail)

module.exports = router
