const express = require('express')
const NoteController = require('../controllers/notesController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware) // Protect all note routes

// Note Routes
router.post('/', NoteController.createNote)
router.get('/user/:userId', NoteController.getNotesByUserId)
// Note Items and Operations
router.put('/item/:id', NoteController.updateNoteItem)
router.delete('/item/:id', NoteController.deleteNoteItem)
// Order and Batch Operations
router.put('/:noteId/reorder', NoteController.updateNoteItemsOrder)
router.delete('/:noteId/items', NoteController.deleteAllNoteItems)

module.exports = router
