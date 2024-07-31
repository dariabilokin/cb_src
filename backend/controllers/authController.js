const bcrypt = require('bcrypt')
const prisma = require('../prisma/prisma')
const { sendResetEmail } = require('../utils/emailService')
const crypto = require('crypto')
const { sendVerificationEmail } = require('../utils/emailService')

const AuthController = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body

      // Basic input validation
      if (!username || !email || !password) {
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

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      })

      await sendVerificationEmail(email, verificationToken)

      res.status(201).json({
        message:
          'User registered successfully. Please check your email to verify your account.',
        user: newUser,
      })
    } catch (error) {
      console.error('Registration error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
  async verifyEmail(req, res) {
    try {
      const { token } = req.params

      const user = await prisma.user.findFirst({
        where: { verificationToken: token },
      })

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

      // Find user by email
      const user = await prisma.user.findUnique({ where: { email } })
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

      // Create session
      await prisma.session.create({
        data: {
          token,
          userId: user.id,
          expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
        },
      })

      res.json({ message: 'Login successful', token })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
  async logout(req, res) {
    try {
      const { token } = req.body

      if (!token) {
        return res.status(400).json({ error: 'Token is required' })
      }

      // Remove the session
      await prisma.session.deleteMany({
        where: { token },
      })

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
