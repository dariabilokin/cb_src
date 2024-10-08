const bcrypt = require('bcrypt')
const prisma = require('../prisma/prisma')
const jwt = require('jsonwebtoken')
const { sendResetEmail } = require('../utils/emailService')
const crypto = require('crypto')
const { sendVerificationEmail } = require('../utils/emailService')

const AuthController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body
      console.log('req.body', req.body)

      // Basic input validation
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' })
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex')

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          verificationToken,
        },
        select: {
          id: true,
          name: true,
          email: true,
          verificationToken: true,
        },
      })

      console.log('newUser', newUser)
      await sendVerificationEmail(email, verificationToken)

      res.status(201).json({
        message:
          'User registered successfully. Please check your email to verify your account.',
        user: newUser,
      })
    } catch (error) {
      console.error('Registration error:', error)
      res.status(500).json({ error: 'Internal server error' + error })
    }
  },
  async verifyEmail(req, res) {
    try {
      const { token } = req.params
      console.log('token', token)
      const user = await prisma.user.findFirst({
        where: { verificationToken: token },
      })
      console.log('user', user)
      if (!user) {
        return res.status(400).json({ error: 'Invalid verification token' })
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerified: true,
          verificationToken: null,
        },
      })

      res.json({ message: 'Email verified successfully' })
    } catch (error) {
      console.error('Email verification error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body

      // Basic input validation
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: 'Email and password are required' })
      }
      console.log('email', email)
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }
      if (!user.isVerified) {
        return res
          .status(403)
          .json({ error: 'Please verify your email before logging in' })
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })
      // Generate JWT token
      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: '365d',
        }
      )

      // Create session
      await prisma.session.create({
        data: {
          token,
          refreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
        },
      })

      res.json({ message: 'Login successful', token, refreshToken })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
  async logout(req, res) {
    try {
      const { token } = req.body
      console.log('token LOGOUT ', token)
      if (!token) {
        return res.status(400).json({ error: 'Token is required' })
      }

      // Remove the session
      const removedSessions = await prisma.session.deleteMany({
        where: { token: token },
      })
      console.log('removedSessions', removedSessions)
      res.json({ message: 'Logout successful' })
    } catch (error) {
      console.error('Logout error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body

      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const resetToken = crypto.randomBytes(32).toString('hex')
      const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry },
      })

      await sendResetEmail(user.email, resetToken)

      res.json({ message: 'Password reset email sent' })
    } catch (error) {
      console.error('Password reset request error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
  async refreshAuthToken(req, res) {
    const { refreshToken } = req.body
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

      const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })

      return res.status(200).json({ newToken })
    } catch (error) {
      return res.status(401).json({ message: 'Invalid refresh token' })
    }
  },
  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body

      const user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExpiry: { gt: new Date() },
        },
      })

      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired reset token' })
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      })

      res.json({ message: 'Password reset successful' })
    } catch (error) {
      console.error('Password reset error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
}

module.exports = AuthController
