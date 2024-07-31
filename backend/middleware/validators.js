const { body, validationResult } = require('express-validator')

const registerValidation = [
  body('username').trim().isLength({ min: 3 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
]

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
]

const resetRequestValidation = [body('email').isEmail().normalizeEmail()]

const resetPasswordValidation = [
  body('token').notEmpty(),
  body('newPassword').isLength({ min: 6 }),
]

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  return res.status(400).json({ errors: errors.array() })
}

module.exports = {
  registerValidation,
  loginValidation,
  resetRequestValidation,
  resetPasswordValidation,
  validate,
}
