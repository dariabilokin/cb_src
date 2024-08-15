const express = require('express')
const NoteController = require('../controllers/noteController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware) // Protect all note routes

router.post('/', NoteController.createNote)
router.get('/user/:userId', NoteController.getNotesByUserId)
router.put('/item/:id', NoteController.updateNoteItem)
router.put('/:noteId/reorder', NoteController.updateNoteItemsOrder)
router.delete('/item/:id', NoteController.deleteNoteItem)
router.delete('/:noteId/items', NoteController.deleteAllNoteItems)

module.exports = router
