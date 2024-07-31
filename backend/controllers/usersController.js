const prisma = require('../prisma/prisma')
const bcrypt = require('bcrypt')
const getUsers = async (req, res) => {
  const users = await prisma.user.findMany()
  res.status(200).json({ message: 'Get Users', data: users })
}

const getSingleUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id) || 1,
    },
  })
  res.status(200).json({ message: 'Get Single User', data: user })
}

const createUser = async (req, res) => {
  console.log('req.body', req.body)

  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400)
    throw new Error('Please add fields')
  }
  const name = req.body.name
  const email = req.body.email
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  })
  res.status(200).json({ message: 'Set User' })
}

const updateUser = async (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    return res.status(400).json({ message: 'Missing required fields' })
  }
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name,
        email,
      },
    })

    res.status(200).json({
      message: `User updated with id ${updatedUser.id}`,
      data: updatedUser,
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating user', error: error.message })
  }
}

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id)
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })

    res.status(200).json({ message: `User deleted with id ${userId}` })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting user', error: error.message })
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
}
