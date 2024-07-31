const express = require('express')
const router = express.Router()
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
} = require('../controllers/usersController')

/* Define the routes for the CRUD operations using router.route() */
router.route('/users').get(getUsers) // Read: Get all users

router.route('/createUser').post(createUser) // Create: Create a new user

router
  .route('/users/:id')
  .patch(updateUser) // Update: Update a user by ID
  .delete(deleteUser) // Delete: Delete a user by ID

router.route('/users/:id').get(getSingleUser) // Read: Get a single user by ID
module.exports = router
