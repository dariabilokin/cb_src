const jwt = require('jsonwebtoken')
const prisma = require('../prisma/prisma')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Check if session exists and is not expired
    const session = await prisma.session.findFirst({
      where: {
        token,
        userId: decoded.userId,
        expiresAt: { gt: new Date() },
      },
    })

    if (!session) {
      return res.status(401).json({ error: 'Invalid or expired session' })
    }

    // Attach user to request object
    req.user = { id: decoded.userId }

    next()
  } catch (error) {
    console.error('Authentication error:', error)
    res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = authMiddleware
